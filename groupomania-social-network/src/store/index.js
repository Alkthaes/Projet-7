import {createStore} from 'vuex';
import axios from 'axios';
import router from "@/router";


const store = createStore({
    state: {
        isLoggedIn: false,
        jwt: ''
    },
    mutations: {
        logIn: function () {
            this.$store.state.isLoggedIn = true
        }
    },
    actions: {
        createAccount: ({commit}, userInfos) => {
            console.log(commit);

            axios.post('http://127.0.0.1:8000/user/signup', userInfos)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            router.push({path: 'login'});
        },
        login: ({commit}, userInfos) => {
            console.log(commit);

            axios.post('http://127.0.0.1:8000/user/login', userInfos)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    },
    modules: {}
})

export default store;
