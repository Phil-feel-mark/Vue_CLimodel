<template>
  <!-- 未登录状态 -->
  <div class="my-container">
    <div v-if="!user" class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录状态 -->

    <!-- 已登录状态 -->
    <div v-else class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录状态 -->

    <!-- 导航栏 部分 收藏 历史 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 导航栏 部分 收藏 历史 -->

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-9" />
    <van-cell title="退出登录" @click="goLoginOut" v-if="user" class="logout-cell" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {

  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {

  },
  created () {
    // 当页面加载完成就获取到用户的信息
    this.getUser()
  },
  methods: {
    // 将mapmutation 的方法映射到这里 可以直接使用 this.(里面的方法)
    ...mapMutations(['setUser']),
    // 退出登录
    goLoginOut () {
      this.$dialog.confirm({
        title: '标题',
        message: '您确认要离开吗？'
      })
        .then(() => {
          this.setUser(null)
          this.$toast('已退出')
        })
        .catch(() => {
          this.$toast('已取消')
        })
    },

    // 获取用户的信息
    async getUser () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        // 将数据保存到data的userInfo里面以便渲染到页面上
        this.userInfo = data.data
        this.$toast('获取用户信息成功')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mobile-img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  .text {
    font-size: 28px;
    color: #fff;
  }
}
.base-info {
  height: 231px;
  padding: 76px 32px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .avatar {
      width: 132px;
      height: 132px;
      border: 4px solid #fff;
      margin-right: 23px;
    }
    .name {
      font-size: 30px;
      color: #fff;
    }
  }
}
.data-stats {
  display: flex;
  .data-item {
    height: 130px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .count {
      font-size: 36px;
    }
    .text {
      font-size: 23px;
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i.iconfont {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}
.logout-cell {
  text-align: center;
  color: #d86262;
}
.mb-9 {
  margin-bottom: 9px;
}
</style>
