import { Module } from 'vuex'
import menuAPI from '@/services/api/menu/methods'
import IMenuState from '@/types/store/menu'
import IMenuAPI from '@/types/api/menu'

/*
 * Here, Module has two params: The state type and the root state type.
 * As the root state is empty, the most correct way to type that is to say Record<string, unknown>
 * */
const menuModule: Module<IMenuState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    hasError: false,
  },
  mutations: {
    SET_MENU(state: IMenuState, payload: IMenuAPI) {
      state.data = payload
      state.isLoading = false
      state.hasError = false
    },
    RESET_MENU(state: IMenuState) {
      state.data = null
      state.hasError = false
      state.isLoading = false
    },
    SET_ERROR(state: IMenuState) {
      state.hasError = true
      state.isLoading = false
    },
    SET_LOADING(state: IMenuState) {
      state.isLoading = true
    },
  },
  actions: {
    async fetchMenu({ commit }) {
      commit('SET_LOADING')
      try {
        const { data: menuData } = await menuAPI.getMenu()
        commit('SET_MENU', menuData)
      } catch (e) {
        commit('SET_ERROR')
      }
    },
    reset({ commit, dispatch }) {
      commit('RESET_MENU')
      dispatch('fetchMenu')
    },
  },
  getters: {
    isLoading: state => {
      return state.isLoading
    },
    hasError: state => {
      return state.hasError
    },
    categories: state => {
      if (!state?.data) return []
      return state.data.categories
    },
    items: state => {
      if (!state?.data) return []
      return state.data.items
    },
  },
}

export default menuModule
