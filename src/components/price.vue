<template>
<transition name="fade">
  <div class="rule-pop" @click="showRule">
    <ul class="rule-main">
      <li>
        <div class="left">每日前<em>10</em>名</div>
        <div class="right">
          <figure class="price first">
            <img src="http://www.vr0101.com/qa/static/img/price-1.png" alt="">
          </figure>
          <div class="content">
            <div>奖品： </div>雨伞<br>或水杯
          </div>
        </div>
      </li>
      <li class="weekRank">
        <div class="left">前<em>3</em>名</div>
        <div class="right">
          <figure class="price two">
            <img src="http://www.vr0101.com/qa/static/img/price-2.png" alt="">
          </figure>
          <div class="content">
            <div>奖品： </div>500元潍柴<br>代金券
          </div>
        </div>
      </li>
      <li class="weekRank">
        <div class="left">第<em>4-10</em>名</div>
        <div class="right">
          <figure class="price three">
            <img src="http://www.vr0101.com/qa/static/img/price-3.png" alt="">
          </figure>
          <div class="content">
            <div>奖品： </div>发动机模型<br>一个
          </div>
        </div>
      </li>
      <li class="weekRank">
        <div class="left">第<em>11-50</em>名</div>
        <div class="right">
          <figure class="price">
            <img src="http://www.vr0101.com/qa/static/img/price-4.png" alt="">
          </figure>
          <div class="content" style="padding:15px 0 0 0">
            <div>奖品： </div>十元话费券
          </div>
        </div>
      </li>
      <li class="allRank">
        <div class="left">前<em>3</em>名</div>
        <div class="right">
          <figure class="price">
            <img src="http://www.vr0101.com/qa/static/img/price-5.png" alt="">
          </figure>
          <div class="content">
            <div>奖品： </div>3000元潍柴<br>代金券
          </div>
        </div>
      </li>
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
@green: #0dfdf5;
@yellow: #deff00;
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
      content:'奖品设置';
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
      padding: 80px 63px 0 49px;
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
      color: #fff;
      height: 140px;
      position: relative;
      margin-bottom: 40px;
      .left{
        position: absolute;
        left: 0px;
        top:15px;
        width: 180px;
        height: 110px;
        border-radius: 16px;
        border-bottom-left-radius: 16px;
        text-align: center;
        line-height: 110px;
        background-color: rgba( 0, 175, 115,0.4 );
        em{
          color: @green;
        }
      }
      &.weekRank .left:before,&.allRank .left:before{
          content: '期榜';
          font-size: 24px;
          border-radius: 3px;
          background-image: -webkit-linear-gradient( 90deg, rgb(235,127,40) 0%, rgb(255,183,10) 100%);
          width: 69px;
          height: 36px;
          position: absolute;
          left: 20px;
          top:-10px;
          display: block;
          color: #fff;
          line-height: 36px;
          text-align: center;
        }
      &.allRank .left:before{
        content: '总榜';
        background-image: -webkit-linear-gradient( 90deg, rgb(1,162,255) 10%, rgb(25,197,254) 90%);
      }
      .right{
        position: absolute;
        right: 0;
        top:0;
        width: 330px;
        height: 140px;
        border-radius: 16px;
        background-color: rgba( 0, 175, 115,1 );
        .price{
          width: 180px;
          height: 100%;
          padding: 0 0 0 8px;
          box-sizing: border-box;
          display: inline-block;
          height: 137px;
          margin-top: -12px;
          float: left;
          &.first{
            height: 135px;
            margin-top: 3px;
          }
          &.three{
            height: 104px;
            margin-top: 20px;
          }
          img{
            max-width: 100%;
            vertical-align: middle;
          }
        }
        .content{
          display: inline-block;
          line-height: 34px;
          color:@yellow; 
          div{
            color: #fff;
            margin:20px 0 5px;
          }
        }
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
