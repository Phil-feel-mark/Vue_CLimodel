<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
             <!-- 33333333333  循环创建对应list组件 -->
        <article-list :channels="item"></article-list>
        </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div @click="isEditePopupShow = true" slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 弹出层      -->

    <van-popup
    v-model="isEditePopupShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
    @update-active = 'onUpdateActive'
    >
    <!-- 弹层内的内容***********************************333333333333333 -->
    <channel-edit
    :my-channels="channels"
    :active="active"
    ></channel-edit>
    </van-popup>
    <!-- 弹出层      -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getchannels } from '@/api/user'
import { getItem } from '@/utils/storage'
// 导入 子组件 的列表  111111111
import ArticleList from './components/ArticleList'
import ChannelEdit from './components/channel-edit' // 11111111111

export default {
  name: 'HomeIndex',
  components: {
    // 将它注册为私有组件 2222222222
    ArticleList,
    ChannelEdit // 22222222222

  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isEditePopupShow: false // 控制弹出层的显示与隐藏
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // const { data: { data: { channels } } } = await getchannels()
    // this.channels = channels
    // 页面加载完成 就发起请求  获取频道列表
    this.getUserChannels()
  },
  mounted () {},
  methods: {
    // 获取用户频道列表
    async getUserChannels () {
      // const { data } = await getchannels()
      // this.channels = data.data.channels
      let channels = []

      if (this.user) {
        // 在这里还要判断用户是否登录 如果登录了 就发请求
        const { data } = await getchannels()

        channels = data.data.channels
      } else {
        // 没登录就从本地储存获取 或者拿到推荐列表
        const locaChannels = getItem('TOUTIAO_CHANNELS') // 先取出本地的东西 在判断有没有
        if (locaChannels) {
          channels = locaChannels
        } else {
          // 如果本地没有 发送请求 获取推荐列表
          const { data } = await getchannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    },

    onUpdateActive (index, isEditePopupShow = false) {
      this.active = index
      this.isEditePopupShow = false
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
  }
}

.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.902);
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 58px;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>
