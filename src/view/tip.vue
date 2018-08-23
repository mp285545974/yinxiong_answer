<template>
  <div class="waaper">

    <div>
      <div class="number"></div>
      <div class="time">

      </div>
    </div>

    <div class="main">


    </div>


  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  watch: {
    rightAnswerCount (val, oldVal) {
      this.toShare()
    }
  },
  created () {
  },

  methods: {

  }
}
</script>

<style scoped lang="less">

  .waaper{
    overflow-y: auto;
    height: 100%;
      -webkit-overflow-scrolling: touch;
    background: url('../../static/img/bg_logo.jpg')  no-repeat;
    background-size: 100% 100%;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    &::before{
      content:'';
      display: block;
      position: absolute;
      /*background: url('../../static/img/top-icon.png');*/
      width: 724px;
      height: 397px;
      top:0px;
      left: 50%;
      z-index: 3;
      margin-left: -362px;
    }
  }
  .main{
    width: 670px;
    margin:0px auto 20px;
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
