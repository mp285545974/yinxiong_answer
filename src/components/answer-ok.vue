<template>
<form action="" class="ask-ok">
  <div class="ask-content">
    <var class="fenshu">{{score}}分</var>
    <input type="tel" 
      placeholder="输入您的手机号码" 
      maxlength="11" 
      v-model="tel" @input="changeInput" v-if="!userinfo.phone">

    <button :disabled="disabled" type="submit" v-if="!isSubmit" @click.prevent="submit">确定领取</button>
    <!--<button type="button" @click="tipShare" class="share" v-if="score>6">邀好友挑战</button>-->

    <span class="tips" v-if="!userinfo.phone">每天答题有机会领取神秘大礼包，请认真填写手机号码</span>
  </div>

</form>
</template>

<script>
import storage from "../store/storage"
export default {
  props:['ask','rightAnswerCount','isSubmit'],
  data () {
    return {
      disabled:true,
      userinfo:{},
      lock:false,
      tel:''
    }
  },
  created () {
     this.userinfo = JSON.parse(storage.get('userInfo'))
     if(this.userinfo.phone){
       this.disabled = false
     }
  },
  computed: {
    score () {
      return this.rightAnswerCount
    }
  },
  methods: {
    checkTel(tel) {
        // 验证手机号
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        if (reg.test(tel.trim())) {
            return true
        } else {
            return false
        }
    },
    changeInput() {
      if(this.tel.length > 10 && this.checkTel(this.tel)){
        this.disabled = false
      }else{
        this.disabled = true
      }
    },
    submit () {
      if(!this.lock){
        this.lock = true
        this.$emit('submit',this.tel)
      }
    },
    tipShare(){
      this.$emit('tipShare')
    }
  }
}
</script>

<style scoped lang="less">
  .ask-ok{

    text-align: center;
    &::before{
      content: '恭喜您';
      display: block;
      position: absolute;
      width: 267px;
      height: 57px;
      left: 50%;
      margin-left: -138px;
      top:138px;
      z-index: 10;
      font-size: 60px;
      -webkit-text-stroke: 1px #FFFFFF;
      font-weight:500;
      text-align: center;
      color: #d74f3f;
    }
    .ask-content{
      margin:280px auto 60px;
      width: 640px;
      min-height: 110px;
      border-radius: 16px;
      /*background:rgba(247, 217, 156, 0.18);*/
      /*border:1px solid #6ac5e4;*/
      padding: 0 60px;
      box-sizing: border-box;
      .fenshu{
        font-size: 110px;
        line-height: 82px;
        color: #ef9864;
        -webkit-text-stroke: 3px #FFFFFF;
        font-weight:500;
        margin-bottom: 44px;
        display: block;
        &:before{
          padding-top: 20px;
          content:'本次答题获得';
          display: block;
          color: #d74f3f;
          -webkit-text-stroke: 1px #FFFFFF;
          font-weight:500;
          border-radius: 23px;
          /*background-color: rgba(255, 63, 25,0.7);*/
          width: 257px;
          height: 47px;
          font-size: 38px;
          text-align: center;
          line-height: 46px;
          margin:92px auto 66px;
        }
      }
      input{
        border-radius: 11px;
        /*background-color: rgb(206, 250, 255);*/

        background: url('../../static/img/input_number.png') 100% 100% no-repeat;
        background-size:100% 100%;
        border: none;

        width: 521px;
        height: 100px;
        margin-bottom: 28px;
        padding: 0 20px;
        font-size: 28px;
        &::-webkit-input-placeholder{
          text-align: center;
          color: #00163a;
        }
      }
      .tips{
        font-size: 38px;
        line-height: 43px;
        color: #2f6280;
      }
    }
    button{
      width: 542px;
      background: url('../../static/img/answer_item_hover.png') 100% 100% no-repeat;
      background-size:100% 100%;

      /*background-image: -webkit-linear-gradient( -90deg, rgb(255,120,89) 0%, rgb(255,94,74) 47%, rgb(254,68,59) 100%);*/
      height: 100px;
      color: #4b1d04;
      font-size: 32px;
      margin-bottom: 40px;
      outline: none;
      border:none;
      &:disabled{
        opacity: 0.5
      }
    }

    button:hover{
      background: url('../../static/img/answer_item_hover.png') 100% 100% no-repeat;
      background-size:100% 100%;
    }
    button:active{
      background: url('../../static/img/answer_item_active.png') 100% 100% no-repeat;
      background-size:100% 100%;
    }
    .share{
      background-image: -webkit-linear-gradient( -90deg, rgb(87,239,249) 0%, rgb(49,195,221) 47%, rgb(11,151,192) 100%);
    }
  }
</style>
