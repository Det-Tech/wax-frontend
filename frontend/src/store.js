import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hasAccount: false,
        playerClicks: null,
        selectedPixel: {
            row: null,
            column: null
        },
        map: [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        isSubmitting: false
    },
    mutations: {
        updateAccountStatus(state, n) {
            state.hasAccount = n
        },
        setPlayerClicks(state, n) {
            state.playerClicks = n
        },
        selectPixel(state, n) {
            state.selectedPixel.row = n.row
            state.selectedPixel.column = n.column
        },
        resetPixels(state) {
            state.selectedPixel = {
                row: null,
                column: null
            }
        },
        updateMap(state, n) {
            state.map = n
        },
        updateSubmitting(state, n) {
            state.isSubmitting = n
        }
    },
    getters: {
        hasAccount: state => {
            return state.hasAccount
        },
        remainingClicks: state => {
            return state.playerClicks
        },
        selectedPixel: state => {
            return state.selectedPixel
        },
        map: state => {
            return state.map.map(x => x = { status: x })
        },
        isSubmitting: state => {
            return state.isSubmitting
        }
    }
})