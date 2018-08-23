<template>
  <div class="waaper">
    <!--<div class="rule-btn" @click="showRule">游戏规则</div>-->
    <!--<div class="title">游戏说明</div>-->

    <div class="main">

      <div class="title"><strong>排行榜</strong></div>

      <div class="tabs">
        <span :class="[tabs=='2'?'select':'']" @click="tabsSwitch(2)">日榜</span>
        <span :class="[tabs=='0'?'select':'']" @click="tabsSwitch(0)">期榜</span>
        <span :class="[tabs=='1'?'select':'']" @click="tabsSwitch(1)">总榜</span>
      </div>
      <!-- 日榜 -->
      <ul class="list-box" v-show="tabs==2" @scroll="daySccroll">
          <li v-for="(item,index) in datRank.list" :key="index">
            <rankList :item='item' :index='index' type="2"></rankList>
          </li>
          <li class="null" v-if="!datRank.list.length">暂无数据</li>
          <li class="loding" v-else>{{datRank.end?'已经到底了':'正在加载中'}}</li>
      </ul>
      <!-- 期榜 -->
      <ul class="list-box" v-show="tabs==0" @scroll="batchSccroll">
          <li v-for="(item,index) in batch.list" :key="index">
            <rankList :item='item' :index='index' type="1"></rankList>
          </li>
          <li class="null" v-if="!batch.list.length">暂无数据</li>
          <li class="loding" v-else>{{batch.end?'已经到底了':'正在加载中'}}</li>
      </ul>
      <!-- 总榜 -->
      <ul class="list-box" v-show="tabs==1" @scroll="allSccroll">
          <li v-for="(item,index) in allList.list"  v-if="item.nickname" :key="index">
            <rankList :item='item' :index='index' type=""></rankList>
          </li>
          <li class="null" v-if="!allList.list.length">暂无数据</li>
          <li class="loding" v-else>{{batch.end?'已经到底了':'正在加载中'}}</li>
      </ul>
    </div>
    <!--<div class="me">-->
      <!--<figure class="avatar">-->
        <!--<img :src="myUserinfo.headimgurl" alt="">-->
      <!--</figure>-->
       <!--<div class="name">{{myUserinfo.nickname}}</div>-->
       <!--<span class="label">{{myUserinfo.dan}}</span>-->
       <!--<span class="fen">{{myUserinfo.integral}}分</span>-->
    <!--</div>-->
    <!--<Rule v-show="showRuleStatus" :status="showRuleStatus" @showRule="showRule"></Rule>-->
    <!--<back></back>-->
  </div>
</template>

<script>
import XHR from '../api'
import storage from "../store/storage"
import rankList from '../components/rankList.vue'
import Rule from "../components/rule.vue"
import back from "../components/back"
export default {
  data () {
    return {
      batch: {
        list:[],
        loading:0,
        end:false,
        page:0
      },
      datRank: {
        list:[],
        loading:0,
        end:false,
        page:0
      },
      allList: {
        list:[],
        loading:0,
        end:false,
        page:0
      },
      showRuleStatus: false,
      tabs:'2',
      myUserinfo:{}
    }
  },
  components: {
    rankList,
    Rule,
    back
  },
  created () {
    // this.jump('/')
    this.getWxconfig()
    this.hideshare()
    this.getMyUser()
    this.getTop(this.allList)  // 总榜
    this.getTop(this.batch) // 期榜
    this.getDayRank(this.datRank)  // 日榜
  },
  mounted () {
    this.share()
  },
  methods: {
    showRule(){
      this.showRuleStatus =! this.showRuleStatus
    },
    tabsSwitch(index){
      this.tabs = index
    },
    getDayRank(type) {
      if (type.loading) {
        return
      }
      type.loading = 1
      let json = {
        size:20,
        page:type.page
      }
      XHR.getDayRank(json).then((res) => {
        let {data,status,total} = res.data
        if(!status){
          type.list = [...type.list, ...data]
          if (data.length==0) {
            type.end = true
          }else{
            type.loading = 0
            type.page++
          }
        }
      })
    },
    getTop (type) {
      if (type.loading) {
        return
      }
      type.loading = 1
      let json = {
        project:'king_of_answer',
        size:20,
        page:type.page
      }
      if (type !== this.allList) {
        json['batch'] = window.batch 
      }
      XHR.getTop(json).then((res) => {
        let {data,status} = res.data
        if(!status){
          type.list = [...type.list, ...data]
          if (data.length== 0) {
            type.end = true
          }else{
            type.loading = 0
            type.page++
          }
        }
      })
    },
    allSccroll (e) {
     if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight-100 && !this.allList.loading) {
        this.getTop(this.allList)
      }
    },
    batchSccroll(e) {
      if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight-100 && !this.batch.loading) {
        this.getTop(this.batch)
      }
    },
    daySccroll(e) {
      if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight-100 && !this.datRank.loading) {
        this.getDayRank(this.datRank)
      }
    },
    getMyUser(){
      let user = storage.get('userInfo')
      this.myUserinfo = JSON.parse(user)
      let json={
        uid:`${this.myUserinfo.uid}`
      }
      XHR.getUser(json).then((res) => {
        let {data,status} = res.data
        if(!status){
          this.myUserinfo = data
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

  .waaper{
    flex:1;
    height: 100%;
    display: flex;
    background: url('../../static/img/tip_main_bg.jpg') 50% 50% no-repeat;
    background-size: 100% 100%;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    /*&::before{*/
      /*content:'';*/
      /*display: block;*/
      /*position: absolute;*/
      /*background: url('http://www.vr0101.com/qa/static/img/top-icon.png');*/
      /*width: 724px;*/
      /*height: 397px;*/
      /*top:0px;*/
      /*left: 50%;*/
      /*z-index: 3;*/
      /*margin-left: -362px;*/
    /*} */
  }

  .main{
    flex: 1;
    margin:90px auto 20px;

    /*border:2px dashed rgb(0, 160, 233);*/
    /*background-image: linear-gradient( -85deg, rgb(37,66,161) 10%, rgb(20,63,172) 90%);*/
    /*border-radius:17px;*/
    position: relative;
    padding: 0px 20px 50px;
    /*padding: 130px 60px 50px;*/
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .title{
    font-size: 52px;
    color:#3c84db;
    -webkit-text-stroke: 1px #FFFFFF;
    font-weight:bold;
    text-align: center;
    position: relative;
  }
  .tabs{
    /*background: #2264b1;*/
    margin: 70px 45px 40px 45px;
    height: 80px;
    display: flex;

    span{
      background: url("../../static/img/tab_normal.png") 50% 50% no-repeat;
      background-size: 131px 80px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: #fff;
      flex-direction: column;
      position: relative;
    }
    .select{
      color: #ffffff;

      background: url("../../static/img/tab_selected.png") 50% 50% no-repeat;
      background-size: 131px 80px;
      /*background-image: url("../../static/img/tab_selected.png");*/
      &::after{
        content: '';
        width: 65px;
        height: 4px;
        display: block;
        /*background: #1bdbec;*/
        position: absolute;
        bottom: 6px;
      }
    }
  }
  .list-box{

    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    padding-bottom: 80px;
    box-sizing: border-box;
    .null{
      min-height: 200px;
      color: #fff;
      font-size: 50px;
      text-align: center;
      margin-top: 220px;
      line-height: 200px;
    }
  }
  .list-box li{
    height: 102px;
    margin-bottom: 20px;
    &.loding{
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      color: #fff;
      text-align: center;
      margin-bottom: 0;
    }
  }
  /*.me{*/
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*height: 113px;*/
    /*background-image: -webkit-linear-gradient( -166deg, rgb(13,35,97) 10%, rgb(31,70,160) 90%);*/
    /*box-shadow: 2.5px 4.33px 13px 0px rgb( 32, 208, 240 );*/
    /*z-index: 100;*/
    /*padding:0 83px 0 38px;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*.avatar{*/
      /*width: 84px;*/
      /*height: 84px;*/
      /*border-radius: 50%;*/
      /*overflow: hidden;*/
      /*border: 4px solid #03deff;*/
    /*}*/
    /*.name{*/
      /*font-size: 28px;*/
      /*color: #4fd1f2;*/
      /*margin:0 20px 0 25px;*/
    /*}*/
    /*.label{*/
      /*color: #fff;*/
      /*border-radius: 8px;*/
      /*background-color: rgb( 236, 131, 38 );*/
      /*width: 117px;*/
      /*height: 41px;*/
      /*text-align: center;*/
      /*line-height: 41px;*/
      /*font-size: 22px;*/
    /*}*/
    /*.fen{*/
      /*color: #7bceff;*/
      /*font-size: 30px;*/
      /*flex: 1;*/
      /*text-align: right;*/
    /*}*/
  /*}*/

</style>
