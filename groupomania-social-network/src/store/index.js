import {createStore} from 'vuex';
import axios from 'axios';
import router from "@/router";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const store = createStore({
    state: {
        isLoggedIn: false
    },
    mutations: {
        loggedIn(state) {
            state.isLoggedIn = true
        },
        loggedOut(state) {
            state.isLoggedIn = false
        }
    },
    actions: {
        createAccount: ({commit}, userInfos) => {
            console.log(commit);

            axios.post('/user/signup', userInfos)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            router.push({path: '/login'});
        },
        async login({commit}, userInfos) {
            axios.post('/user/login', userInfos)
                .then(function (res) {
                    console.log(res);
                    if (res.data.user.roles.includes('ROLE_ADMIN')) {
                        localStorage.setItem('role', 'admin');
                    }
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user_id', res.data.user.id);
                    commit('loggedIn')
                    router.push({path: '/'});
                })
                .catch(err => console.log(err));


        },
        logout: function ({commit}) {
            if (localStorage.role) {
                localStorage.removeItem('role');
            }
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            commit('loggedOut')
            location.reload();
        },
        async upvote({commit}, vote) {
            console.log(commit);

            await axios.post('/vote/post/up', vote)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        },
        deleteAccount({commit, dispatch}, user_id) {
            console.log(commit);
            axios.delete('http://127.0.0.1:8000/user/delete/' + user_id)
                .then(function (res) {
                    console.log(res);
                    router.push({path: '/'})
                        .then(() => dispatch('logout'))


                })
                .catch(err => console.log(err));
        },
        deletePost({commit}, post_id) {
            console.log(commit);
            axios.delete('http://127.0.0.1:8000/post/delete/' + post_id)
                .then(function (res) {
                        console.log(res);
                        location.reload();
                    }
                )
                .catch(err => console.log(err));
        },
        deleteComment({commit}, comment_id) {
            console.log(commit);
            axios.delete('http://127.0.0.1:8000/comment/delete/' + comment_id)
                .then(function (res) {
                        console.log(res);
                        location.reload();
                    }
                )
                .catch(err => console.log(err));
        }
    },
    modules: {}
})

export default store;
