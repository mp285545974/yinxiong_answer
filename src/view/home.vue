<template>
  <div class="waaper">
    <!--<div class="logo"></div>-->
    <!--<div class="rule-btn" @click="showRule">游戏规则</div>-->
    <!--<div class="price-btn" @click="showPrice">奖项设置</div>-->
    <figure class="banner">
      <!--<img src="http://www.vr0101.com/qa/static/img/home-baner.png" alt="">-->
    </figure>
    <div @click="getQuestion" class="btn-link to-ask"></div>


    <div class="btn-bottom" >
      <!--{{tip_hover}}-->
      <input type="image" class="to-tip"  @click="totip"/>
      <input type="image" class="to-ranking" @click="torank"/>
      <input type="image" class="to-share"  @click="tipShare"/>


      <!--<div @click="torank" class="to-ranking"></div>-->

      <!--<div @click="toshare" class="to-share"></div>-->
    </div>


    <div class="wechat-tips" v-if="showShareTips" @click="tipShare"></div>

    <Rule v-show="showRuleStatus" :status="showRuleStatus" @showRule="showRule"></Rule>
    <Price v-show="showPriceStatus" :status="showPriceStatus" @showRule="showPrice"></Price>
    <toast :msg="toastMsg" v-if="toastState"></toast>
  </div>
</template>

<script>
import XHR from '../api'
import Rule from "../components/rule"
import Price from "../components/price"
import toast from "../components/toast"
import storage from "../store/storage"
export default {
  data () {
    return {
      toastMsg: '',
      showRuleStatus: false,
      showPriceStatus:false,
      toastState:false,
      showShareTips:false,
      tip_default:'/static/img/to-tip-hover.png',
      tip_hover:'/static/img/to-tip-hover.png',
      tip_active:'/static/img/to-tip-active.png'

  }
  },
  components: {
    Rule,
    toast,
    Price
  },
  created () {
    this.getWxconfig()
    this.hideshare()
    this.getShare()
    // this.jump(`/PkAnswer/xiaohuihehe/60`)
  },
  mounted () {
    this.share()
  },
  methods: {
    torank(){
      //this.showToast('活动已停止')
      this.jump('/ranking')
    },
    totip(){
      this.jump('/cheats')
    },
    tomiji(){
      this.showToast('活动已停止')
    },
    tipShare(){
      this.showShareTips =!this.showShareTips
    },
    getShare(){
      let shareUid = this.getQueryString('shareUid')
      let linkTime = this.getQueryString('time')
      let time = new Date().toLocaleDateString()
      if(shareUid && linkTime && (linkTime==time)){
        this.setCookie('shareUid',shareUid)
      }
    },
    showToast (msg) {
      if(this.toastState) return
      this.toastMsg = msg
      this.toastState = true
      setTimeout(() => {
        this.toastState = false
      }, 2e3);
    },
    showRule(){
      this.showRuleStatus =! this.showRuleStatus
    },
    showPrice () {
      this.showPriceStatus =! this.showPriceStatus
    },
    getQuestion() {

      let json = {
        batch:1,
        type:1,
        project:'king_of_answer'
      }
      XHR.getQs(json).then((res) => {
        let {data,status, message} = res.data
        if(status == '2'){
           this.showToast(message)
           return 
        }
        if(status=='0'){
          this.toQa()
        }
      })
    },
    toQa () {
      let todayQa = this.getCookie('qa')
      let todayFen = this.getCookie('todayFen')
      let isPc = /macintosh|window/.test(navigator.userAgent.toLowerCase());
      // if(isPc){
      //   this.showToast('请在手机端答题')
      //   return
      // }
      //if (todayQa&&!todayFen) {
      //  this.showToast('今天已经答过题了，请明天再来')
      //}else{
        //let user = JSON.parse(storage.get('userInfo'))
        //this.jump(`/answer/${user.uid}`)
        this.jump('/answer/wxef8c21497600d338wx')
      //}
    }
  }
  }
</script>

<style scoped lang="less">
  .waaper{
    height: 100%;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: url('/static/img/home-bg.jpg')  no-repeat;
    background-size: 100% 100%;
    .logo{
      width: 196px;
      height: 54px;
      margin:66px 0 0 56px;
      background: url('http://www.vr0101.com/qa/static/img/logo.png');
    }
    .banner{
      width: 588px;
      height: 578px;
      margin:0 auto 35px;
      clear: both;
    }
    .btn-link{
      display: block;
      font-size: 0;
      width: 218px;
      height: 216px;
      background-image: url('/static/img/to-ask-hover.png') ;
      margin:0 auto 30px;
    }
    .btn-link:hover{
      background-image: url('/static/img/to-ask-hover.png') ;
    }
    .btn-link:active{
      background-image: url('/static/img/to-ask-active.png') ;
    }


    .btn-bottom{
      text-align: center;
      width:86%;
      height: 130px;
      margin:150px 50px;
      border:none;
    }


    input {
      -webkit-box-shadow: 0 0 0 #fff;
      -moz-box-shadow:0 0 0 #fff;
    }

      .to-tip{
      width: 122px;
      height: 132px;
      float:left;
      color: transparent;
      border:1px solid #81d5f9;
      background-image: url('/static/img/to-tip-hover.png') ;

    }
    .to-tip:hover{
      border:none;
      background-image: url('/static/img/to-tip-hover.png') ;
    }
    .to-tip:active{
      border:none;
      background-image: url('/static/img/to-tip-active.png') ;
    }

    .to-ranking{
      width: 122px;
      height: 132px;
      color: transparent;
      background-image: url('/static/img/to-ranking-hover.png') ;
      margin-top: 50px;
      border:none;
    }
    .to-ranking:hover{
      background-image: url('/static/img/to-ranking-hover.png') ;
      border:none;
    }
    .to-ranking:active{
      background-image: url('/static/img/to-ranking-active.png') ;
      border:none;
    }

    .to-share{
      width: 122px;
      height: 132px;
      color: transparent;
      border:none;
      background-image: url('/static/img/to-share-hover.png') ;
      float:right;

    }
    .to-share:hover{
      background-image: url('/static/img/to-share-hover.png') ;
      border:none;
    }
    .to-share:active{
      background-image: url('/static/img/to-share-active.png') ;
      border:none;
    }


    .home-btn{
      display: block; 
      margin:25px auto 0;

      /*border-width: 2px;*/
      /*border-style: solid;*/
      /*background-image: linear-gradient( 90deg, rgb(255,255,0) 0%, rgb(234,215,10) 47%, rgb(212,174,20) 100%);*/
      box-shadow: 1.5px 2.598px 4px 0px rgb( 253, 255, 62 );
      width: 409px;
      height: 87px;
      font-size: 32px;
      color: #4b1d04;
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

</style>
