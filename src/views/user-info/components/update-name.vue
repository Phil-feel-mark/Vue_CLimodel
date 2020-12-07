<template>
  <div>
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right='UpdateName'
    />

    <div style="padding: 10px">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserName } from '@/api/user.js'
export default {
  name: '',
  components: {

  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  mounted () {

  },
  created () {
  },
  watch: {
    message (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    async UpdateName () {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        if (this.message.trim().length > 0) {
          await updateUserName({
            name: this.message
          })

          // 改变父组件的user
          this.$emit('input', this.message)
          // 关闭弹出层
          this.$emit('close')
        }
        this.$toast.clear()
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
