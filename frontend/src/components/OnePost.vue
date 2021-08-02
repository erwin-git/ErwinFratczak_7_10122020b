<template>
    <v-container >
      <v-row justify="space-around">
        <v-hover v-slot:default="{ hover }">
        <v-card width="800" elevation="24" class="mb-16">
          <v-img
            height="500px"
            :src="post.fileUrl"
            :aspect-ratio="16/9"
            lazy-src="https://picsum.photos/510/300?random"
          >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
              style="bottom: 87%; top: 0%;"
              
            >
            </div>
            
          </v-expand-transition>

            <v-app-bar
              flat
              color="rgba(0, 0, 0, 0)"
              
              style="height: 100px; position: relative"
              
            >
              <v-app-bar-nav-icon color="white">
                <v-btn dark icon @click="getBackToPosts()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-app-bar-nav-icon>

              <v-toolbar-title class="text-h6 white--text pl-0"></v-toolbar-title>

              <v-spacer></v-spacer>

              <v-menu bottom left>
                <template 
                v-if="
              $store.state.user.id === post.idUser ||
              $store.state.user.admin === true
          "


                v-slot:activator="{ on, attrs }"
                >
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <EditPost />
                  <DeletePost />
                </v-list>
              </v-menu>
            </v-app-bar>
          </v-img>
          
          <v-card-text style="position: relative">
            <v-fab-transition>
              <v-btn
                color="transparent"
                top
                fab
                absolute
                x-large
                class="ml-5 mb-0"
                
              >
              <v-avatar size="100" class=" elevation-15">
                
                <v-img v-if="post.User.imageURL" :src="post.User.imageURL"></v-img>
                <v-img v-else src="../assets/icon.png"></v-img>

              </v-avatar>
              </v-btn>
              </v-fab-transition>
                <v-layout column align-left class="ml-3 mt-7">
                  <span class="font-weight-black text-right">{{ post.likes.length }} <v-icon color="error">mdi-heart</v-icon>    {{ post.comments.length }} <v-icon color="success">mdi-message</v-icon></span>
                  <h1 class="heading">{{ post.User.firstName }}</h1>
                  <h2 class="heading">{{ post.User.lastName }}</h2>
                </v-layout>
              
              

              <AddComment />

              <v-fab-transition>
                <v-btn class="mr-13"
                  :color="isLiked"
                  dark
                  absolute
                  top
                  right
                  fab
                  small
                  @click="likePost(post.id)"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-fab-transition>
          </v-card-text>
          <span>
          
          
          </span>
          <v-card-title>  
            
          </v-card-title>

          <v-card-text>
            <div class="font-weight-bold ml-8 mr-8">
              
                <p class="text-center" style="line-height: 300%;">
                  <v-icon class="mr-5 mb-5">mdi-format-quote-open-outline</v-icon>
                    {{ post.content }}
                  <v-icon class="ml-5 mt-5">mdi-format-quote-close-outline</v-icon>
                </p> 
              
            </div>
          </v-card-text>

          <v-card-text>
            <div class="caption text-right mr-5" ><v-icon class="mr-3 ml-10">mdi-calendar</v-icon>{{ post.createdAt | moment("calendar")}}</div>
          </v-card-text>

          <template>
            <v-card flat>
              <v-tabs
                v-model="tab"
                background-color="transparent"
                centered
                dark
                icons-and-text
              >
                <v-tabs-slider class="primary--text"></v-tabs-slider>

                <v-tab href="#tab-1" class="black--text">
                  Likes
                  <v-icon large color="error">mdi-heart</v-icon>
                </v-tab>

                <v-tab href="#tab-2" class="black--text">
                  Comments
                  <v-icon large color="success">mdi-message</v-icon>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  :value="'tab-' + 1"
                >
                  <v-card flat>
                    <v-card-text ><Likes /></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  :value="'tab-' + 2"
                >
                  <v-card flat>
                    <v-card-text><Comments /></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>

            </v-card>
          </template>
          
        </v-card>
        </v-hover>
      </v-row>
    </v-container>
  
</template>




<script>
import EditPost from '../components/EditPost.vue'
import DeletePost from '../components/DeletePost.vue'
import Comments from '../components/Comments.vue'
import AddComment from './AddComment.vue'
import Likes from '../components/Likes.vue'

export default {
components: { EditPost, DeletePost, Comments, AddComment, Likes },
data() {
    return {
      tab: null,

    }
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
    isLiked() {
      const userId = this.$store.state.user.id;
      let userLike = this.post.likes.map((a) => a.idUser);
      if (userLike.includes(userId)) {
        return "error";
      } else {
        return "";
      }
    },
    isCommented() {
      const userId = this.$store.state.user.id;
      let userLike = this.post.comments.map((a) => a.idUser);
      if (userLike.includes(userId)) {
        return "success";
      } else {
        return "";
      }
    },

  },
  beforeMount() {
    let id = this.$route.params.id;
    this.$store.dispatch("getPostById", id);
    
  },
  methods: {
      getBackToPosts() {
      this.$router.push("/post");
    },
    likePost(id) {
      const data = 1;
      this.$store.dispatch("likePost", {
        id: id,
        data: data,
      });
      this.$store.dispatch("getPosts");
    },

  },

}
</script>
