<template>
  <div class="waaper">



    <div class="main">

      <div class="title">游戏说明</div>

      <div class="content">
        <br class="tip_content">学生不爱练琴？家长不懂陪练？回课质量总不好？</br>音熊钢琴陪练诚邀广大钢琴老师携手合作，这个暑假我们准备了更多丰富的推广奖励（礼物），并且提供推广老师更高的自我提升平台！</br>音熊钢琴陪练让家长更省心，老师更放心，学生更开心！快来加入我们的推广团队吧！</br></br></br></br></br></br></br></span>
      </div>

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
    width: 100%;
    -webkit-overflow-scrolling: touch;
    background: url('../../static/img/tip_main_bg.jpg') 100% 100% no-repeat;
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
    margin:0px auto 0px;
    /*border:2px dashed rgb(0, 160, 233);*/
    /*background-image: linear-gradient( -85deg, rgb(37,66,161) 10%, rgb(20,63,172) 90%);*/
    /*border-radius:17px;*/
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .title{
    width: 670px;
    margin-top: 90px;
    font-size: 52px;
    text-align: center;
    position: relative;
    color: #293e73;
  }

  .tip_content{
    float: left;
    font-size: 36px;
  }

  .content{
    clear: both;
    width: 92%;
    /*margin-right: 3%;*/
    /*margin-left: 3%;*/
    color: #30436d;
    min-height: 200px;
    line-height: 60px;
    font-size: 36px;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0px 3% 0px 5% ;
    margin-top: 90px;

    background: url('../../static/img/tip_bg.png') 50% 50% no-repeat;
    background-size:100% 100%;


  }

</style>
