<template>
  <div class="home flex-col align-items-center">
    <ul class="container flex-col align-items-center">
      <li v-for="post in posts" class="card flex-col align-items-center" :key="post.id">
        <div class="card_title flex"><h2>{{ post.titre }}</h2></div>
        <div class="card_image">
          <img :src="post.image" alt="" />
        </div>
        <div
          class="card_interact flex align-items-center justify-content-evenly"
        >
          <div class="likes flex justify-content-evenly">
            <div class="likes_plus">
              <i class="fas fa-thumbs-up"></i>
            </div>
            <div class="likes_minus"><i class="fas fa-thumbs-down"></i></div>
          </div>
          <div class="comments"><i class="fas fa-comment-alt"></i></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      posts: []
    }
  },
  async created() {
    const res = await axios.get('http://127.0.0.1:8000/post');
    console.log(res.data)
    this.posts = res.data;
  }
};
</script>

<style scoped lang="scss">

.card {
  width: 90%;
  border-bottom: 1px solid #bdbdbd;

  &_image {
    width: 500px;
    height: 500px;
    padding: 0 70px;
    background-color: #bdbdbd;

    img {
      width: 100%;
      height: auto;
    }
  }

  &_title {
    width: 100%;
  }

  &_interact {
    height: 50px;
    width: 100%;
    color: #bdbdbd;
  }

  .fas {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    font-size: 20px;
    width: 30px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    padding: 5px 10px;
    cursor: pointer;
  }

  .likes {
    width: 200px;
    position: relative;
    right: 50px;
  }

  .comments {
    position: relative;
  }
}
</style>
