<template>
  <v-app>
    <v-app-bar app color="transparent" elevation="0" class="app-bar" fixed>
      <v-app-bar-nav-icon color="#4c8479">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon color="#4c8479" @click="closeForm">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="login-background d-flex flex-column">
      <v-container fluid fill-height class="pa-0 flex-grow-1">
        <v-row no-gutters class="fill-height flex-column justify-center">
          <v-col class="d-flex flex-column align-center">
            <v-icon icon="mdi-lock" color="#4c8479" size="80px"></v-icon>
            <div class="text-wrapper mb-6">
                <div class="student-text font-weight-bold">Forgot <br></div>
                <div class="student-text">Password? </div>
              <!-- <div class="check-app-text">CHECK APP</div> -->
            </div>          
          </v-col>
        </v-row>
      </v-container>

      <v-card class="white-card custom-rounded-top vh-50" elevation="0" width="100%">
        <v-card-text class="custom-padding">
            <div class="text-field-label">Email</div>
            <v-text-field
              v-model="email"
              label="Enter your Email"
              variant="outlined"
              color="white"
              bg-color="transparent"
              class="custom-text-field rounded-textfield"
              rounded="lg"
              width="100%"
              max-width="400"
            >
              <template v-slot:prepend-inner>
                <v-icon icon="mdi-email" color="white"></v-icon>
              </template>
            </v-text-field>           
          <v-btn color="#bed2d0" rounded="pill" class="reset-password-btn mb-4" block size="x-large">
            <span class="reset-password-text">Reset password</span>
          </v-btn>          
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loginWithFacebook = () => {
  console.log('Logging in with Facebook')
  // Add your Facebook login logic here
}

const loginWithGmail = () => {
  console.log('Logging in with Gmail')
  // Add your Gmail login logic here
}
</script>

<style scoped>
.login-background {
   /* background: linear-gradient(90deg, #4c8479, #2b5f56);   */
  background-color: white !important; 
}
.circular-image {
  width: 240px;
  height: 240px;
  background: linear-gradient(180deg, #a9c7c3, #4c8479);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  /* display: inline-flex; */
  align-items: center;
  justify-content: center;
  opacity: 1;
}
.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.student-text {
  font-size: 60px;
  color: #4c8479;
  line-height: 1;
  text-align: center;
  padding-top: 20px;
}
.check-app-text {
  font-size: 20px;
  color: white;
  margin-top: -5px;
}
.white-card {
  /* background-color: white !important; */
  background: linear-gradient(90deg, #4c8479, #2b5f56);
}
.vh-50 {
  height: 50vh !important; /* 50% ของความสูงหน้าจอ */
  overflow-y: auto; /* เพิ่ม scroll bar เมื่อเนื้อหาเกินความสูง */
}
.custom-rounded-top {
  border-top-left-radius: 40px !important;
  border-top-right-radius: 40px !important;
}
.forgot-password-link {
  color: #4c8479;
  text-decoration: none; 
}
.login-btn, .reset-password-btn {
  text-transform: none;
  font-size: 1.2rem;
  border-radius: 50px !important;
}
.reset-password-text {
  color: #2b524a;
}
.custom-padding {
  padding-left: 80px !important;
  padding-right: 80px !important;
}
.text-field-label {
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: 16px;
}
.clickable-avatar {
  cursor: pointer;
  transition: opacity 0.3s;
}
.clickable-avatar:hover {
  opacity: 0.8;
}
:deep(.custom-text-field) {
  width: 100%;
  max-width: 400px;
}
:deep(.custom-text-field .v-field__outline) {
  --v-field-border-opacity: 1;
  color: white !important;
}
:deep(.custom-text-field .v-label) {
  color: white !important;
}
:deep(.custom-text-field input) {
  color: white !important;
}
:deep(.rounded-textfield .v-field__outline) {
  border-radius: 40px;
}
</style>