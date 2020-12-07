<template>
  <div class="search-suggestion">
      <van-cell
      icon="search"
      :title="item"
      v-for="(item,idnex) in suggesOption"
      :key="idnex"
      @click="$emit('search',item)"
      >

      <div slot="title" v-html="hightLing(item)"></div>
      </van-cell>

  </div>
</template>

<script>
// 防抖函数
import { debounce } from 'lodash'
import { suggestionLost } from '@/api/search'
export default {
  name: 'SuggestionIndex',
  components: {

  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggesOption: []
    }
  },
  mounted () {

  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        console.log(value)

        // 防抖数据 每次输入框 防抖数据时间到了 再次调用 函数发送请求
        this.getsuggestionList()
      }, 1000),
      immediate: true // 该回调将会在侦听开始之后立即被调用
    }
  },
  created () {

  },
  methods: {
    async getsuggestionList (q) {
      const { data } = await suggestionLost(this.searchText)
      console.log(data)
      this.suggesOption = data.data.options
    },

    // 处理文职高亮
    hightLing (item) {
      var reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, `<span class="active">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion{
  /deep/span.active{
    color: red;
  }
}
</style>
