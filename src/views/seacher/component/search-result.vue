<template>
  <div class="search-containter">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { ResultList } from '@/api/search'
export default {
  name: 'ResultIndex',
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
      list: [],
      loading: false,
      finished: false,

      page: 1, // 页码
      per_page: 20 // 每页大小
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await ResultList({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // 结构赋值 data
        const { results } = data.data
        // 2. 将数据添加到数组列表中
        this.list.push(...results)

        // 3. 将本次加载中的 loading 关闭
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (error) {
        // 展示加载失败的提示状态
        this.$toast('获取数据失败，请稍后重试')

        // 加载失败了 loading 也要关闭
        this.loading = false
        console.error(error)
      }
    }

  }
}
</script>

<style lang="less" scoped>

</style>
