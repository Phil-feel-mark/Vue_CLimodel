<template>
<div class="login-container">
  <!-- 登录导航栏 -->
  <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon name="cross" slot="left" @click="$router.back()" />
  </van-nav-bar>

  <!-- form登录表单 -->
<van-form ref="loginFormRef" @submit="onSubmit">
    <van-field
      v-model="user.mobile"
      name="mobile"
      left-icon="smile-o"
      placeholder="请输入手机号码"
      :rules="userRulesFrom.mobile"
      type="number"
      maxlength="11"
    >
    <!-- 作用域插槽 自定义自己的字体图标 -->
    <i slot="left-icon" class="toutiao toutiao-shouji"></i>
    </van-field>
    <van-field
      v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userRulesFrom.code"
      type="number"
      maxlength="6"
    >
       <!-- 作用域插槽 自定义自己的字体图标 -->
    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <!-- 倒计时组件 -->
        <van-count-down @finish="isCountDownShow = false" v-if="isCountDownShow"  :time="1000 * 3" format="ss s" />
        <!-- v-slot = 'button' -->
        <van-button  class="send-sms-btn" size="small" round type="default" @click="sendMsg" v-else>发送验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn-wrap">
      <van-button round block type="info" class="login-btn" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '18481800367',
        code: '246810'
      },
      // 定义文本框的规则  给发起请求做准备
      userRulesFrom: {
        mobile: [
          { required: true, message: '请填写手机号码' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请填写正确的手机号码' }

        ],
        code: [
          { required: true, message: '请填写密码' },
          { pattern: /^\d{6}$/, message: '请填写正确的密码' }
        ]
      },
      isCountDownShow: false
    }
  },
  // 计算属性
  computed: {},
  //   侦听器
  watch: {},
  //   生命周期
  created () {},
  mounted () {},
  //   方法
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      // 1.获取表单数据
      // 2. 表单验证
      // 3. 提交表单请求登录
      // 4. 根据请求响应结果处理后续操作
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 请求登录
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },

    async sendMsg () {
      // 校验手机号码
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3.发送请求
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
