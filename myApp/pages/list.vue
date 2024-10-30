<template>
  <div>
    <h1>Student List</h1>
    <ul>
      <li v-for="s in student" :key="s.code">
        <span>{{ s.student_id }}</span>
        <span>{{ s.username }}</span>
      </li>
    </ul>

    <v-btn block @click="listData" class="gradient-btn mt-4" height="50">
                Sign Up
              </v-btn>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      student: [
        { student_id: "001", username: "username1" },
        { student_id: "002", username: "username2" },
        { student_id: "003", username: "username3" },
        { student_id: "003", username: "username4" },
      ],
    };
  },
  methods : {
    async listData(){
      const respones = await axios.get("http://localhost:7000/listStudent");
      const datas = respones.data
      console.log('datas=',datas);
      this.student = datas.datas
    }
  }
};
</script>