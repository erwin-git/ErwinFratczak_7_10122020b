
<template>
  <div>
    <v-dialog 
      v-model="dialog"
      width="400"
      transition="dialog-top-transition"
      

    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-action>
                <v-icon left class="white--text">person</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text">Profil</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>

  <v-card 
    max-width="400"
    class="mx-auto"
        

  >
    <v-img
    max-height="300px"
    dark 
    v-if="profil.imageURL" :src="profil.imageURL"></v-img>
    <v-img 
    max-height="300px"
    dark 
    v-else src="../assets/icon.png"></v-img>

    <v-list two-line>
      
    <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">
            person
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="mb-3">Name</v-list-item-title>
          <v-list-item-subtitle>{{profil.firstName}} {{profil.lastName}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>



      <v-divider inset></v-divider>


      

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">
            mdi-email
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="mb-3">e-Mail</v-list-item-title>
          <v-list-item-subtitle>{{profil.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>



      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">
            info
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="mb-3">Biography</v-list-item-title>
          <p class="text-justify body-2">{{profil.biography}}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
    </v-dialog>
  </div>
</template>






<script>
export default {
  name: "profil",

  data() {
    return { 
      dialog: false,     
    };
  },
  computed: {
    profil() {
      return this.$store.getters.user;
    }    
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  
};
</script>
