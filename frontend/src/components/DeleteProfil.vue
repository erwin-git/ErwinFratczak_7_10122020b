<!-- delete user popup -->
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
                <v-icon left class="white--text">delete</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="white--text">Delete Profil</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </template>

      <v-card width="500" height="210" ref="form">
        <v-app-bar color="error" flat>
            <v-card-title>
                <v-icon left class="white--text" >delete</v-icon>
                <span class="white--text heading">Delete Profil</span>
            </v-card-title>
        </v-app-bar>


        <v-card-text class="mt-10 body-1">
          Do you really want to delete your account ?? 
        </v-card-text>
        
        
        <v-divider></v-divider>
<!-- submit or close -->
        <v-card-actions v-if="$store.state.isLoggedIn" class="mt-2">
          <v-btn
            text
            @click="agreement = false, deleteAccount(user.id)"
          >
            YES
          </v-btn>
          <v-spacer></v-spacer>
          
          <v-btn
            class="white--text"
            color="primary"
            @click="agreement = true, dialog = false"
            
          >
            NO
          </v-btn>
        </v-card-actions>
        <v-alert v-else alert="true" type="error" text dense >Votre compte a été supprimé</v-alert>
    </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  name: "DeleteProfil",
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    getBackHome() {
      this.$router.push("/");
    },
    deleteAccount(id) {
      this.$store.dispatch("deleteAccount", id);
      this.$store.dispatch("logOut");
      localStorage.clear();
      window.location.reload()
      this.$router.push("/");
    },
  },
};
</script>
