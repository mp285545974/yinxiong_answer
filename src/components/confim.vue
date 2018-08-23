<template lang="html">
  <div>
    <div class="mask"></div>
    <div class="confim">
      <div class="main">你返回将用完今天的答题机会！确定返回吗？</div>
      <div class="footer">
        <a class="cencle" @click="cencal">取消</a>
        <a class="ok" @click="ok">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {}
  },
  created () {
  },
  methods: {
    cencal(){
      this.$emit('cencal')
    },
    ok(){
      this.$emit('ok')
    }
  }
}
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: rgba(0, 0, 0, 0.5);
  }
  .confim{
    position: fixed;
    z-index: 5000;
    width: 85%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FAFAFC;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    .main{
      padding: 25px 40px;
      font-size: 35px;
      margin-top: 40px;
      color: #888;
      word-wrap: break-word;
      word-break: break-all;
      text-align: left;
    }
    .footer{
      position: relative;
      line-height: 84px;
      margin-top: 40px;
      font-size: 34px;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      &::after{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        border-top: 1px solid #D5D5D6;
        color: #D5D5D6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      a{
        position: relative;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #353535;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      .ok{
        color: #3CC51F;
        &:after{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            height: 100%;
            border-left: 1px solid #D5D5D6;
            color: #D5D5D6;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
        }
      }
    }
  }
</style>
