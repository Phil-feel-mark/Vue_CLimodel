<template>
  <div class="article-list">
    <!-- List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件 -->
    <van-pull-refresh
      :success-duration="1500"
      v-model="isRefsLoadingShow"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <!-- 连接 循环 子组件  让子组件在页面上显示具体内容  :article="item" 给子组件挂载数据  -->
        <aritcle-item v-for="item in list" :key="item.art_id+''" :article="item"></aritcle-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
m,
<script>
import { getArticle } from '@/api/articel'
// 引入子组件
import AritcleItem from '@/components/Aritcle/AritcleItem'
export default {
  name: 'ArticleList',
  components: {
    // 将引入的子组件 注册为私有组件
    AritcleItem
  },
  props: {
    // 接收对应的参数
    channels: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false, // 控制加载 中loading 状态
      finished: false, // 控制加载结束状态
      timestamp: Date.now(), // 获取到历史时间
      error: false,
      isRefsLoadingShow: false, // 控制下拉框的 显示
      refreshSuccessText: '' // 控制显示下拉后的文字显示
    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      try {
        const { data } = await getArticle({
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          channel_id: this.channels.id, // 频道ID
          timestamp: this.timestamp, // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        if (Math.random() > 0.5) {
          JSON.parse('dddddddd')
        }
        // console.log(data.data)
        // this.list = data.data
        // 2. 把请求结果数据放到 list 数组中

        // 数组的展开操作符，它会把数组元素一个一个拿出来
        const result = data.data.results
        this.list.push(...result)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (result.length > 0) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
        // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
          this.finished = true
        }

        // 展示错误提示状态

      // 请求失败了，loading 也需要关闭
      } catch (error) {
        // 模拟随机失败的情况
        // console.error(error)
        this.error = true
        this.loading = false
      }
    },

    // 下拉框 功能
    async onRefresh () {
      // 下拉框思路
      // 1.在data里面定义一个控制 显示 与隐藏的下拉框控件 默认是false  下拉后是true
      // 2.onRefresh 是组件自带的函数  下拉 就会触发这个函数 触发这个函数是 发起请求
      //  跟获取新闻的接口一样  获取回来的数据添加到 文章列表的 头部 并提示获取到多少数据
      //  success-text 然后关闭 下拉框
      try {
        const { data } = await getArticle({
          channel_id: this.channels.id, // 频道ID
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        console.log(data)
        // 随机模拟 获取失败的情况
        if (Math.random() > 0.5) {
          JSON.parse('dddddddddd')
        }
        // 将获取到的当前数据  添加到头部
        this.list.unshift(...data.data.results)

        this.refreshSuccessText = `刷新成功，共获取到${data.data.results.length}条信息`

        // 关闭下拉框
        this.isRefsLoadingShow = false
      } catch (error) {
        console.error(error)
        // 给出提示文字告诉用户刷新失败
        this.refreshSuccessText = '刷新失败'
        this.isRefsLoadingShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
