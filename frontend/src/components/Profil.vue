
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

            v-for="information in informations"
        :key="information.lastName"
  >
    <v-img
      :src="information.photo"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
        </v-card-title>
        <v-card-title class="white--text pl-12 pt-12 mt-16">
          <div class="text-h4 pl-12 pt-12 mt-16">
            <span>{{information.firstName}} {{information.lastName}}</span>
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
          <v-list-item-subtitle>{{information.email}}</v-list-item-subtitle>
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
          <v-list-item-text class="text-justify body-2">{{information.content}}</v-list-item-text>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
    </v-dialog>
  </div>
</template>






	<script>
export default {
  data() {
    return {
        dialog: false,
        informations: [
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          
          
        ],
    }
  }
}
</script>
