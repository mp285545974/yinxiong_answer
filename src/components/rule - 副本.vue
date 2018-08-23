<template>
<transition name="fade">
  <div class="rule-pop" @click="showRule">
    <ul class="rule-main">
      <li class="yellow"><em >每日答题：</em>每日上线10道题进行计时答题，每答对一道题积1分，答题错误不积分并自动显示正确答案。每个用户每日仅能参与一次。</li>
      <li class="blue"><em>邀请好友：</em>分享活动邀请好友答题，每日分享仅可获1分奖励（分享次数不限），成功邀请1位好友答题再获2分奖励。（最多可邀请5人，好友答题提交成功算是邀请成功）</li>
      <li class="green"><em>好友对战：</em>每日答题分数达到7分后可邀请好友挑战，好友挑战失败，发起者获得1分奖励，好友挑战成功，挑战者获2分奖励。</li>
      <li class="powder"><em>排名形式：</em>每日将根据用户的分进行排行（相同分数按时间顺序），同时每日积分将计入得分总榜。形成周榜、月榜和总榜。</li>
      <li class="purple"><em>奖品规划：</em>每期前三名获得发动机模型一个 每期4-10名获得保温杯一个 每期11-15名获得雨伞一把总排行榜前3名获得价值3000元潍柴代金券</li>
    </ul>
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
@yellow: #fbad0f;
@blue: #04adee;
@green: #3fc45e;
@powder: #ff694b;
@purple: #9d7cfd;
  .rule-pop{
    position: fixed;
    z-index: 10;
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
      top:138px;
      z-index: 10;
      font-size: 36px;
      text-align: center;
      color: #ffffff;
    }
    .rule-main{
      position: relative;
      width: 615px;
      padding: 80px 45px 0;
      box-sizing: border-box;
      background: #003463;
      border:1px solid #09def7;
      max-height: 2000px;
      overflow: hidden;
      margin:160px auto 0;
      transition: all 0.7s ease-in;
    }
  }
  li{
      font-size: 24px;
      line-height: 45px;
      color: #fff;
      position: relative;
      letter-spacing: 0.6px;
      justify-content: right;
      margin-bottom: 45px;
      &:before{
        content: '';
        position: absolute;
        width:6px;
        height: 15px;
        background: #b88b25;
        left:-16px;
        top:12px;
      }
  }
  .yellow{
    &:before{
      background: @yellow;
      border-bottom: 2px solid @yellow;
    }
    em{
      color: @yellow;
    }
  }
  .blue{
    &:before{
      background: @blue;
      border-bottom: 2px solid @blue;
    }
    em{
      color: @blue;
    }
  }
  .green{
    &:before{
      background: @green;
      border-top: 2px solid @green;
    }
    em{
      color: @green;
    }
  }
  .powder{
    &:before{
      background: @powder;
      border-top: 2px solid @powder;
    }
    em{
      color: @powder;
    }
  }
  .purple{
    &:before{
      background: @purple;
      border-top: 2px solid @purple;
    }
    em{
      color: @purple;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .5s;
     transform: translate(0, 0);
  }
  .fade-enter, .fade-leave-active {
    transform: translate(0, 100%);
  }
</style>
