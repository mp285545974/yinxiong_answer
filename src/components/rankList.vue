<template>
  <div :class="['list',index<3 ? 'top-list list-'+ index: '']">
    <div class="order-number">{{index+1}}</div>

    <div class="content">
      <div class="avatar-wrap">
        <figure class="avatar">
          <img :src="item.headimgurl" alt="">
        </figure>
      </div>
      <div class="name">{{item.nickname}}</div>
      <!--<div class="label" v-if="type==0">{{item.dan}}</div>-->
      <div class="score">{{item.total}}分</div>
      <!--<div class="score" v-if="type==2">{{item.score}}分</div>-->
    </div>

  </div>
</template>

<script>
export default {
  props:['index','item','type'],
  data () {
    return {
      msg: ''
    }
  },
  created () {
  }
}
</script>

<style lang="less">
#app{
  display: flex;
}
  .list{
    display: flex;
    align-items: center;
    height: 100%;
    /*background: url('http://www.vr0101.com/qa/static/img/rank-list-bg.jpg') no-repeat;*/
    background-size: 100% 100%;
    .order-number{
      text-align: center;
      width: 80px;
      font-size: 36px;
      color: #000000;
    }
    .content{
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      background: url("../../static/img/rank_item_bg.png") 50% 50% no-repeat;
      /*background-size: 100% 100%;*/
    }
    .avatar{
      width: 84px;
      height: 84px;
      border-radius: 50%;
      border:4px solid #03deff;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name{
      color: #4474cd;
      font-size: 32px;
      flex: 1;
      word-break: break-all;
    }
    .label{
      /*border: 3px solid #0d53e0;*/
      /*border-radius: 8px;*/
      width: 144px;
      height: 50px;
      color: #ed857e;
      font-size: 26px;
      text-align: center;
      line-height: 50px;
      margin-right: 50px;
    }
    .score{
      margin-right: 50px;
      color: #ed857e;
      font-size: 30px;
    }
    .avatar-wrap{
      position: relative;
      width: 92px;
      height: 92px;
      margin: 0 20px 0 10px;
    }
  }
  .top-list{
    /*background: url('http://www.vr0101.com/qa/static/img/rank-list-one.jpg') no-repeat;*/
    background-size: 100% 100%;
    overflow: visible;
    .order-number{
      font-size: 0;
    }
    .order-number::before{
      content:'';
      display: inline-flex;
      background: url('http://www.vr0101.com/qa/static/img/ranking-1.png') no-repeat;
      background-size: 100% 100%;
      width: 54px;
      height: 66px;
    }
    .avatar-wrap::before{
      content: '';
      background: url('http://www.vr0101.com/qa/static/img/crown.png') no-repeat;
      width: 48px;
      height: 39px;
      position: absolute;
      top:-30px;
      left: 50%;
      margin-left: -24px;
    }
    .avatar{
      border-color: #ec8326;
    }
    .label{
      /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAyCAMAAACETKJvAAAAgVBMVEUAAAA8jttAe9Y8jttAftY8jts8jttDaNBEaNE8jttDaNBDadFEaNA8jts8j9s8jttEaNBDaNBEaNBDaNA8jttDadFDaNA8jts+gtg/f9dAetZCbdI9idpDa9E8jNs9h9lBddRCcdNBd9VCb9JDadE9i9o+hNhBc9M/fNY9htk+hdlgIV/rAAAAFnRSTlMAkysMBvaylY9BQQzX19S9u7SyfXzY4HVAOwAAAXRJREFUWMPt2dtWwkAMheGhBwQUUNQGq1bsaSzv/4BmEsoAteSSWcv8+gDfCnAz27ii2UP2d/WhT+qdqvC/qr45a+3O7qgSy8uc+sHe+rZ9+7Ztu+6L++AarGiKIl1OIsMld9lYNYoy9ngReZhkCeQ9Ze/JhyDEDDzEQY0TFQCTmDyP2ZWYU59x6EB8I0uRx4P8hTyHRfvO5UGehEEB6wRB7j5Pi3tz4+L51N3ImAg9zyaIXgAgMjO8jwmkqTsR/r4WJpDmAEuDn9jNvz99MUDqQCaYAEBBClLQaQqSUpCUgqQUJKUgKQVJKUhKQVIKklKQlIKkFCSlIKl/AwrrSS+wR8+VexbemEByz8LhPZzTtLAJYlpAz4TGF559KB5ZeGbhicVvLGebz3CF2nK8+eDKcjFCFfhHKwtcaZ3wPEWiI8d7iENdjlDC6NMeJx8SNQyiAEZJPE/xgPeanc50Q4/Li/JxUHvwsIg9yMFYBGOidMUD3i9gMXXYcnEkJwAAAABJRU5ErkJggg==) no-repeat 50% 50%;*/
      border:none;
    }
  }
  .list-1{
    background-size: 100% 100%;
    .order-number::before{
      background: url('http://www.vr0101.com/qa/static/img/ranking-2.png') no-repeat;
    }
    .avatar{
      border-color: #c7cad9;
    }
  }
  .list-2{
    /*background: url('http://www.vr0101.com/qa/static/img/rank-list-three.jpg') no-repeat;*/
    background-size: 100% 100%;
    .order-number::before{
      background: url('http://www.vr0101.com/qa/static/img/ranking-3.png') no-repeat;
    }
    .avatar{
      border-color: #ab8288;
    }
    .label{

    }
  }
</style>
