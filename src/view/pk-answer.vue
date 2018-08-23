<template>
  <div class="waaper">
    <section class="header">
      <div class="info">
        <div class="head">
          <figure>
            <img :src="shareUserinfo.headimgurl" alt="">
          </figure> 
        </div>
        <span class="name">{{shareUserinfo.nickname}}</span>
        <span class="level">{{shareUserinfo.dan}}</span>
      </div>
      <span class="pk"></span>
      <!-- 失败后显示分数对比 -->
      <div class="pk-number" v-if="pkStatus==2">
        {{shareUserinfo.fen}} <em>vs</em> {{todayPkStatus == 'false'?score:todayPkStatus}}
      </div>
      <countDownSecond 
        @stopCall="stopCall"
        :qsIndex="qsIndex"
        :lock="lock"
        v-if="pkStatus==0">
      </countDownSecond>
      <div class="info other-info">
        <div class="head">
          <figure>
            <img :src="myUserinfo.headimgurl" alt="">
          </figure>  
        </div>
        <span class="name">{{myUserinfo.nickname}}</span>
        <span class="level">{{myUserinfo.dan}}</span>
      </div>
    </section>
    <div class="answer-box" v-if="pkStatus==0">
      <answer :ask="ask" :qsIndex="qsIndex" :lock="lock" v-if="ask.length" @select="select"></answer>
    </div>
    <pk-ok v-if="pkStatus==1" 
      :todayPkStatus="todayPkStatus" 
      @submit="submit">
    </pk-ok>
    <pk-err v-if="pkStatus==2" 
      :todayPkStatus="todayPkStatus"
      @submit="submit">
    </pk-err>
    <toast :msg="toastMsg" v-if="toastState"></toast>
    <back></back>
  </div>
</template>

<script>
import XHR from '../api'
import answer from "../components/answer"
import pkOk from "../components/pk-ok"
import pkErr from "../components/pk-err"
import countDownSecond from "../components/countDownSeconds"
import storage from "../store/storage"
import toast from "../components/toast"
import back from "../components/back"
export default {
  data () {
    return {
      qsIndex:0, // 当前问题下标
      ask:[],
      errAnswerList:[], //答错题目id
      pkStatus:'0',
      lock:'false', // 是否选择问题 并上锁
      rightAnswerCount:0, // 答对题目数量
      shareUserinfo:{},
      myUserinfo: {},
      isPkUser:{}, // pk过的用户
      todayPkStatus:'false',
      toastMsg: '', // toast内容
      toastState:false // toast状态
    }
  },
  computed: {
    score: function () {
      return this.rightAnswerCount
    }
  },
  components: {
    answer,
    pkOk,
    pkErr,
    toast,
    back,
    countDownSecond
  },
  watch: {
    qsIndex (val, oldVal) {
      if(val == '10' ){
        if(this.rightAnswerCount > this.shareUserinfo.fen){
          this.pkStatus='1'
        }else{
          this.pkStatus='2'
        }
      }
    }
  },
  created () {
    this.jump('/')
    let todydat = new Date().getDay()
    if(todydat==0||todydat==6){
      this.jump('/')
    }else{
      this.getWxconfig()
      this.hideshare()
      this.getQuestion()
      this.shareUserinfo.uid = this.$route.params.uid
      this.shareUserinfo.fen = this.$route.params.fen
      this.getShareUser(this.$route.params.uid)
      this.getMyUser()
      // 判断是否为今天pk过的用户
      this.getIsPkUser(his.$route.params.uid)
      this.checkPkCount()
    }
  },
  mounted () {
    this.share()
  },
  methods: {
    getIsPkUser (uid) {
      if(this.getCookie('isPkUser')){
        this.isPkUser = JSON.parse(this.getCookie('isPkUser'))
        if(this.isPkUser[uid]!=undefined){
          this.pkStatus = this.isPkUser[uid].status
          this.todayPkStatus = this.isPkUser[uid].myFen
        }
      }
    },
    getShareUser (uid) {
      let json={uid}
      XHR.getUser(json).then((res) => {
        let {data,status} = res.data
        if(!status){
          this.shareUserinfo = {...this.shareUserinfo,...data}
        }
      })
    },
    getMyUser(){
      let user = storage.get('userInfo')
      this.myUserinfo = JSON.parse(user)
      if (this.shareUserinfo.uid == this.myUserinfo.uid) {
        console.log(1)
        this.jump('/')
      }else{
        let json={
          uid:`${this.myUserinfo.uid}`
        }
        XHR.getUser(json).then((res) => {
          let {data,status} = res.data
          if(!status){
            this.myUserinfo = data
          }
        })
      }
      console.log(this.shareUserinfo.uid, '发起人的uid');
      console.log(this.myUserinfo.uid, '自己的uid');
      // 如果是相同用户跳转到首页
    },
    getQuestion() {
      let json = {
        batch:window.batch,
        type:'2',
        project:'king_of_answer'
      }
      // let todayAnswer = this.getCookie('qa')
      // json['type'] = todayAnswer ? 2 : 1
      XHR.getQs(json).then((res) => {
        let {data,status} = res.data
        if(!status){
          this.ask = data
        }
        if(status == '2'){
          window.location.href = 'http://www.vr0101.com/qa/index.html'
        }
      })
    },
    select (index,item) {
      if(this.lock == 'false'){
        this.lock = index
        if(index!=item.answer){
          this.errAnswerList.push(1)
        }else{
          this.errAnswerList.push(0)
        }
        // 计算正确答题个数
        if (index == item.answer) {
          this.rightAnswerCount++
        }
        setTimeout(() => {
          this.lock = 'false'
          this.qsIndex++
        }, 1e3);
      }
    },
    stopCall () {
      this.errAnswerList.push(1)
      this.qsIndex++
    },
    showToast (msg) {
      if(this.toastState) return
      this.toastMsg = msg
      this.toastState = true
      setTimeout(() => {
        this.toastState = false
      }, 2e3);
    },
    pkResult(uid,integral){
      let json = {
        batch:window.batch,
        uid,
        project:'king_of_answer',
        integral
      }
      XHR.addIntegral(json).then((res) => {
        console.log(res.data)
      })
    },
    addPkCount() { // 记录pk次数记录
      let pkCount = this.getCookie('pkCount')
      if(pkCount){
        pkCount = parseInt(pkCount)+1
        this.setCookie('pkCount', pkCount)
      }else{
        this.setCookie('pkCount',1)
      }
    },
    checkPkCount () { // 判断pk次数是否超过2次
      let pkCount = this.getCookie('pkCount')
      if(pkCount && pkCount > 1){
        console.log(5666);
        // this.jump('/')
      }
    },
    submit(){
      let answerList = this.errAnswerList.join(',')
      let json = {
        batch:window.batch,
        uid:this.myUserinfo.uid,
        project:'king_of_answer',
        type:2,
        answerList,
        rightAnswerCount :this.rightAnswerCount
      }
      let pkCount = this.getCookie('pkCount')
      if(pkCount && pkCount > 1){
        this.showToast('恭喜您提交成功')
        return
      }
      XHR.submitAnswer(json).then((res) => {
        let {status,data} = res.data
        if(!status){
          let InitiatorUid = this.shareUserinfo.uid
          this.isPkUser[InitiatorUid] = {
            status: this.pkStatus,
            myFen: this.rightAnswerCount
          }
          let ispkUid = JSON.stringify(this.isPkUser)
          this.setCookie('isPkUser', ispkUid)
          this.addPkCount()
          if(this.rightAnswerCount > this.shareUserinfo.fen){
            this.pkResult(this.myUserinfo.uid,2)
          }else{
            this.pkResult(this.shareUserinfo.uid,1)
          }
          this.showToast('恭喜您提交成功')
          setTimeout(() => {
            this.jump('/')
          }, 2e3);
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .waaper{
    flex:1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #05438d;
    height:100%;
  }
  .header{
    position: relative;
    min-height: 330px;
    padding: 64px 50px 0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    background: url(http://www.vr0101.com/qa/static/img/pk-bg.png) no-repeat top;
  }
  .info{
    text-align: center;
    .head{
      width: 228px;
      height: 236px;
      position: relative;
      z-index: 1;
      padding: 21px 16px;
      box-sizing: border-box;
      &:before{
        background: url('http://www.vr0101.com/qa/static/img/my-Halo.png') no-repeat;
        content: '';
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        z-index: -1;
        animation:rotating 5s linear infinite;
        display: block;
      }
      figure{
        width: 195px;
        height: 195px;
        overflow: hidden;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .name{
      font-size: 32px;
      line-height: 68px;
      color: #0bd4ff;
      display: block;
    }
    .level{
      font-size: 24px;
      color: #fff;
      border:2px solid rgb(230, 164, 18);
      border-radius: 5px;
      width: 115px;
      height: 34px;
      padding: 2px 10px;
      line-height: 34px;
    }
  }
  .other-info{
    .head{
      background: url('http://www.vr0101.com/qa/static/img/other-Halo.png') no-repeat; 
    }
    .level{
      border-color: rgb(8, 177, 240);
    }
  } 
  .pk{
    background: url('http://www.vr0101.com/qa/static/img/pk.png') no-repeat;
    width: 286px;
    height: 98px;
    position: absolute;
    left: 50%;
    margin-left: -160px;
    top: 134px;
    z-index: -1;
  }
  .pk-number{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    top: 260px;
    font-size: 30px;
    line-height: 30px;
    color: #fff;
    em{
      color: #e0cb1c;
    }
  }
  .answer-box{
     width: 646px;
      overflow: hidden;
      background:rgba(247, 217, 156, 0.18);
      border:2px solid #6ac5e4;
      margin: 66px auto 95px;
      border-radius: 16px;
      text-align: center;
  }
  canvas{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    bottom: 36px;
  }
  @keyframes rotating{
    from{transform:rotate(0)}
    to{transform:rotate(360deg)}
  }
</style>
