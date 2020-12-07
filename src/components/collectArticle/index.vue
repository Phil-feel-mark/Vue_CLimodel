<template>
    <div :class="value?'collected':''">
       <van-icon :name="value?'star':'star-o'" @click="onCollect"> </van-icon>
    </div>
</template>

<script>
import { addCollect, delCollect } from '@/api/articel'
export default {
  name: 'collectArticle',
  components: {

  },
  props: {
    value: {
      type: Boolean,
      required: true
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
    async onCollect () {
      try {
        // 判断是收藏还是取消收藏
        if (this.value) {
          // 取消收藏
          await delCollect(this.articleId)
        } else {
          // 收藏文章
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
    // font-size: 20px;
  }
}
</style>
