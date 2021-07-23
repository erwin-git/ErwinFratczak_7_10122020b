
<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
      transition="dialog-top-transition"
      overlay-opacity="1"
      overlay-color="primary"
    >

      <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" >Sign Up</v-btn>
      </template>

      <v-card width="500"  ref="form">
        <v-app-bar color="success" flat>
            <v-card-title>
                <v-icon left class="white--text" >add</v-icon>
                <span class="white--text heading">Sign Up</span>
            </v-card-title>
        </v-app-bar>


    <v-card-text class="mt-10">
      <v-text-field
              ref="firstName"
              v-model="firstName"
              :rules="[() => !!firstName || 'This field is required']"
              :error-messages="errorMessages"
              label="First Name"
              placeholder="John"
              required
      ></v-text-field>
      <v-text-field
              ref="lastName"
              v-model="lastName"
              :rules="[() => !!lastName || 'This field is required']"
              :error-messages="errorMessages"
              label="Last Name"
              placeholder="Schmit"
              required
      ></v-text-field>
      <v-text-field
              ref="email"
              v-model="email"
              :rules="[() => !!email || 'This field is required']"
              :error-messages="errorMessages"
              label="email"
              placeholder="johnschmit@gmail.com"
              required
      ></v-text-field>
      <v-file-input
          accept="image/*"
          label="Photo"
      ></v-file-input>
      <v-textarea
      counter
      label="Biography"
      :rules="rules"
      :value="value"
      ></v-textarea>
    </v-card-text>

<v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Submit
      </v-btn>
    </v-card-actions>
    
    </v-card>
    </v-dialog>
  </div>
</template>






	<script>
export default {
  data() {
    return {
        dialog: false,
    }
  }
}
</script>
