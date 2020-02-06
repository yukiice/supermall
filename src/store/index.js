import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCart(state, payload) {

            // let oldProduct = null
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }

            let oldProduct = state.cartList.find(item=> item.iid === payload.iid)

            //判断oldProduct
            if (oldProduct) {
                oldProduct += 1
            }else{
                payload.count = 1
                state.cartList.push(payload)
            }


            // let index = state.cartList.indexOf(payload)

            // if (index === -1) {
            //     let oldProduct = state.cartList[index]
            //     oldProduct.count += 1
            // } else {
            //     payload.count = 1
            //     state.cartList.push(payload)
            // }
        }
    }
})


export default store