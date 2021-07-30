<template>
  <div class="posts">
    
    <v-container>
      
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-action>
                <v-icon >edit</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Edit Post</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>

      
      <v-layout column >
        <template>
  <v-container>
    <v-row justify="space-around" >
      <v-card width="800" v-for="profil in profils" :key="profil.lastName" class="mb-16 mt-10 elevation-15">
        <v-img
          height="500px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar flat prominent color="rgba(0, 0, 0, 0)" height="600px">
            <v-spacer></v-spacer>

          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
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

        <v-card-title>
            <v-avatar size="100" class="ml-1 elevation-15">
              <img
                
                alt="user"
                src="../assets/icon.png"
              >
            </v-avatar>
            <v-layout column align-left class="ml-5">
                <h1 class="heading">{{ profil.firstName }}</h1>
                <h2 class="heading">{{ profil.lastName }}</h2>
            </v-layout>

            <p class="mt-6 mr-2">0</p>
            <v-btn class="mx-2" fab dark large color="pink">
              <v-icon dark>mdi-heart</v-icon>
            </v-btn>

        </v-card-title>


        <v-card-text>
          <div>
            <p class="mt-4 mb-4 text-body-1 text-justify">{{ profil.content }}</p>
            <p class="caption text-right">{{ new Date(profil.createdAt).toLocaleString()}}</p>
          </div>
          <h1 class="font-weight-light ml-16 mb-10 mt-10 text-left">
            COMMENTS
          </h1>

        <v-timeline>
            <v-timeline-item
              v-for="comment in comments"
              :key="comment.lastName"
              large
            >
              <template v-slot:icon >
                <v-avatar>
                  <img src="https://i.pravatar.cc/67">
                </v-avatar>
              </template>
              <template v-slot:opposite>
                <span>{{ new Date(comment.createdAt).toLocaleString()}}</span>
              </template>
              <v-card class="elevation-6">
                <v-card-title class="text-h5">
                  {{ comment.firstName }} {{ comment.lastName }}
                </v-card-title>
                <v-card-text>{{ comment.content }}</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <AddComment />


      </v-card>
    </v-row>
  </v-container>
</template>
      </v-layout>

    </v-container>
    
  </div>
</template>

<script>
import EditPost from '../components/EditPost.vue'
import DeletePost from '../components/DeletePost.vue'
import AddComment from '../components/AddComment.vue'

export default {
  components: { EditPost, DeletePost, AddComment },
  data() {
    return {
      profils: [
        { photo: '../assets/icon.png', firstName: 'Erwin', lastName: 'Fratczak', content: 'bla bla bla', createdAt: '2021-07-19 14:42:10'},
        { photo: '../assets/icon.png', firstName: 'Erwin', lastName: 'Fratczak', content: 'bla bla bla', createdAt: '2021-07-19 14:42:10'},
        
      ],
      comments: [
        { photo: '../assets/icon.png', firstName: 'Erwin', lastName: 'Fratczak', content: 'bla bla bla', createdAt: '2021-07-19 14:42:10'},
        { photo: '../assets/icon.png', firstName: 'Erwin', lastName: 'Fratczak', content: 'bla bla bla', createdAt: '2021-07-19 14:42:10'},
        
      ],
      
    }
  }
}
</script>
