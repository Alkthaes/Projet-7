import {createStore} from 'vuex';
import axios from 'axios';
import router from '@/router';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const store = createStore({
    state: {
        isLoggedIn: false,
        error: ''
    },
    mutations: {
        loggedIn(state) {
            state.isLoggedIn = true
        },
        loggedOut(state) {
            state.isLoggedIn = false
        },
        errorFound(state, payload) {
            state.error = payload
        }
    },
    actions: {
        createAccount: ({commit}, userInfos) => {
            console.log(commit);

            axios.post('/auth/signup', userInfos)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            router.push({path: '/login'});
        },
        login({commit}, userInfos) {
            try {
                axios.post('/auth/login', userInfos)
                    .then(function (res) {
                        console.log(res);
                        if (res.data.user.roles.includes('ROLE_ADMIN')) {
                            localStorage.setItem('role', 'admin');
                        }
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user_id', res.data.user.id);
                        commit('loggedIn');
                        router.push({path: '/allposts'});
                    })
                    .catch(err => {
                        console.log(err.response.data.message)
                        commit('errorFound', err.response.data.message);
                    });
            } catch(error) {
                console.log(error);
            }
        },
        logout: function ({commit}) {
            if (localStorage.role) {
                localStorage.removeItem('role');
            }
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            commit('loggedOut')
            router.push({path: '/'});
        },
        async upvote({commit}, vote) {
            console.log(commit);

            await axios.post('/vote/post/up', vote)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        },
        deleteAccount({commit, dispatch}, user_id) {
            console.log(commit);
            axios.delete('/auth/delete/' + user_id)
                .then(function (res) {
                    console.log(res);
                    router.push({path: '/account/deleted'})
                        .then(() => dispatch('logout'))
                })
                .catch(err => console.log(err));
        },
        deletePost({commit}, post_id) {
            console.log(commit);
            axios.delete('post/delete/' + post_id)
                .then(function (res) {
                        console.log(res);
                        location.reload();
                    }
                )
                .catch(err => console.log(err));
        },
        deleteComment({commit}, comment_id) {
            console.log(commit);
            axios.delete('/comment/delete/' + comment_id)
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
