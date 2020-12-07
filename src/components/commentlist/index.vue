<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
      v-for="(item,index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
// 导入子组件  将评论列表美化
import CommentItem from '@/views/Article/components/index.vue'
export default {
  name: 'CommentList',
  components: {
    'comment-item': CommentItem
  },
  props: {
    // 接收父组件传递的评论列表数据 文章Id  内容
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: { // 这里将list拿出来 上面 的v-for循环也能拿到数据
      type: Array,
      default: () => [] // 默认值
    },
    type: {
      type: String,
      // 自定义 Prop 数据
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null // 文章偏移量
      // limit: 10
    }
  },
  mounted () {

  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () { // 向上拖动的时候触发这个函数
      // 1.发起请求
      try {
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(), // 文章Id
          offset: this.offset,
          limit: 10
        })

        // 2.将返回的数据保存到 list里面
        const { results } = data.data
        this.list.push(...results)
        // console.log(data)

        // 在获取到数据后 将总评论数据传给父组件
        this.$emit('load-success', data.data)

        // 3.关闭loading状态
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          //   有就 继续渲染
          this.offset = data.data.last_id
          return
        }

        if (!results.length) {
          this.finished = true
          return
        }

        //   没有就将finshing设置结束 true
      } catch (error) {
        this.$toast('获取数据失败')
        console.error(error)
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
