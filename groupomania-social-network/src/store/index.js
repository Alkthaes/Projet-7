import {createStore} from 'vuex';
import axios from 'axios';
import router from "@/router";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const store = createStore({
    state: {},
    mutations: {},
    actions: {
        createAccount: ({commit}, userInfos) => {
            console.log(commit);

            axios.post('/user/signup', userInfos)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            router.push({path: '/login'});
        },
        async login({commit}, userInfos) {
            console.log(commit);

            axios.post('/user/login', userInfos)
                .then(function (res) {
                    console.log(res);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user_id', res.data.user.id);
                    router.push({path: '/'});
                })
                .catch(err => console.log(err));


        },
        logout: function () {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            store.commit('logOut');
            router.push({path: '/'});
        },
        async upvote({commit}, vote) {
            console.log(commit);

            await axios.post('/vote/post/up', vote)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    },
    modules: {}
})

export default store;
