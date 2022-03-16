<template>
  <div

      class="ValidCode disabled-select"
      :style="`width:${width}; height:${height}`"
      @click="refreshCode"
  >
    <span
        v-for="(item, index) in codeList"
        :key="index"
        :style="getStyle(item)"
    >{{ item.code }}</span>
  </div>
</template>

<script>
/**
 * 前端生成验证码
 */
export default {
  name: 'ValidCode',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    width: {
      type: String,
      // default: '100px'
      default: '100px'
    },
    height: {
      type: String,
      // default: '40px'
      default: '40px'
    },
    length: {
      type: Number,
      default: 4
    },
    refresh: {
      type: Number
    }
  },
  data () {
    return {
      codeList: []
    }
  },
  watch: {
    refresh () {
      this.createdCode()
    }
  },
  mounted () {
    this.createdCode()
  },
  methods: {
    refreshCode () {
      this.createdCode()
    },
    createdCode () {
      const len = this.length
      const codeList = []
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
      const charsLen = chars.length
      // 生成
      for (let i = 0; i < len; i++) {
        const rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          // fontSize: `${10 + (+[Math.floor(Math.random() * 10)] + 2)}px`, //默认字体大小
          fontSize: `1vw`, //默认字体大小
          // padding: `${[Math.floor(Math.random() * 10)]}px`,//每个验证码中间的间距
          padding: `0.2vw`,
          // transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)` //验证码旋转的角度
        })
      }
      // 指向
      this.codeList = codeList
      // 将当前数据派发出去
      // console.log(codeList.map(item => item.code).join(''))
      this.$emit('input', codeList.map(item => item.code).join(''))
    },
    getStyle (data) {
      // return `background-color:#AEE0FA;color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
    }
  }
}
</script>

<style scoped>
.ValidCode{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.ValidCode span{
  display: inline-block;
}
</style>
