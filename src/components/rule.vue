<template>
<transition name="fade">
  <div class="rule-pop" @click="showRule">
    <div class="rule-main">
      <div class="lists answer">每日答题：每日上线10道题进行计时答题，每答对一道题积<em>1</em> 分，答题错误不积分。每个用户每日仅能参与一次。</div>
      <div class="lists pk">
        <p>挑战10道随机题目，每答对一道题积1分，答题错误不积分。挑战成功一次额外奖励<em>2</em>分，每天可被邀请答题两次。</p>
        <p>没有参加每日答题或每日答题低于<em>7</em>分，都可接受挑战。某次挑战满7分即可发起挑战</p>
      </div>
      <div class="lists share">分享活动邀请好友答题，每日分享仅可获1分奖励（分享次数不限）。</div>
      <div class="lists topk">
        <p>每日答题分数达到7分后可邀请好友挑战，挑战者挑战失败，发起者获得1分奖励，挑战者挑战成功，获<em>2</em>分奖励。</p>
        <p>挑战者题目为随机，每天最多可发起4次邀请好友挑战。</p>
      </div>
      <div class="num-all">注意：当分数相同的情况下，以答题时间为排序；每四期寄出一次奖品。</div>
      <div class="lists paragraph">
        <span class="first">潍柴白丁0~60分</span>
        <span>起步熟手60~120分</span><br>
        <span class="first">学富五车120~180分</span>
        <span>知识渊博180~240分</span><br>
        <span class="first">登峰造极240~300分</span>
        <span>智者大师300~360分</span><br>
        <span class="first">万卷宗师360~420分</span>
        <span>博学史诗420~480分</span><br>
        <span class="first">智慧传说480~540分</span>
        <span>潍柴王者540~600分</span>
      </div>
      <div class="num-all">最终解释权归潍柴所有</div>
      <a href="https://mp.weixin.qq.com/s/93yss4ujoGNcLbmnEhytJg" class="to-pass">Ps，戳进来，打开潍柴王者的快速通道</a>
    </div>
    
  </div>
</transition>
</template>

<script>
export default {
  props:['status'],
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    showRule(){
      this.$emit('showRule')
    }
  }
}
</script>

<style scoped lang="less">
@yellow: #f7a016;
  .rule-pop{
    position: fixed;
    z-index: 1000;
    top:0;
    width: 100%;
    height: 100%;
    left: 0;
    background: rgba(11, 52, 129, 0.69);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::before{
      content:'游戏规则';
      display: block;
      position: absolute;
      width: 267px;
      height: 57px;
      background: url('http://www.vr0101.com/qa/static/img/rule-header.png') no-repeat;
      left: 50%;
      margin-left: -138px;
      top:73px;
      z-index: 10;
      font-size: 36px;
      text-align: center;
      color: #ffffff;
    }
    .rule-main{
      position: relative;
      width: 615px;
      padding: 115px 0 0;
      box-sizing: border-box;
      background-color: rgba( 0, 42, 82 ,0.78);
      border:1px solid #09def7;
      max-height: 2000px;
      margin:100px auto 20px;
      transition: all 0.7s ease-in;
    }
  }
  .lists{
    color: #fff;
    font-size: 24px;
    line-height: 34px;
    color: #fff;
    padding: 0 40px 0 180px;
    position: relative;
    text-align: justify;
    em{
      font-size: 28px;
      color: @yellow;
    }
    .num{
      position: absolute;
      display: block;
      width: 64px;
      height: 64px;
      background: url('http://www.vr0101.com/qa/static/img/rule-num.png') no-repeat;
      text-align: center;
      line-height: 64px;
      font-size: 24px;
    }
    &::before{
      content:'';
      position: absolute;
      display: block;
    }
    &.answer::before{
      width: 150px;
      height: 51px;
      background: url('http://www.vr0101.com/qa/static/img/rule-1.png') no-repeat;
      top:0px;
      left: -3px;
    }
    &.answer{
      min-height: 70px;
      line-height: 45px;
      .num{
        top:0px;
        right: 20px;
      }
    }
  }
  .pk{
    padding-top: 40px;
      &::before{
        content: '';
        background: url('http://www.vr0101.com/qa/static/img/rule-topk.png') no-repeat;
        width: 149px;
        height: 105px;
        top:28px;
        left: -3px;
      }
      p{
        font-size: 24px;
        line-height: 45px;
        margin-top: 30px;
      }
      .num{
        right: 25px;
        bottom: -26px;
      }
      .two{
        right:110px;
      }
  }
  .share{
      margin-top: 60px;
      &::before{
        content: '';
        background: url('http://www.vr0101.com/qa/static/img/rule-share.png') no-repeat;
        width: 149px;
        height: 50px;
        top:0;
        left: -3px;
      }
      font-size: 24px;
      line-height: 45px;
      padding-right: 65px;
      .num{
        right: 25px;
        bottom: -26px;
      }
  }
  .topk{
      &::before{
        content: '';
        background: url('http://www.vr0101.com/qa/static/img/rule-pk.png') no-repeat;
        width: 149px;
        height: 107px;
        top:-60px;
        left: -3px;
      }
      font-size: 24px;
      line-height: 45px;
      margin-top: 70px;
      padding-right: 65px;
      .num{
        right: 25px;
        bottom: -26px;
      }
  }
  .paragraph{
    &::before{
        content: '';
        background: url('http://www.vr0101.com/qa/static/img/rule-paragraph.png') no-repeat;
        width: 149px;
        height: 107px;
        top:-80px;
        left: -3px;
      }
    font-size: 24px;
    line-height: 45px;
    margin-top: 120px;
    padding: 0 20px 0 100px;
    .first{
      display: inline-block;
      width: 225px;
      margin-right: 20px;
    }
    
  }
  .num-all{
    text-align: justify;
    font-size: 24px;
    line-height: 45px;
    padding: 20px 45px;
    color: @yellow;
    span{
      display: inline-block;
    }
  }
  .to-pass{
    display: block;
    max-width: 70%;
    background: #15a4c8;
    margin: 20px auto 40px;
    border-radius: 30px;
    padding: 20px;
    line-height: 30px;
    font-size: 24px;
    color: #fff;
    text-align: center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .5s;
     transform: translate(0, 0);
  }
  .fade-enter, .fade-leave-active {
    transform: translate(0, 100%);
  }
</style>
