<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" ref="file" hidden @change="OnFileChange">
    <van-cell title="头像" is-link @click="OnClickPhoto">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isShowUpdateName = true"
      :value="user.name"
      is-link
    />
    <van-cell title="性别" @click="isShowUpdateGender = true" :value="user.gender === 0 ? '男' : '女'" is-link />
    <van-cell title="生日" @click="isShowUpdateBirthday = true" :value="user.birthday" is-link />

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <update-name
        v-if="isShowUpdateName"
        v-model="user.name"
        @close="isShowUpdateName = false"
      />
    </van-popup>
    <!-- 编辑昵称 -->

    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <update-gender @close="isShowUpdateGender = false"  v-model="user.gender"/>

    </van-popup>
    <!-- 编辑性别弹层 -->

    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthday" position="bottom">
      <update-birthday v-if="isShowUpdateBirthday" @close="isShowUpdateBirthday = false" v-model="user.birthday"/>
    </van-popup>
    <!-- 编辑生日弹层 -->

    <!-- 编辑头像弹层 -->
    <van-popup v-model="isShowUpdatePhoto" position="bottom" :style="{ height: '100%' }">
      <update-photo v-if="isShowUpdatePhoto" @update-avatar="user.photo = $event" @close="isShowUpdatePhoto = false" :img="img"/>
    </van-popup>
    <!-- 编辑头像弹层 -->
  </div>

</template>

<script>
import { getUserProfile } from '@/api/user.js'
// 导入子组件
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: '',
  components: {
    // 注册私有组件
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isShowUpdateName: false, // 控制编辑昵称弹出层的显示隐藏
      isShowUpdateGender: false, // 控制编辑性别弹出层的显示隐藏
      isShowUpdateBirthday: false,
      isShowUpdatePhoto: false,
      img: ''
    }
  },
  mounted () {

  },
  created () {
    this.loadProfile()
  },
  methods: {
    async loadProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        // console.log(data)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    OnClickPhoto () {
      this.$refs.file.click()
    },
    OnFileChange () {
      const file = this.$refs.file.files[0]
      console.log(file)

      this.img = window.URL.createObjectURL(file)
      this.$refs.file.value = ''
      this.isShowUpdatePhoto = true
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
