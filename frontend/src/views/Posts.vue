<template>
  
          <div class="posts">
            
            <v-container>

              <v-layout column >
                <template>
                  <v-hover v-slot:default="{ hover }">
          <v-container>
            <v-row justify="space-around" >
              <v-card width="800" v-for="profil in profils" :key="profil.lastName" class="mb-16 mt-10 elevation-15">
                <v-img
                  height="500px"
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                  :aspect-ratio="16/9"
                >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out transparent darken-2 v-card--reveal display-3 white--text"
                    style="height: 20%;"
                  >
                    Like it ?
                  </div>
                </v-expand-transition>
                
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


                </v-card-text>



              </v-card>
            </v-row>
          </v-container>
          </v-hover>
        </template>
      </v-layout>

    </v-container>
    
  </div>
  
</template>

<script>
import EditPost from '../components/EditPost.vue'
import DeletePost from '../components/DeletePost.vue'


export default {
  components: { EditPost, DeletePost },
  data() {
    return {
      profils: [
        { photo: '../assets/icon.png', firstName: 'Erwinghj', lastName: 'Fratczakhgj', content: 'bla bla bla', createdAt: '2021-07-19 14:42:10'},
        { photo: '../assets/icon.png', firstName: 'Erwin', lastName: 'Fratczak', content: 'bla bla bla', createdAt: '2021-07-19 14:42:10'},
        
      ],
      
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 30%;
}
</style>
