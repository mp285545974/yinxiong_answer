<template>
 <div class="answer">

   <!--<div>-->
     <!--<div class="number">第{{num[qsIndex]}}题</div>-->
     <!--<div class="time">-->
       <!--<img class="clock" src="../../static/img/clock.png" />-->
       <!--<p class="time_count">101</p>-->
      <!---->
     <!--</div>-->
   <!--</div>-->

   <!--<div class="qsCount">第{{num[qsIndex]}}题</div>-->

    <div class="content">
      <ul class="wraper" :style="`webkitTransform: translate3d(-${distance}px, 0px, 0px);`">
        <li v-for="(item,indexNum) in ask" :key="item.id" v-if="indexNum<=qsIndex">

          <div class="content_layout">

            <div class="title_layout">
              <span class="title">{{item.question}}</span>
            </div>

            <!--<div :class="['ask',lock==index&&index==item.answer?'yes':'',lock==index&&index!=item.answer?'err':'']"-->
            <!--v-for="(answer, index) in item.answerList"-->
            <!--:key="index" @click="select(index,item)">{{answer}}</div>-->

            <div class="ask_layout"
                 v-for="(answer, index) in item.answerList"
                 :key="index" @click="select(index,item)">
              <span style="float: left" class="ask_answer">{{answer}}</span>

              <span style="display: table-cell; vertical-align: middle; ">
              <div :class="['ask_icon',lock==index&&index==item.answer?'yes':'',lock==index&&index!=item.answer?'err':'']"></div>
            </span>

            </div>

          </div>



        </li>
      </ul>
      <!--<div class="tip">点击选项，完成答题</div>-->
    </div>
  </div>
</template>

<script>
import countDownSecond from "../components/countDownSeconds"
export default {
  props:['ask','lock','qsIndex','errAnswerList'],
  data () {
    return {
      num:['1','2','3','4','5','6','7','8','9','10']
    }
  },
  components: {
    countDownSecond
  },
  created () {
  },
  computed:{
    distance(){
      return 670*this.qsIndex
    }
  },
  methods: {
    select(index,answer){
      this.$emit('select', index, answer)
    },
    stopCall () {
      // this.$emit('stopCall')
      this.errAnswerList.push(1)
      this.qsIndex++
    }
  }
}
</script>

<style scoped lang="less">
  .answer{
    height: 100%;
    width: 100%;
  }
  .content{
    width: 670px;
    min-height: 200px;
    height: 100%;

    position: relative;
    overflow: hidden;
    .wraper{
      width: 1000%;
      height: 100%;
      display: flex;
      transform: translate3d(0px, 0px, 0px);
      transition-duration: 300ms;
      &.slide1{
        transform: translate3d(-670px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide2{
        transform: translate3d(-1250px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide3{
        transform: translate3d(-1875px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide4{
        transform: translate3d(-2500px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide5{
        transform: translate3d(-3125px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide6{
        transform: translate3d(-3750px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide7{
        transform: translate3d(-4375px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide8{
        transform: translate3d(-5000px, 0px, 0px);
        transition-duration: 0;
      }
      &.slide9{
        transform: translate3d(-5670px, 0px, 0px);
        transition-duration: 0;
      }
      li{
        width: 670px;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        float: left;
      }
    }
  }
    .content_layout{
      height: 100%;
      overflow: hidden;
    }


    .title_layout{
      margin-top: 40px;
      margin-bottom: 75px;
      background: url('../../static/img/title_bg.png') no-repeat;
      width:100%;
      height:auto;
      min-height: 14%;
      background-size:100% 100%;
      display: inline-block;
    }

    .title{
      font-size: 44px;
      width: 90%;
      color: #526773;
      float: left;
      padding: 20px;
      vertical-align: top;
      text-align:left;
      word-break: break-all;
      text-align: justify;
    }

    .ask_layout{
      margin-top: 20px;
      float: right;
      width: 100%;
      vertical-align: middle;
      text-align: center;

      display: inline-block;
      /*background-color: blue;*/
    }


    .ask_answer{
      display: flex;
      align-items: center;
      width:74%;
      padding: 10px 20px 10px 50px;
      height: 128px;
      font-size: 42px;
      color: #526773;
      align-items: center;
      position: relative;
      margin-right: 5px;

      background: url('../../static/img/answer_item_hover.png') 100% 100% no-repeat;
      background-size:100% 100%;
    }

    .ask_answer:hover{
      background: url('../../static/img/answer_item_hover.png') 100% 100% no-repeat;
      background-size:100% 100%;
    }
    .ask_answer:active{
      background: url('../../static/img/answer_item_active.png') 100% 100% no-repeat;
      background-size:100% 100%;
    }

    .ask_icon{
      clear: both;
      margin: 30px 0px 30px 0px;
      float: right;
      width: 90px;
      min-height: 97px;
      vertical-align: middle;

      &.yes{
        background-image: url("../../static/img/answer_correct.png");

      }
      &.err{
        background-image: url("../../static/img/answer_wrong.png");
      }
    }

    .ask{
      clear: both;
      /*border-radius: 48px;*/
      margin-right: 80px;
      margin-top: 10px;
      min-height: 128px;
      line-height: 34px;
      font-size: 30px;
      display: flex;
      align-items: center;
      position: relative;
      padding: 20px;
      background: url('../../static/img/answer_item_hover.png') 100% 100% no-repeat;
      background-size:100% 100%;
      &::after{
        content:'';
        display: inline-block;
        position: absolute;
        right: 40px;
        top: 50%;
      }
      &.yes{
        background-image: -webkit-linear-gradient( -90deg, rgb(152,219,255) 0%, rgb(98,179,244) 47%, rgb(43,138,232) 100%);
        &::after{
          width: 35px;
          margin-top: -12px;
          height: 25px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAZCAMAAACM5megAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMA4/vy6tYyJSofGBAG9u7HwVZPQz4UC+Xd2tCxiDkC9c25q5p/ZqFwezIAAADGSURBVCjPhdPZDoMgEAVQEBXFXetaa3f+/xNbxRkLDXqfmJuTmJFAdnPK2qHcJ4WcU+yRUi6hx0Q6dlLJNekxkS8buSB5HJOz2nB8xwbxHY1M+ffUC40ESPJlHtU/EL8kAXJXxTrTCAlnQLK1gbkDFKYmIU9ovGaZhQvFDTdpXERzV7c4TgQTUmiHmEQUifo2IIab+h4caUO08FSa6WpihCcGcTeyIUcnwgR4QUg41AbayDW0PgEgLLARRI4illSUMdb75C8fhtEscYPv6C8AAAAASUVORK5CYII=) no-repeat 50% 50%;
        }
      }
      &.err{
        background-image: -webkit-linear-gradient( -90deg, rgb(255,122,42) 0%, rgb(252,98,43) 47%, rgb(248,73,44) 100%);
        &::after{
          width: 25px;
          height: 24px;
          margin-top: -12px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAMAAAA4a6b0AAAAe1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NgkbwAAAAKHRSTlMA9PldysG/SyTaRDgyGg7x5+GoJ/DtxSogEtGzrpSQi398cWRWVFItZrh3CAAAAK1JREFUKM9dz+kWgiAQhuEPFTXTTM2tfW/u/wqzAIfx/QU8MOcA4FbFBURprUMANRFtBa0DIroiJFpQTv9wIUPDDIGVxi7axo4iU8d3VO9DhKmPMpsglzDVOCpSBlPamoNSMdiGkry0+PWOoQME7R3UWBQ6SSDLeNxbAnklAkTPGRIyHTWZwgVooBKUMWBczcQvYvzaOHqhZ5CEE4MkPBwwVUZwVkod4DdGSpX3L5CYLfZEOIQDAAAAAElFTkSuQmCC) no-repeat 50% 50%;
        }
      }
    }
    .tip{
      font-size: 24px;
      line-height: 50px;
      color: rgba(255, 255, 255, 0.59);
      margin-bottom: 47px;
    }
</style>
