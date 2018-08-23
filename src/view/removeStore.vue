<template>
  <div class="wrap">
    <span v-if="ok">缓存已经清空</span> 
    <button class="button" @click="clear" v-else>清空所有缓存</button>
  </div>
</template>

<script>
import storage from "../store/storage"
export default {
  data () {
    return {
      ok:0
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    clear(){
      localStorage.clear()
      this.ok=1
    }
  }
}
</script>

<style scoped lang="less">
.wrap{
  text-align: center;
}
  .button,span{
    display: block;
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    margin:100px auto;
  }
</style>
