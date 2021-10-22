<template>
  <div id="profile">
    <div id="user-infos">
      <img v-bind:src="userInfo.picture" alt="photo de profile utilisateur">
      <p>{{ userInfo.lastname }}</p>
      <p>{{ userInfo.firstname }}</p>
      <p>{{ userInfo.email }}</p>
      <p>{{ userInfo.fonction }}</p>
      <p>{{ userInfo.secteur }}</p>


    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data: function() {
    return {
      userInfo: {}
    }
  },
  async created() {
     const userId = localStorage.getItem('user_id');

     try {
       const res = await axios.get(`http://127.0.0.1:8000/user/account/${userId}`);

       this.userInfo = res.data;

     } catch (error) {
       console.log(error);
     }
  }
};
</script>

<style lang="scss" scoped>
</style>