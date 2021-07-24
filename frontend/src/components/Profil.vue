
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
      :src="profil.imageURL"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
        </v-card-title>
        <v-card-title class="white--text pl-12 pt-12 mt-16">
          <div class="text-h4 pl-12 pt-12 mt-16">
            <span>{{profil.firstName}} {{profil.lastName}}</span>
          </div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      



      

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
          <v-list-item-text class="text-justify body-2">{{profil.biography}}</v-list-item-text>
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
