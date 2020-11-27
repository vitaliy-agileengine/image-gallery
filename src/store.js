import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: null,
    authToken: null,

    loading: false,

    pageCount: 0,
    currentPage: 1,
    currentPagePictures: [], // images on the current page
    currentPicture: null, // open picture

    pages: {}, // pages cache
    pictures: {}, // pictures cache
  },
  mutations: {
  },
  actions: {

    initialize({ dispatch, state }, apiKey) {
      // Loads the very first page of the gallery and determines total number of pages

      state.apiKey = apiKey
      state.loading = true
      
      if (state.authToken) {
        dispatch('loadPage', 1)
        return
      }

      axios.post('http://interview.agileengine.com/auth', {'apiKey': state.apiKey})
        .then(response => {
          if (! response.data.auth) {
            alert('Authentication failed. Please check your token')
          }
          state.authToken = response.data.token
          console.info(state.authToken)
          dispatch('loadPage', 1)
        })
    },

    loadPage({ state }, page) {
      // Load pictures page (list of pictures on the page)

      state.currentPage = page

      if (state.pages[page] !== undefined) {
        state.currentPagePictures = state.pages[page]
        return 
      }

      state.loading = true

      let url = `http://interview.agileengine.com/images?page=${page}`
      axios.get(url, {'headers': {'Authorization': `Bearer ${state.authToken}`}})
        .then(response => {
          state.pageCount = response.data.pageCount
          state.pages[page] = response.data.pictures
          state.currentPagePictures = state.pages[page]
          state.loading = false
        })
    },

    loadPicture({ state }, picture_id) {
      // Loads picture details and sets it to state.currentPicture

      if (state.pictures[picture_id] !== undefined) {
        state.currentPicture = state.pictures[picture_id]
        return 
      }
      let url = `http://interview.agileengine.com/images/${picture_id}`
      axios.get(url, {'headers': {'Authorization': `Bearer ${state.authToken}`}})
        .then(response => {
          state.pictures[picture_id] = response.data
          state.currentPicture = state.pictures[picture_id]
        })
    }
  },
  modules: {
  }
})
