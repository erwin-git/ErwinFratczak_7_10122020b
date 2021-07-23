<template>
  <v-card
    max-width="900"
    class="mx-auto mt-15 mb-15"
  >
    <v-toolbar flat
      color="primary"
      dark
    >
  

      <v-toolbar-title>Users</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      
    </v-toolbar>
    <v-list>
      <v-list-item
        v-for="user in users"
        :key="user.lastName"
        
      >
        <v-list-item-avatar size="100">
          <v-img :src="user.photo"></v-img>
        </v-list-item-avatar>
      
        <v-list-item-content>
          <v-list-item-title >{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
        </v-list-item-content>
      
        <v-list-item-content>
          <v-list-item-title >{{ user.email }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content >
          <v-list-item-text >{{ user.content }}</v-list-item-text>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        users: [
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },
          { photo: 'https://i.pravatar.cc/67', firstName: 'Erwin',lastName: 'Fratczak', email: 'erwin.fatczak@gmail.com', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,', },

        ],
      }
    },
  }
</script>