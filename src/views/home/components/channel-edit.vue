<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="edit-btn"
        slot="default"
        round
        type="danger"
        :border="false"
        size="mini"
        plain
        @click="isEdit=!isEdit"
      >
        {{isEdit?'编辑':'完成'}}</van-button>
    </van-cell>
    <!-- 宫格 -->
    <van-grid :gutter="10" class="my-grid" :column-num="4">
      <van-grid-item
        class="grid-item"
        :class="{active:index === active}"
        :border="false"
        v-for="(item,index) in myChannels"
        :key="index"
        :text="item.name"
        :icon="!isEdit && !fixChannels.includes(item.id)? 'clear':''"
        @click="onMyChannelClick(item,index)"
      />
    </van-grid>
    <!-- 我的频道 -->

    <!-- 频道推荐 -->
    <van-cell title="频道推荐"> </van-cell>
    <!-- 宫格 -->
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        icon="plus"
        class="grid-item"
        :border="false"
        v-for="(item,index) in remendChannels"
        :key="index"
        :text="item.name"
        @click="addChannels(item)"

      />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
import { getChannelList, AddChannelItem, delChannlesItem } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: '',
  components: {

  },
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  }, // 这里的组件只是在 父组件展示 并没有传值
  // 如果需要传值 则用props接收  父组件那边 也会用 :属性= ‘...’的方式将数据传送过来
  data () {
    return {
      ChannelList: [],
      isEdit: false, // 控制编辑按钮
      fixChannels: [0, 11] // 不能被编辑的频道ID
    }
  },
  mounted () {

  },
  computed: {
    ...mapState(['user']),
    remendChannels () {
      // 过滤出我的频道的 不在全部频道
      return this.ChannelList.filter(item1 => {
        const f = this.myChannels.find(item2 => item2.id === item1.id)
        return !f
      })
    }

  },
  created () {
    this.getAllChannelsList()
  },
  methods: {
    async getAllChannelsList () {
      try {
        const { data } = await getChannelList()
        console.log(data)
        this.ChannelList = data.data.channels
      } catch (error) {
        console.error(error)
        this.$toast('获取频道列表失败')
      }
    },

    // 向我的频道添加频道
    async addChannels (value) {
      this.myChannels.push(value)
      // 先判断用户是否为登录状态
      if (this.user) {
        // 登录状态发送请求
        try {
          await AddChannelItem({
            id: value.id,
            seq: this.myChannels.length
          })
        } catch (error) {
          console.error(error)
          this.$toast('添加失败')
        }
      } else {
        // 未登录保存到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // ************************************************************************
    // 删除频道
    async onMyChannelClick (channel, index) {
      if (!this.isEdit) {
        // 删除
        // 如果是固定频道，则不删除
        if (!this.fixChannels.includes(index)) {
          this.myChannels.splice(index, 1)
          if (index <= this.active) {
            this.$emit('update-active', this.active - 1, true)
          }
        }
      } else {
        // console.log('123')
        this.$emit('update-active', index)
      }
      // 处理持久化
      if (this.user) {
        // 用户登录了 点击删除 发起请求
        await delChannlesItem(channel.id)
      } else {
        // 未登录保存到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }

  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
}
.van-cell__title {
  font-size: 32px;
  color: #333333;
}

.edit-btn {
  width: 104px;
  height: 48px;
  font-size: 26px;
  color: #f85959;
  border: 1px solid #f85959;
}
/deep/ .grid-item {
  width: 160px;
  height: 86px;
  &.active{
    .van-grid-item__content .van-grid-item__text{
      color:red  !important
    }
  }
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }

    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
/deep/ .my-grid {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }
}
/deep/ .recommend-grid {
  .grid-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
    }
  }
}
</style>
