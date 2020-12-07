<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count>0?`${comment.reply_count}条回复`:'暂无回复'">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->

    <!-- 评论的回复列表 -->
    <van-cell title="全部回复"></van-cell>
    <comment-list
    :source="comment.com_id"
    type="c"
    />
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from './index.vue'
import CommentList from '@/components/commentlist/index.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList
  },
  props: {
    comment: {
      type: Object,
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

  }
}
</script>

<style lang="less" scoped>

</style>
