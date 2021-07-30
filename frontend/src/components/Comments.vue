<template>
  <v-layout column >
    <div class="text-center">
      <v-btn class="mb-10 mt-1 mr-5" fab dark color="success" @click='toggle = !toggle'>
        <v-icon dark>mdi-timeline-text</v-icon>
      </v-btn>
    </div>
    <v-card v-for="profil in profils" :key="profil.lastName" v-show='toggle'>
      <v-card-text >
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
  </v-layout>
</template>

<script>

import AddComment from './AddComment.vue'

export default {
  components: { AddComment },
  data() {
    return {
      toggle: false,
      profils: [
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
