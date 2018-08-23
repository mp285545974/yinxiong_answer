<template>
 <div class="answer">
    <header>第{{num[qsIndex]}}题</header>
    <h4 class="title">{{ask.question}}?</h4>
    <div :class="['ask',lock==index&&index==ask.answer?'yes':'',lock==index&&index!=ask.answer?'err':'']" 
      v-for="(item, index) in ask.answerList" 
      :key="index" @click="select(index,item)">{{item}}</div>
    <div class="tip">点击选项，完成答题</div>
  </div>
</template>

<script>
export default {
  props:['ask','lock','qsIndex'],
  data () {
    return {
      num:['一','二','三','四','五','六','七','八','九','十']
    }
  },
  created () {
  },
  methods: {
    select(index){
     this.$emit('select', index, this.ask)
    }
  }
}
</script>

<style scoped lang="less">
    header{
      height: 90px;
      line-height: 90px;
      font-size: 34px;
      color: #fff;
      background-image: -webkit-linear-gradient( 90deg, rgb(235,127,40) 0%, rgb(255,183,10) 100%);
    }
    .title{
      line-height: 50px;
      font-size: 32px;
      color: #fff;
      padding: 50px 50px 64px;
      text-align: left;
      word-break: break-all;
      text-align: justify;
    }
    .ask{
      border-radius: 48px;
      width: 488px;
      min-height: 97px;
      line-height: 34px;
      font-size: 30px;
      color: #4b1d04;
      display: flex;
      align-items: center;
      position: relative;
      padding: 20px;
      box-sizing: border-box;
      margin: 0 auto 36px;
      justify-content: center;
      background-image: -webkit-linear-gradient( -90deg, rgb(247,247,247) 0%, rgb(239,239,239) 47%, rgb(230,230,230) 100%);
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
