<template>
  <div>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on" >
            <v-list-item-action>
                <v-icon >mdi-magnify-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Show Photo</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>


        
            <v-img
                max-height="600"
                contain
                :src="post.fileUrl"
                lazy-src="https://picsum.photos/510/300?random"
            ></v-img>
        
    </v-dialog>
  </div>
</template>




<script>
export default {
  name: "ShowPhoto",

  data() {
    return {
      dialog: false,

    };
  },
  computed: {
    post() {
      return this.$store.getters.post;
    },
  
  },
  beforeMount() {
  let id = this.$route.params.id;
  this.$store.dispatch("getPostById", id);
  },
};
</script>
