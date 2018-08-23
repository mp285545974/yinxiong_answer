<template>
  <div class="waaper">
    <!--<div class="rule-btn" @click="showRule">游戏说明</div>-->

    <!-- 题目序号 倒计时 -->
    <!--<div class="qsCount">-->
      <!--<countDownSecond-->
        <!--:qsIndex="qsIndex"-->
        <!--:lock="lock"-->
        <!--@stopCall="stopCall">-->
      <!--</countDownSecond>-->
    <!--</div>-->

    <div>
      <div class="number">第{{num[qsIndex]}}题</div>
      <div class="time">
        <img class="clock" src="../../static/img/clock.png" />
        <countDownSecond class="time_count"
        :qsIndex="qsIndex"
        :lock="lock"
        @stopCall="stopCall">
        </countDownSecond>
      </div>
    </div>

    <div class="main">
      <!-- 问题内容 -->


      <div class="answer-box" v-if="qsIndex!=10 && !isSubmit">
        <answer :ask="ask" :qsIndex="qsIndex" :lock="lock" v-if="ask.length" @select="select"></answer>
      </div>

      <answerOk
        v-if="qsIndex==10 || isSubmit"
        @submit="submit"
        @tipShare="tipShare"
        :isSubmit="isSubmit"
        :rightAnswerCount="rightAnswerCount">
      </answerOk>

    </div>

    <div class="logos" v-if="qsIndex==10 || isSubmit">
      <!--<img src="../../static/img/logo_2.png" alt="">-->
    </div>
    <Rule v-show="showRuleStatus" :status="showRuleStatus" @showRule="showRule"></Rule>
    <div class="wechat-tips" v-if="showShareTips" @click="tipShare"></div>
    <toast :msg="toastMsg" v-if="toastState"></toast>
    <loading-img v-if="submitStatus"></loading-img>
    <confim v-if="showConfim" @cencal="cencal" @ok="ok"></confim>
    
  </div>
</template>

<script>
import XHR from '../api'
import Rule from "../components/rule.vue"
import answer from "../components/answer"
import answerOk from "../components/answer-ok"
import countDownSecond from "../components/countDownSeconds"
import storage from "../store/storage"
import toast from "../components/toast"
import loadingImg from "../components/loading-img"
import confim from "../components/confim"
var wx = require('weixin-js-sdk');
export default {
  data () {
    return {
      qsIndex:0, // 当前问题下标
      ask:[],     // 所有问题
      lock:'false', // 是否选择问题 并上锁
      rightAnswerCount:0, // 答对题目数量
      showRuleStatus: false, // 显示规则
      uid:'xiaohuihehe',// 用户uid
      showShareTips:false,
      toastMsg: '',
      toastState:false,
      errAnswerList:[], //答错题目id
      submitStatus:false, // 提交状态 上锁
      isSubmit:0, // 是否提交
      whiteList:[], // 白名单
      myUserinfo:'',
      shareData: {
        link:'http://www.vr0101.com/qa/index.html',
        des:'呼朋唤友来答题，潍柴王者就是你…',
        title:'呼朋唤友来答题，潍柴王者就是你…'
      },
      showConfim:0,
      num:['1','2','3','4','5','6','7','8','9','10']
    }
  },
  components: {
    Rule,
    answer,
    answerOk,
    toast,
    loadingImg,
    confim,
    countDownSecond
  },
  watch: {
    rightAnswerCount (val, oldVal) {
      this.toShare()
    }
  },
  created () {
    //this.jump('/')
    //let todydat = new Date().getDay()
    //if(todydat==0||todydat==6){
    // this.jump('/')
    //}else{
      this.getWxconfig()
      this.hideshare()
      this.uid = this.$route.params.uid
      this.getQuestion()
      this.getMyUser()
      this.checktodayFen()
      this.setCookie('qa','isok')
    //}
  },
  mounted () {
    this.scrollFooter()
    this.shareAnswer()
    this.backList()
  },
  methods: {
    checktodayFen(){
      let todayFen = this.getCookie('todayFen')
      if(todayFen){
        this.isSubmit = 1
        this.rightAnswerCount = todayFen
        this.toShare()
      }
    },
    backList () {
      if(!this.isSubmit && location.href.indexOf('answer')>-1){
        this.pushHistory()
        setTimeout(() => {
          window.addEventListener('popstate', (e) => {
            if(!this.isSubmit){
              this.showConfim=1
              // if(confirm('你返回将用完今天的答题机会！确定返回吗？')){
              //   window.history.go(-1)
              //   this.setCookie('qa','isok')
              // }else{
              //   this.pushHistory()
              // }
            }
          })
        }, 0)
      }
    },
    pushHistory () {
      let state = {
        title: 'title',
        url: '#'
      }
      window.history.pushState(state, 'title', '#')
    },
    getMyUser(){
      let user = storage.get('userInfo')
      this.myUserinfo = JSON.parse(user)
    },
    cencal(){
      this.showConfim=0
      this.pushHistory()
    },
    ok(){
      this.showConfim=0
      window.history.go(-1)
    },
    toShare(){
      if(this.rightAnswerCount > 6 || this.whiteList.indexOf(this.uid)>-1){
        this.shareData['link'] = `http://www.vr0101.com/shareRedirect?openid=${this.uid}&total=${this.rightAnswerCount}`
        this.shareData['title']=`${this.myUserinfo.nickname}觉得这个答题你肯定玩不到${this.rightAnswerCount}分，不服来战！`
        this.shareData['des']=`${this.myUserinfo.nickname}觉得这个答题你肯定玩不到${this.rightAnswerCount}分，不服来战！`
        this.shareAnswer()
        console.log(this.shareData)
      }
    },
    scrollFooter() {
      setTimeout(() => {
        this.$el.scrollTop = this.$el.scrollHeight - window.innerHeight
      }, 200);
    },
    showRule(){
      this.showRuleStatus =! this.showRuleStatus
    },
    showToast (msg) {
      if(this.toastState) return
      this.toastMsg = msg
      this.toastState = true
      setTimeout(() => {
        this.toastState = false
        // this.$router.go(-1)
      }, 2e3);
    },
    getQuestion() {
      let json = {
        batch:1,
        type:1,
        project:'king_of_answer'
      }
      XHR.getQs(json).then((res) => {
        let {data,status} = res.data
        if(!status){
          // this.ask = data
          this.ask = [
            {index:0,answer:0,question:"1.中国的音乐节是什么时候？",answerList:['A 四月五日','B 十二月三日','C 十一月三日','D 五月五日']},
            {index:1,answer:2,question:"2.下面哪条不是音乐课程的价值：",answerList:['A 审美体验价值','B 创造性发展价值','C 兴趣爱好价值','D 文化传承价值']},
            {index:2,answer:2,question:"3.柴可夫斯基的歌剧作品是：",answerList:['A 《天鹅湖》 ','B 《睡美人》','C 《叶甫盖尼•奥涅金》','D 《胡桃夹子》']},
            {index:3,answer:3,question:"4.威尔第一生创作了大量的音乐作品，其中以歌剧作品最为著名，下面哪部歌剧不是他的作品：",answerList:['A 《奥赛罗》 ','B 《游吟诗人》','C 《阿依达》','D 《梦游女》']},
            {index:4,answer:0,question:"5.贝斯有几根弦？",answerList:['A 4根','B 5根','C 6根','D 7根']},
            {index:5,answer:0,question:"6.我国现存年代最早的一首用文字谱记写的琴曲是：",answerList:['A 《碣石调-幽兰》','B 《广陵散》','C 《高山流水》','D 《梅花三弄》']},
            {index:6,answer:3,question:"7.下列作品中哪个不是莫扎特的：",answerList:['A 《渴望春天》 ','B 《法国民谣变奏曲》','C 《朱庇特交响曲》','D 《军队进行曲》']},
            {index:7,answer:3,question:"8.下列属于单乐章结构的乐曲的体裁是：",answerList:['A 交响曲','B 奏鸣曲','C 协奏曲','D 交响诗']},
            {index:8,answer:1,question:"9.我国最早刊印的古琴曲集是朱权编印的：",answerList:['A 《弦索备考》','B 《神奇秘谱》','C 《乐府传声》','D 《溪山琴况》']},
            {index:9,answer:2,question:"10.下列不属于四大名旦的是：",answerList:['A 尚小云','B 荀慧生','C 周信芳','D 程砚秋']}
          ]
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
        if (index == this.ask[this.qsIndex].answer) {
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
    // 提交成绩
    submit (phone) {
      let answerList = this.errAnswerList.join(',')
      this.submitStatus = true
      this.isSubmit = 1
      let json = {
        batch:window.batch,
        uid:this.uid,
        project:'king_of_answer',
        type:1,
        answerList,
        rightAnswerCount :this.rightAnswerCount
      }
      let shareUid = this.getCookie('shareUid')
      if(shareUid){
        json['shareUid'] = shareUid
      }
      XHR.submitAnswer(json).then((res) => {
        let {status} = res.data
        if(!status){
          if(this.rightAnswerCount > 6 || this.whiteList.indexOf(this.uid)>-1){
            this.setCookie('todayFen',this.rightAnswerCount)
          }
          this.submitStatus = false
          this.uploadUser(phone)
          this.showToast('恭喜您提交成功')
        }
      })
    },
    uploadUser(phone){
      let userinfo = JSON.parse(storage.get('userInfo'))
      if (phone!=''){
        userinfo['phone'] = phone
        storage.set('userInfo',userinfo)
        XHR.updateUser(userinfo).then((res) => {
          let {status} = res.data
        })
      }
    },
    tipShare(){
      this.showShareTips =!this.showShareTips
    },
    // 添加积分
    addIntegral(uid,integral){
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
    checkShareNum(){
      let shareNum = this.getCookie('sharePK')
      if(shareNum){
        if(shareNum>3){
          this.showToast('您今天邀请好友pk的次数已达到上限')
        }
        if(shareNum>2){
          this.shareData['link']='http://www.vr0101.com/qa/index.html'
          this.shareData['des']='呼朋唤友来答题，潍柴王者就是你…'
          this.shareData['title']='呼朋唤友来答题，潍柴王者就是你…'
          this.shareAnswer()
        }
        shareNum = parseInt(shareNum)+1
        this.setCookie('sharePK',shareNum)
      }else{
        this.setCookie('sharePK',1)
      }
    },
    shareAnswer () {
      let that = this
      wx.ready(() => {
        wx.showAllNonBaseMenuItem();
        wx.hideMenuItems({
          menuList: ["menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:weiboApp"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        })
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: that.shareData.title,
          link: that.shareData.link,
          imgUrl: 'http://www.vr0101.com/qa/static/img/share.jpg',
          success: (res) => {
            let qaShare = that.getCookie('qaShare')
            if (!qaShare) {
              that.addIntegral(that.uid, 1)
              that.setCookie('qaShare','isok')
            }
            if(that.rightAnswerCount > 6 || that.whiteList.indexOf(that.uid)>-1){
              that.checkShareNum(that)
            }
          },
          cancel: (res) => {
            // 用户取消分享后执行的回调函数
          }
        })
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: that.shareData.title,
          desc: that.shareData.des,
          link: that.shareData.link,
          imgUrl: 'http://www.vr0101.com/qa/static/img/share.jpg',
          success: function () {

            let qaShare = that.getCookie('qaShare')
            if (!qaShare) {
              that.addIntegral(that.uid, 1)
              that.setCookie('qaShare','isok')
            }
            if(that.rightAnswerCount > 6 || that.whiteList.indexOf(that.uid)>-1){
              that.checkShareNum(that)
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.logos{
  width: 143px;
  height: 50px;
  margin:100px auto 20px;
}
  .waaper{
    /*overflow-y: auto;*/
    height: 100%;
    width: 100%;
      -webkit-overflow-scrolling: touch;
    background: url('../../static/img/bg_logo.jpg')  100% 100% no-repeat ;
    background-size: 100% 100%;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    /*&::before{*/
      /*content:'';*/
      /*display: block;*/
      /*position: absolute;*/
      /*!*background: url('../../static/img/top-icon.png');*!*/
      /*width: 724px;*/
      /*height: 397px;*/
      /*top:0px;*/
      /*left: 50%;*/
      /*z-index: 3;*/
      /*margin-left: -362px;*/
    /*} */
  }
  .main{
    /*width: 670px;*/
    width: 100%;
    margin:0px auto 20px;
    height: 100%;
    /*border:2px dashed rgb(0, 160, 233);*/
    /*background-image: linear-gradient( -85deg, rgb(37,66,161) 10%, rgb(20,63,172) 90%);*/
    /*border-radius:17px;*/
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .answer-box{
      width: 670px;
      height: 100%;

      /*background: #4162b5;*/
      /*border:2px solid #6ac5e4;*/
      margin: 0px auto 75px;
      border-radius: 16px;
      text-align: center;
      position: relative;
      .qsCount{
        position: relative;
        &::before,&::after{
          content:'';
          /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAAAWCAMAAACCEvCXAAAAP1BMVEUApv8ApP8Apv8Ao/8ApP8Apf8ApP8Apv8Apv8Apf8ApP8ApP8Apv8Apf8Apf8Apf8Apf8Apf8AqP8AqP8AqP/0BtUwAAAAFXRSTlNfJVsYK0AcU05FIBVXNy8zO0kFDwpI6o7vAAAA40lEQVQ4y63TSxKEIAwEUEWUP4hy/7NOnMpGM3wmZa9cvepqyXQcpZxu2aydZUxhX1eTtVbKCyEmDHx6r5TSWudsjFkh+x5CSinGKCEzxFq7QRaIc+i6X+5Ucw26ACNLXG7fHfu23PPrzi3Xc9zCdyNxl7brcV/q3uelv43sQFyQ6b6m6vJ2QJb2JfO+6MrWDtTtPN9U6+sYLrJ3V/7nCtZZ9F3+WfD7hodrn26hbq65ech1w319352Rpa68uxdMnm//jMkOY64ZODc35oqeK5num32BvVJxyfNtuvSdNc8itNwPfck8UBFj7c4AAAAASUVORK5CYII=) no-repeat 50% 50%; -webkit-background-size: 44px 11px; background-size: 44px 11px;*/
          position: absolute;
          width: 87px;
          height: 22px;
        }
        &::before{
          top: -60px;
          left: 50%;
          margin-left: -120px;
        }
        &::after{
          top: -60px;
          right: 50%;
          margin-right: -110px;
        }
      }
      canvas{
        position: absolute;
        top:-90px;
        left: 50%;
        transform: translate(-50%,0);
      }
  }
    .wechat-tips{
      position: fixed;
      z-index: 999;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.8) url(https://s.kcimg.cn/public/images/wechat-share.png) no-repeat 100% 0;
    }

  .number{
    width: 162px;
    height: 78px;
    text-align: center;
    font-size: 36px;
    font-weight:bold;
    color: #fff;
    display: inline;
    float: left;
    vertical-align: middle;
    line-height: 62px;
    margin-left: 34px;
    background-image: url("../../static/img/number_bg.png");
  }
  .time{
    height: 78px;
    width: 131px;
    margin-left: 35px;
    line-height: 62px;
    text-align: center;
    font-size: 34px;
    color: #fff;
    display: inline;
    float: left;
    background-image: url("../../static/img/time_bg.png");
  }
  .clock{
    float: left;
    height: 44px;
    width: 34px;
    display: inline;
    float: left;
    vertical-align: middle;
    text-align: center;
    padding-left: 15px;
    padding-top:8px;
  }
  .time_count{
    float: left;
    margin-left: 10px;
    font-size: 34px;
    font-weight:bold;
  }
</style>
