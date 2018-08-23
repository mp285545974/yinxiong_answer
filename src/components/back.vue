<template lang="html">
  <div class="back" @click="back">返回首页</div>
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
    back(){
      this.jump('/')
    }
  }
}
</script>

<style lang="css" scoped>
  .back{
    position: fixed;
    background-color: rgba( 0, 46, 115,0.5 );
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    right: 0;
    bottom: 130px;
    width: 155px;
    height: 60px;
    font-size: 28px;
    line-height: 60px;
    color: #fff;
    text-align: center;
    z-index: 5;  
  }
</style>
