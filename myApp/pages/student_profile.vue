<template>
    <v-app>
      <!-- Header with 25% height -->
      <v-app-bar 
        color="teal" 
        flat 
        class="rounded-b-xl app-bar-height"
        :height="windowHeight * 0.25"
      >
        <!-- Back button -->
        <v-btn 
          icon="mdi-arrow-left" 
          color="white" 
          class="back-button"
        ></v-btn>
        
        <!-- Profile Section -->
        <div class="d-flex flex-column align-center profile-container">
          <v-app-bar-title class="text-white mb-6">Student Profile</v-app-bar-title>
          <v-avatar 
            color="#f5f5f5" 
            size="80" 
            class="mb-2"
          >
            <v-icon 
              size="48" 
              color="white"
              style="background-color: #f5f5f5;"
            >
              mdi-account
            </v-icon>
            <v-btn
              icon="mdi-pencil"
              size="small"
              class="avatar-edit-btn"
              style="position: absolute; right: -5px; bottom: 0"
              color="white"
              variant="flat"
            ></v-btn>
          </v-avatar>
          <div class="text-white text-h6">Nopparat Inmee</div>
          <div class="text-white text-subtitle-2">Nopparat@reallygreatsite.com</div>
        </div>
      </v-app-bar>
  
      <v-main class="bg-grey-lighten-4 main-content">
        <v-container>
          <!-- General Settings Section -->
          <div class="text-subtitle-1 mb-2 mt-4">General Settings</div>
          <v-card flat class="mb-4">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-theme-light-dark</v-icon>
                </template>
                <v-list-item-title>Mode</v-list-item-title>
                <v-list-item-subtitle>Dark & Light</v-list-item-subtitle>
                <template v-slot:append>
                  <v-switch color="primary"></v-switch>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-key</v-icon>
                </template>
                <v-list-item-title>Change Password</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-translate</v-icon>
                </template>
                <v-list-item-title>Language</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
  
          <!-- Information Section -->
          <div class="text-subtitle-1 mb-2">Information</div>
          <v-card flat>
            <v-list>
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-information</v-icon>
                </template>
                <v-list-item-title>About App</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-file-document</v-icon>
                </template>
                <v-list-item-title>Terms & Conditions</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-shield-check</v-icon>
                </template>
                <v-list-item-title>Privacy Policy</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-share-variant</v-icon>
                </template>
                <v-list-item-title>Share This App</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 0) // ตรวจสอบว่ามี window หรือไม่

// ฟังก์ชันเพื่ออัปเดตความสูงของหน้าต่าง
const updateHeight = () => {
  if (typeof window !== 'undefined') { // ตรวจสอบเพื่อป้องกันข้อผิดพลาด
    windowHeight.value = window.innerHeight
  }
}
  
  onMounted(() => {
  window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
})
  </script>
  
  <style scoped>
  .app-bar-height {
    height: 25vh !important;
    position: relative;
  }
  
  .back-button {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 1;
  }
  
  .profile-container {
    width: 100%;
    height: 100%;
    padding-top: 2rem;
  }
  
  .avatar-edit-btn {
    background-color: #0158c8 !important;
    color: white !important;
    border: 2px solid white !important;
  }
  
  .main-content {
    margin-top: calc(25vh - 1px) !important;
    padding-top: 0;
  }
  
  .v-container {
    padding-top: 0;
  }
  </style>