<template>
    <div :class="value===1?'liked':''">
       <van-icon :name="value?'good-job-o':'good-job'" @click="onLike"> </van-icon>
    </div>
</template>

<script>
import { addLike, delLike } from '@/api/articel'
export default {
  name: 'likeArticle',
  components: {

  },
  props: {
    value: {
      type: Number,
      required: true
      //      default() {
      //   return -1
      // }
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  created () {

  },
  methods: {
    async onLike () {
      try {
        // 判断是收藏还是取消收藏
        if (this.value === 1) {
          // 取消收藏
          await delLike(this.articleId)
        } else {
          // 收藏文章
          await addLike(this.articleId)
        }
        this.$emit('input', this.value === 1 ? -1 : 1)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: red;
    // font-size: 20px;
  }
}
</style>
