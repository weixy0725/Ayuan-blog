import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    openClass:'',
    searchOpenClass:'',
    imgURLHeader:'http://39.105.221.186/',
    preloaderShow:true
};

const getters = {
    openClass: state => state.openClass,
    searchOpenClass:state=>state.searchOpenClass,
    imgURLHeader:state=>state.imgURLHeader,
    preloaderShow:state=>state.preloaderShow
};

const mutations = {
    changeOpenClass(state, data) {
        state.openClass = data;
    },
    changeSearchOpenClass(state,data){
        state.searchOpenClass=data;
    },
    changePreloaderShow(state,data){
       state.preloaderShow=data;
    }

};

export default new Vuex.Store({
    state,
    getters,
    mutations
})