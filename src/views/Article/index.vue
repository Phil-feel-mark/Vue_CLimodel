<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注子组件视图*********************************************************** -->
          <!-- <follow-user
             :is_followed="article.is_followed"
             :user_id="article.aut_id"
             @update-follow="article.is_followed = $event">
         </follow-user> -->

          <follow-user
            v-model="article.is_followed"
            :user_id="article.aut_id"
          ></follow-user>
          <!-- 关注子组件视图-->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表子组件************************************************** -->
        <comment-list
        @reply-click="OnReplyClick"
        :source="article.art_id"
        @load-success="commenttotal=$event.total_count"
        :list="commentList"
        ></comment-list>
        <!-- 评论列表子组件-->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button @click="iscommentShow = true" class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="commenttotal" color="#777" />
          <!-- 收藏子组件视图 **********************************************-->
          <collec-article :value="article.is_collected" :articleId="article.art_id" @input="article.is_collected=$event"></collec-article>
          <!-- 点赞子组件视图************************************************************** -->
          <like-article :articleId="article.art_id" :value="article.attitude" @input="article.attitude=$event"></like-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论弹出层 -->
        <van-popup
        v-model="iscommentShow"
        position="bottom">
        <!-- 评论内容子组件 ****************************************************-->
          <comment-popup
          :target="article.art_id"
          @post-success="onPostSuccess"
          ></comment-popup>
        </van-popup>

        <!-- 评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="getArticleInfo()" class="retry-btn"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复 -->
      <van-popup
      v-model="isReplShow"
      position="bottom"
      :style="{ height: '90%' }" >
      <!-- 回复评论的子组件********************************************************* -->
      <comment-reply :comment="currentComment" @close="isReplShow = false"></comment-reply>
      </van-popup>
    <!-- 评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/articel'
import { ImagePreview } from 'vant'
// import { addFollow, delFollow } from '@/api/user'
// 导入子组件
import FollowUser from '@/components/follow-user/follow.vue'
import CollecArticle from '@/components/collectArticle/index.vue'
import LikeArticle from '@/components/likeArticle/index.vue'
import CommentList from '@/components/commentlist/index.vue'
import CommentPopup from '@/views/Article/components/comment-popup.vue'
import CommentReply from '@/views/Article/components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    // 将组件注册为私有组件
    FollowUser, // 关注组件
    CollecArticle, // 收藏组件
    LikeArticle, // 点赞组件
    CommentList, // 评论列表组件
    CommentPopup, // 点击写评论里面的内容组件 弹出层
    CommentReply
  },
  props: {
    // 路由传递的参数
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: [], // 页面的数据存储
      loading: true, // 加载状态
      errStatus: 0,
      followLoading: false, // 控制关注的加载状态
      commenttotal: 0,
      iscommentShow: false, // 控制评论弹出层的显示隐藏
      isReplShow: false, // 控制评论回复的隐藏
      currentComment: {}, // 当前点击评论回复项
      commentList: [] // 评论列表   现在commentlist组件将list数组的值传到父组件
      // 子传父  通过 list:{type:Array,default:()=>[为空 默认值]}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleInfo()
  },
  mounted () {},
  methods: {
    async getArticleInfo () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)

        if (Math.random() > 0.5) {
          JSON.parse('asdfkj;aslkdj')
        }

        this.article = data.data

        // 获取图片DOM节点
        setTimeout(() => {
          this.previewImg()
        }, 0)

        // 、数据获取成功关闭loading状态
        this.loading = false
      } catch (err) {
        // 加载失败 404
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }

        this.loading = false
        this.$toast('获取失败')
      }
      // 加载完成
      this.loading = false
    },

    previewImg () {
      // DOM节点
      const articleContent = this.$refs['article-content']
      // 获取到DOM节点
      const allImg = articleContent.querySelectorAll('img')
      // 定义一个空数组
      const images = []
      // 遍历获取到的DOM节点
      allImg.forEach((element, index) => {
        images.push(element.src) // 向空数组添加src节点
        element.onclick = () => { // 给每个图片绑定点击事件
          ImagePreview({
            // 预览的图片数组
            images: images,
            // 起始位置
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      // 关闭弹出层
      this.iscommentShow = false
      // 将评论内容添加到顶部

      this.commentList.unshift(data.new_obj)
    },
    OnReplyClick (comments) {
      console.log(comments) // 爷爷孙子组件  这个是孙子传过来的每一项评论的数据

      this.currentComment = comments // 这里会将孙子组件传递过来的每一项评论数据传递给回复的专有组件

      this.isReplShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
