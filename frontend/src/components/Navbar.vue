<template>
    <nav>
        <v-app-bar flat color="rgba(0, 0, 0, 0)" app>
            <v-app-bar-nav-icon class="red--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class=" red--text">
                <span class="font-weight-black">Groupo</span>
                <span class="font-weight-black">mania</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

<!-- right menu  -->
            <v-list v-if="$store.state.isLoggedIn">
                <v-list-item router to="/" >
                    <v-list-item-action>
                        <v-icon left >home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title >Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" >
                    <v-list-item-action>
                        <v-icon left >{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title >{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item router to="/about">
                    <v-list-item-action>
                        <v-icon left >info</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title >About</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item router to="/" >
                    <v-list-item-action>
                        <v-icon left >home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title >Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item router to="/about">
                    <v-list-item-action>
                        <v-icon left >info</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title >About</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>

        </v-app-bar>

<!-- left menu - drawer -->
        <v-navigation-drawer v-model="drawer" app class="primary" width="320">
            <v-layout column align-center v-if="$store.state.isLoggedIn">
                                                <div >
            <v-img
                max-width="150px"
                src="../assets/icon-left-font-monochrome-white.png"       
            />
            </div>
                <v-flex class="mt-15">
<!-- green if user is login -->
                    <v-badge
                        avatar
                        bordered
                        overlap
                        :color="isLoggedIn"
                        
                    >
<!-- user photo -->
                    <v-avatar size="200" class=" elevation-10">
                        <v-img v-if="profil.imageURL" :src="profil.imageURL" ></v-img>
                        <v-img v-else src="../assets/icon.png" ></v-img>
                    </v-avatar>

                    </v-badge>
<!-- user info -->
                </v-flex>
                <span class="white--text text-h6 mt-5">{{profil.firstName}} {{profil.lastName}}</span>
            </v-layout>
            <v-layout column align-center v-else>
                <v-flex class="mt-15">

                    <v-badge
                        avatar
                        overlap
                        :color="isLoggedIn"
                    >

                    <v-avatar size="200">
                        <v-img v-if="profil.imageURL" :src="profil.imageURL"></v-img>
                        <v-img v-else src="../assets/icon-above-font.png"></v-img>
                    </v-avatar>

                    </v-badge>
<!-- menu-list or login/signup -->
                </v-flex>
                <span class="white--text text-h6 mt-5">Log in to Groupomania</span>
            </v-layout>
            
            <v-list class="mt-5" v-if="$store.state.isLoggedIn">
                <Profil />
                <EditProfil />
                <DeleteProfil />
                <AddPost />
                <Logout />
            </v-list>

            <v-layout  align-center v-else>
                <v-spacer></v-spacer>
                    <Login />
                <v-spacer></v-spacer>
                    <Signup />
                <v-spacer></v-spacer>
            </v-layout>

            <v-spacer></v-spacer>


        </v-navigation-drawer>

    </nav>
</template>


<script>
import Profil from './Profil.vue'
import EditProfil from './EditProfil.vue'
import DeleteProfil from './DeleteProfil.vue'
import AddPost from './AddPost.vue'
import Logout from './Logout.vue'
import Login from './Login.vue'
import Signup from './Signup.vue'

export default {
    components: { Profil,  EditProfil, DeleteProfil, AddPost, Logout, Login, Signup },
    data: () => {
        return {
            drawer: false,
            links: [
                {icon: 'dashboard', text: 'Posts', route: '/post'},
                {icon: 'mdi-account-group', text: 'Users', route: '/auth'},
            ]
        }
    },
    computed: {
        profil() {
            return this.$store.getters.user;
        },
        isLoggedIn() {
        if (this.$store.state.isLoggedIn) {
            return "success";
        } else {
            return "";
        }
    },    
    },
    beforeMount() {
        this.$store.dispatch("getUserById");
    },
}
    



</script>
