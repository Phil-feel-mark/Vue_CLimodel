<template>
  <div class="search-container">
<form class="search-form" action="/">
  <van-search
    v-model="searchText"
    show-action
    background="#3296fa"
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
  <!-- 当输入框没有任何内容 显示历史记录
  当输入框有东西的时候 显示联想功能
  当输入框点击搜索的时候  显示搜索结果 -->
    <!-- 搜索结果       搜索内容有  搜索结果也有-->
  <result :search-text="searchText" v-if="ResultIsShow && searchText"></result>
  <!-- 搜索结果 -->

  <!-- 搜索联想       搜索内容有  搜索结果没有-->
  <search-suggestion :search-text="searchText" v-else-if="searchText " @search="onSearch"></search-suggestion>
  <!-- 搜索联想 -->

  <!-- 搜索历史 -->
  <search-histor v-else :search-history="searchHistory" @search="onSearch"></search-histor>
  <!-- 搜索历史 -->

<!--
    <resul v-if="searchText && isResultShow"></resul>
  <search-suggestion v-else-if="searchText && !isResultShow"></search-suggestion>
  <search-histor v-else></search-histor> -->

    <!-- <resul v-if="searchText && isResultShow"></resul> -->
  <!-- <search-suggestion v-else-if="searchText"></search-suggestion> -->
  <!-- <search-histor v-else></search-histor> -->

  </div>
</template>

<script>
// 导入子组件
import SearchHistor from './component/search-histor'
import SearchSuggestion from './component/search-suggestion'
import Result from './component/search-result'

export default {
  name: 'SeachIndex',
  components: {
    // 注册为私有组件
    SearchHistor,
    SearchSuggestion,
    Result

  },
  data () {
    return {
      searchText: '', // 搜索内容
      ResultIsShow: false, // 搜索结果 控制搜索结果的显示与隐藏
      searchHistory: [] // 搜索历史 记录  定义一个空数组存储
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    onSearch (val) {
      this.searchText = val

      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)

      this.ResultIsShow = true
    },

    onCancel () {
      // this.$toast('取消')
      this.$router.back('/')
    }
  }
}
</script>

<style lang="less" scoped>
.search-container{
  padding-top: 108px;
}
.van-search__action{
    color: #fff
}
.search-form{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

}
</style>
