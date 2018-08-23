<template>
  <canvas id="canvas" width="70" height="70"></canvas>
</template>

<script>
export default {
  props:['qsIndex','lock'],
  data () {
    return {
      countDownSeconds:15,
      currentSeconds:15
    }
  },
  created () {
    this.drawDoubleCircle()
    this.interval_id = setInterval(()=>{
      this.drawDoubleCircle()
    }, 1e3);
  },
  watch: {
    qsIndex (val, oldVal) {
      if (this.countDownSeconds>=11) {
        this.countDownSeconds = 15
        this.currentSeconds = 15
        this.drawDoubleCircle()
        this.interval_id = setInterval(()=>{
          this.drawDoubleCircle()
        }, 1e3);
      }
      if (val =='10') {
        clearInterval(this.interval_id);
      }
    },
    lock (val, oldVal) {
       if(val!='false'){
         clearInterval(this.interval_id);
         this.countDownSeconds = 15
         this.currentSeconds = 15
         this.drawDoubleCircle()
       }
    }
  },
  mounted () {
  },
  methods: {
    drawDoubleCircle() {
      if (this.currentSeconds <= 0) {
        clearInterval(this.interval_id);
        this.countDownSeconds = 15
        this.currentSeconds = 15
        this.$emit('stopCall')
      }
      let canvasElement = document.getElementById('canvas');
      if (!canvasElement){
        clearInterval(this.interval_id)
        return
      } 
      let context = canvasElement.getContext('2d');
      let progress = 360 * this.currentSeconds / this.countDownSeconds;
      let progress_pi = Math.PI * (progress / 180 - 1 / 2);

      context.beginPath();
      context.arc(30, 30, 35, 0, Math.PI * 2, false);
      context.lineWidth=0;
      context.strokeStyle='#f96fc2';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.arc(30, 30, 35, -Math.PI * 1 / 2, progress_pi, false);
      context.lineWidth=0;
      context.strokeStyle='#f96fc2';
      context.stroke();
      context.closePath();

      context.beginPath();
      context.arc(30, 30, 33, 0, Math.PI * 2, false);
      context.closePath();

      context.fillStyle = '#f96fc2';
      context.fill();
      context.font = "bold 32px huakang";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = 'middle';
      context.fillText(this.currentSeconds, 26, 32);
      // 抗锯齿
      context.globalCompositeOperation = 'source-atop';
      this.currentSeconds--;
    }
  }
}
</script>

<style scoped lang="less">

</style>
