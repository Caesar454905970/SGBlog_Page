<template>
  <div>
    HighCharts
    <div>
      <div ref="stockChartRef" id="ecg-chart"></div>
      <div id="termChart" class="term-chart"></div>
      <p id="test">这是段落中的<b>粗体</b>文本。</p>
      <button id="btn1">显示文本</button>
      <button id="btn2">显示 HTML</button>
    </div>
    <div>
      <el-button @click="getEcgDataByReportId">
        获取数据
      </el-button>
    </div>
  </div>
</template>

<script setup>
import {
  InfoFilled,
  User,
  Iphone,
  Location,
  Tickets,
  OfficeBuilding,
} from '@element-plus/icons-vue'
import {onMounted, reactive, ref, toRefs, onUpdated, onBeforeMount, watch} from "vue";
import {ElMessage} from 'element-plus'
import {useRouter} from "vue-router";
import {parseTime} from "../../utils/ruoyi.js";
import { Bottom,Edit, Share, Delete, Search, Upload,Refresh } from '@element-plus/icons-vue'
import qs from "qs";
//导入全局的汉化配置
import defaultHighcharts from '../../utils/highcharts-zh_CN'
import defaultSettings from '../../settings'

import Highcharts from 'highcharts/highstock';
import xrange from 'highcharts/modules/xrange';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';
import $ from 'jquery'
xrange(Highcharts)
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

import axios from "axios";
/***************数据********************/
const { arr_hrv_test } = defaultSettings
const hight_ecgchartObj=ref('')
const hight_termChartObj=ref('')
const { defaultOptionsZhCn } = defaultHighcharts



const hrvEcg=reactive({
  /*接口返回的数据*/
  stratTime: 1648204646755,
  endTime: 1648205007636,
  data:[],
  data_time:[],
  /*数据*/


  /*配置信息*/
  getObj :{
    "termActionProgress":'',
    "height": 250,
    "page": 1,
    "width": 1800,
    "data": [],
    "fs": 250,
    "measureTime": 1648204646755,
    "type": "ecg",
    zones:[
      {color: "#000000"}
    ]
  },
  ecgParam :{
    ecgDur: 4, //每个点的相隔时间
    ecgHeight: 250, ecgXHeight: 25, ecgBottom: 0,
    termHeight: 80, termTop: 0, //cTop + ecgHeight + ecgXHeight
    termBarHeight: 16, termBarMargin: 4,
    sBarHeight: 30, sBarBottom: 15,
    ecgFs: 250,  //每秒的点频率
    ecgYValue: 60000,  //ecg的值默认是25000
    ecgScreenTime: 10 * 1000,  //ECG X轴上显示的数据时间
    //rr的X轴为15高度, 目前不用RR的值
    //rrHeight: 140, rrTop: 0, //ecgTop + ecgHeight
    //rrInterval:80 /** 将rrY轴分割为3份 **/,rrMaxValue: 240,  //最高值为rrInterval*3,一般不会超过当前值
    //整个chart的值
    cWidth: 1250, cLeft: 15, cRight: 15, cTop: 10, cBottom: 0,
    cHeight: 0,  //ecgHeight + ecgXHeight + cTop + termHeight + sBarHeight + sBarBottom
  }
})
let Hz = 1000 /  hrvEcg.getObj.fs; // objDt.fs
let cellHeight = hrvEcg.ecgParam.ecgYValue / 50;
let pageDt = 6 * (hrvEcg.getObj.page - 1) * 1000;
let startdt = hrvEcg.getObj.measureTime;
startdt += pageDt;
let selectTermInfo = null; //{st:'起始时间', et:'结束时间', c:'类别', no:'测试顺序编号'}
let ecgChart, termChart,
    selectPlotBandId = null,
    addPlotBandStart = null, addPlotBandEnd = null,
    addCount = 0;
let plotBandType = {};  //类型 : id
/***************函数方法********************/
//监听数据变化，修改highcharts的数据属性
watch(hrvEcg.data_time,()=>{
  hight_ecgchartObj.value.series[0].setData(hrvEcg.data_time)
})
//通过reportId获取报告整个的HRV数据：因为有超时的问题，不走全局axios
const getEcgDataByReportId=()=>{
  let arr=arr_hrv_test
  console.log(arr.length)
  for (let i=0; i<arr.length; i++){
    // for(const item of hrvEcg.data){
    hrvEcg.data_time.push([hrvEcg.stratTime+(i*4),arr[i]])
  }
  /*
  //进度条恢复为 0
  percentage.number= 0;
  //切换进入服务器计算中
  percentage.strps_active=1
  const param ={
  }
  // console.log("reportId",ReportDetail.value.reportId)
  if(ReportDetail.value.reportId){
    param.reportId=ReportDetail.value.reportId
    //发起请求
    EcgDataGet(param,onDownloadProgress
    ).then(res=>{
      // console.log("请求成功了",res)
      if (res.code === 200) {
        // ElMessage({
        //   message: "下载数据成功",
        //   type: 'success',
        //   showClose: true,
        //   duration: 2000,
        // })
        EcgData.value = res.data.data
        hrvEcg.data = res.data.data
        hrvEcg.stratTime = res.data.report.st
        console.log("hrvEcg.data",hrvEcg.data)
        //遍历每一条数据
        console.log("遍历每一条数据开始")
        for (let i=0; i<hrvEcg.data.length; i++){
          // for(const item of hrvEcg.data){
          hrvEcg.data_time.push([hrvEcg.stratTime+(i*4),hrvEcg.data[i]])
        }
        console.log("hrvEcg.data_time",hrvEcg.data_time)
        //关闭获取数据窗口
        console.log("遍历每一条数据结束")
        GetHrvDataDialogVisible.value = false
      }
      else{
        ElMessage({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 10000,
        })
      }
    })
  }
  else {
    EcgData.value=''
  }
*/


}
/**
 * 跳转到新的位置
 * @param tSt
 * @param tEt
 */
function jumpToNewPosition(tSt, tEt) {
  let st = 0, et = 0;
  if (tSt - tEt < hrvEcg.ecgParam.ecgScreenTime &&   //不足10秒
      tSt + hrvEcg.ecgParam.ecgScreenTime > hrvEcg.endTime) {  //起始时间处+10后>reportData.et
    et =hrvEcg.endTime;
    st = et - hrvEcg.ecgParam.ecgScreenTime;
  } else {
    st = tSt;
    et = st + hrvEcg.ecgParam.ecgScreenTime;
  }
  hight_ecgchartObj.value.xAxis[0].setExtremes(st, et);
  hight_ecgchartObj.value.xAxis[0].update({min:st, max:et});
  setTermProgressBand(st, et);
}
/*********** 添加动作界面上的进度条信息 ***********/
let termProgressId = null;

function setTermProgressBand(start, end) {
  if (!termChart) return;
  if (termProgressId) {
    termChart.xAxis[0].removePlotBand(termProgressId);
    termProgressId = null;
  }
  termProgressId = 'termProgress';
  let termProgressPb = {
    borderColor: 'rgba(69, 114, 167, 0.25)',
    borderWidth: 0,
    color: 'rgba(69, 114, 167, 0.25)',
    from: start,
    to: end,
    id: termProgressId,
    excName: 'Progress',
    zIndex: 10,
    label: {enabled: false}
  };
  termChart.xAxis[0].addPlotBand(termProgressPb);
}
$(document).ready(function(){
  $("#btn1").click(function(){
    alert("Text: " + $("#test").text());
  });
  $("#btn2").click(function(){
    alert("HTML: " + $("#test").html());
  });
});
/**************初始化******************/
onMounted(() => {



  hight_termChartObj.value=new Highcharts.chart('termChart',{
    chart: {
      type: 'xrange',
      height: hrvEcg.ecgParam.termHeight,
      margin: [1, hrvEcg.ecgParam.cRight, 1, hrvEcg.ecgParam.cLeft],

    },
    legend: {enabled: false},
    // 选中缩放的地方
    rangeSelector: {enabled: false},
    yAxis: [{
      title: {text: ''},
      categories: ['term', 'action', 'error'],
      //reversed: true
    }],
    xAxis: {
      type: 'datetime',
      lineWidth: 1,
      labels: {
        enabled: false, //是否显示x轴
      },
      dateTimeLabelFormats: {
        week: '%Y/%m/%d'
      },
      min: hrvEcg.stratTime,
      max: hrvEcg.endTime
    },

    series: [{
      name: 'termData',
      states: {hover: {brightness: -0.3 /** darken **/}},
      borderColor: 'gray',
      pointWidth: 20,
      data: hrvEcg.data_time,
      dataLabels: {enabled: true},
      events: {
        // 记录选中状态
        click: function (evt) {
          let point = evt.point;
          if (point.y === 2) {  //选中动作
            selectTermInfo = {st: point.x, et: point.x2/*, c:point.y, n:point.id*/};
            // resetDataRangePicker(selectTermInfo.st, selectTermInfo.et);
          }
          jumpToNewPosition(point.x, point.x2);
          return false;
        }
      }
    },],

  })


  //汉化图标
  Highcharts.setOptions(defaultOptionsZhCn)
  //通过ref获取当前的表对象
  hight_ecgchartObj.value = new Highcharts.stockChart("ecg-chart",
      //配置文件
      {


        rangeSelector: {
          enabled: false,
        },
        xAxis: {
          showInNavigator: true,
          type: 'datetime',
          min: hrvEcg.stratTime,
          max: hrvEcg.stratTime + hrvEcg.ecgParam.ecgScreenTime,
          startOnTick: true,
          tickLength: 7, // 刻度线的长度
          tickPixelInterval: 25,
          //maxTickInterval: 200, // 每大格0.2S
          //tickInterval: 200, // 每大格0.2S
          lineColor: '#FFB4B4',
          gridLineWidth: 1, // 网格线的宽度
          gridLineColor: '#FFB4B4', //网格线的颜色 #ed7b10
          minorGridLineColor: '#FFDCDC', //次级网格线的颜色 b0a091
          minorGridLineWidth: 1, //次级网格线的宽度
          minorTickInterval: 40, //次级网格的间距 0.04S
          //设置区域带 表示删除 或异常
          plotBands: [],
          labels: {
            enabled: true, //是否显示x轴
            step: 5,
            align: 'center',
            format: '{value:%H:%M:%S}'
          },
          events: {
            afterSetExtremes: function (e) {
              console.log("---------- afterSetExtremes --------------");
              console.log(this);
              setTermProgressBand(e.min, e.max);
            }
          }
        },

        yAxis: [{
          id: 'a1',
          opposite: false,
          min: -hrvEcg.ecgParam.ecgYValue / 2,
          max: hrvEcg.ecgParam.ecgYValue / 2,
          tickInterval: cellHeight * 5, // 每大格0.5 毫伏 500
          height: hrvEcg.ecgParam.ecgHeight,
          lineWidth: 1,
          lineColor: '#FFB4B4',
          gridLineWidth: 1,
          gridLineColor: '#FFB4B4', // #ed7b10
          minTickInterval: 1,
          minorGridLineWidth: 1, // 次级网格线的宽度 0.8
          //minorGridLineDashStyle: "shortdot", //次级网格线是点线
          minorGridLineColor: '#FFDCDC', // 次级网格线的颜色 b0a091
          minorTickInterval: 'auto', // 次级网格的间隔 0.1毫伏 100
          labels: {
            enabled: true
          }
        }],
        title: {
          text: '心电图',
        }
        ,
        series: [
          {
            id: 'ecgData',
            type: 'line',
            states: {
              hover: {
                enabled: false
              }
            },
            showInNavigator: true,
            enableMouseTracking: false,
            pointStart: startdt, // 第一个点的时间
            pointInterval: Hz, // 频率
            //pointIntervalUnit: 'milliseconds',
            dashStyle: 'solid',
            data: hrvEcg.data_time,
            index: 0,
            zIndex: 0,
            zoneAxis: 'x',
            lineWidth: 1,
            color: '#000',
            enabled: true
          },
        ],
        // scrollbar: {enabled: false},
        // 图表缩放导航
        navigator: {
          enabled: true,
          handles: {enabled: false},  //禁止扩展
          height: hrvEcg.ecgParam.sBarHeight,
          margin: 1,
          //max:300,
          //tickAmount:300,
          //adaptToUpdatedData: false,
          series: {
            /*pointStart: startdt, // 第一个点的时间
            pointInterval: Hz*5, // 频率
            data: objDt.navigatorData?objDt.navigatorData:null
            //pointIntervalUnit: 'milliseconds',*/
            zones: (hrvEcg.getObj.zones ? hrvEcg.getObj.zones : [])
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              minute: '%H:%M:%S'
            }
          }
        },











      }
  );
})
</script>

<style lang='less' scoped>

</style>
