<template>
<div class="pk-ok">
  <div class="top">
    <figure class="logo">
      <img src="http://www.vr0101.com/qa/static/img/pk-cheat-img.png" alt="">
    </figure>
    <div class="content">
      <div class="name">潍柴动力</div>
      <div>等待您挑战更高荣誉</div>
    </div>
  </div>
  <div class="price">2分奖励</div>
  <div class="footer" v-if="todayPkStatus == 'false'">
    <button @click="submit">确定</button>
  </div>
</div>
</template>

<script>
export default {
  props:['todayPkStatus'],
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped lang="less">
  .pk-ok{
    background: #f7d99c;
    border:3px solid #fbedd0;
    border-radius: 10px;
    width: 575px;
    min-height: 760px;
    margin:90px auto;
    position: relative;
    &::before{
      content: '';
      width: 294px;
      height: 83px;
      background: url('http://www.vr0101.com/qa/static/img/pk-ok-title.png') no-repeat;
      position: absolute;
      top: -40px;
      left: 50%;
      margin-left: -147px;
    }
    .top{
      width: 477px;
      height: 138px;
      margin:74px auto 110px;
      background: #f0bb4f;
      padding: 28px 23px;
      box-sizing: border-box;
      display: flex;
      .logo{
        width: 166px;
        height: 81px;
        margin-right: 25px;
      }
      .content{
        color: #d77a0c;
        line-height: 38px;
        font-size: 24px;
        justify-content: space-between;
        flex: 1;
        display: flex;
        flex-direction: column;
        .name{
          font-size: 28px;
          line-height: 38px;
          color: #ee621e;
        }
      }
    }
    .price{
      border:1px solid rgba(131, 78, 0,0.2);
      width: 333px;
      height: 90px;
      border-radius: 45px;
      background-color: rgba(251, 173, 15,0.2);
      font-size: 38px;
      color: #d94207;
      margin:0 auto;
      line-height:90px; 
      &::before{
        content: '';
        vertical-align: middle;
        width: 110px;
        height: 73px;
        display: inline-block;
        margin:0 16px;
        background: url('http://www.vr0101.com/qa/static/img/price.png') no-repeat;
      }
    }
    .footer{
      height: 195px;
      line-height: 195px;
      text-align: center;
      background: #fbedd0;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      button{
        background-image: -webkit-linear-gradient( -90deg, rgb(255,120,89) 0%, rgb(255,94,74) 47%, rgb(254,68,59) 100%);
        box-shadow: 0px 3px 4px 0px rgba(211, 37, 37, 0.4);
        width: 432px;
        height: 97px;
        border-radius: 48px;
        font-size: 32px;
        color: #ffcb4e;
      }
    }
  }
  
</style>
