import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    openClass:'',
    searchOpenClass:''
};

const getters = {
    openClass: state => state.openClass,
    searchOpenClass:state=>state.searchOpenClass
};

const mutations = {
    changeOpenClass(state, data) {
        state.openClass = data;
    },
    changeSearchOpenClass(state,data){
        state.searchOpenClass=data;
    }

};

export default new Vuex.Store({
    state,
    getters,
    mutations
})