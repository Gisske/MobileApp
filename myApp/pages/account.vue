<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h3>Account Registration</h3>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="fullName"
                label="Full Name"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                :style="{ borderColor: '#2b524a', backgroundColor: 'transparent' }"
                outlined
                dense
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email Address"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                :style="{ borderColor: '#2b524a', backgroundColor: 'transparent' }"
                outlined
                dense
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                :style="{ borderColor: '#2b524a', backgroundColor: 'transparent' }"
                type="password"
                outlined
                dense
                required
                class="custom-text-field"
              ></v-text-field>

              <v-text-field
                v-model="retypePassword"
                label="Retype Password"
                variant="outlined"
                prepend-inner-icon="mdi-lock-check"
                :style="{ borderColor: '#2b524a', backgroundColor: 'transparent' }"
                type="password"
                outlined
                dense
                required
                :error="passwordMismatch"
                error-messages="Passwords do not match"
                class="custom-text-field"
              ></v-text-field>

              <v-btn
                @click="List"
                :disabled="passwordMismatch"
                color="primary"
              >Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    };
  },
  computed: {
    passwordMismatch() {
      return this.password !== this.retypePassword;
    },
  },
  methods: {
  async  List() {
      const response = await axios.post("http://localhost:7000/List");
    },
    submitForm() {
      if (!this.passwordMismatch) {
        console.log('Form Data:', {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        });
      } else {
        console.log('Passwords do not match');
      }
    },
  },
};
</script>

<style scoped>
.custom-text-field .v-field__outline {
  border-color: #2b524a !important;
}

.custom-text-field .v-field--focused .v-field__outline {
  border-color: #2b524a !important;
}
</style>
