import { createStore } from 'vuex'
import ModelVersion from './version'
import ModelProduct from './product'
import ModelVersionUtil from './versionUtil'
import ModelProductInfo from './ProductInfo'
import ModelUser from './user'
import ModelOrder from './order'
import ModelPay from './pay'
import ModelSearch from './search'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    version: ModelVersion,
    product: ModelProduct,
    versionUtil: ModelVersionUtil,
    productinfo: ModelProductInfo,
    user: ModelUser,
    order: ModelOrder,
    pay: ModelPay,
    searchL: ModelSearch,
  }
})
