<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="addPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    // 接收文章Id 写评论是针对整篇文章 所以需要文章的ID
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async addPost () {
      try {
        //   1.发起请求
        const { data } = await addComment({
          target: this.target, // 文章id
          content: this.message, // 评论内容
          art_id: null

        })
        console.log(data)
        // 2.关闭弹出层
        this.$emit('post-success', data.data) // 这里的data.data 是发起请求后 返回的整体数据是个对象
        // 3.将内容发布到列表项顶部
        // 4.清空内容
        this.message = ''
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
