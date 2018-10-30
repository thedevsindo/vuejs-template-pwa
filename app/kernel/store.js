import Vue from 'vue'
import Vuex from 'vuex'
import { initialState } from '../store'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store(initialState())
}
