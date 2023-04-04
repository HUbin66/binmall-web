import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import home_admin from '@/views/admin/home_admin.vue'
import AddBrand from '@/components/brand/AddBrand.vue'
import UpdateBrand from '@/components/brand/UpdateBrand.vue'
import DelBrand from '@/components/brand/DelBrand.vue'
import AddCategory from '@/components/category/AddCategory.vue'
import DelCategory from '@/components/category/DelCategory.vue'
import AddAttr from '@/components/attr/AddAttr.vue'
import AddAttrValue from '@/components/attr/AddAttrValue.vue'

import DelProduct from '@/components/product/DelProduct.vue'
import ProductInfo from "@/views/ProductInfo.vue"
import AddProduct_test from '@/components/product/AddProduct_test.vue'
import AddProductAttrs from '@/components/product/AddProductAttrs.vue'
import AddProductSaleAttrs from '@/components/product/AddProductSaleAttrs.vue'
import AddProductSkuInfo from '@/components/product/AddProductSkuInfo.vue'
import Test from '@/views/Test.vue'
import LoginFail from '@/views/LoginFail.vue'
import LoginJump from '@/views/LoginJump.vue'
import ShopCart from '@/views/order/ShopCart.vue'
import OrderInfo from '@/views/order/OrderInfo.vue'
import CashierPage from '@/views/order/CashierPage.vue'
import OrderSuccess from '@/views/order/OrderSuccess.vue'
import UpProduct from '@/views/admin/admin_uppro.vue'
import SearchPage from '@/views/SearchPage.vue'

// import Login from '../views/LoginView.vue'
// import Regiester from '../views/RegiestView.vue'


const routes = [
  {
    path: '/home/:random',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: home_admin
  },
  {
    path: '/addbrand',
    name: 'addbrand',
    component: AddBrand
  },
  {
    path: '/delbrand',
    name: 'delbrand',
    component: DelBrand
  },
  {
    path: '/updatebrand',
    name: 'updatebrand',
    component: UpdateBrand
  },

  {
    path: '/addcategory',
    name: 'addcategory',
    component: AddCategory
  },
  {
    path: '/delcategory',
    name: 'delcategory',
    component: DelCategory
  },
  {
    path: '/addattr',
    name: 'addattr',
    component: AddAttr
  },
  {
    path: '/addattrvalue',
    name: 'addattrvalue',
    component: AddAttrValue
  },
  {
    path: '/delproduct',
    name: 'delproduct',
    component: DelProduct
  },
  {
    path: '/ProductInfo/:skuId',
    name: 'productinfo',
    component: ProductInfo
  },
  {
    path: '/addproducttest',
    name: 'addproducttest',
    component: AddProduct_test
  },
  {
    path: '/addproductattrs',
    name: 'addproductattrs',
    component: AddProductAttrs
  },
  {
    path: '/addproductsaleattrs',
    name: 'addproductsaleattrs',
    component: AddProductSaleAttrs
  },
  {
    path: '/addproductskuinfo/:num',
    name: 'addproductskuinfo',
    component: AddProductSkuInfo
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/loginfail',
    name: 'loginfail',
    component: LoginFail
  },
  {
    path: '/loginjump',
    name: 'loginjump',
    component: LoginJump
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart
  },
  {
    path: '/orderinfo/:num',
    name: 'orderinfo',
    component: OrderInfo
  },
  {
    path: '/cashierpage',
    name: 'cashierpage',
    component: CashierPage
  },
  {
    path: '/ordersuccess',
    name: 'ordersuccess',
    component: OrderSuccess
  },
  {
    path: '/uppro',
    name: 'uppro',
    component: UpProduct
  },
  {
    path: '/searchpage/:num',
    name: 'searchpage',
    component: SearchPage,
  }

]


const router = createRouter({
  history: createWebHistory(),
  routes
})
// 解决bug：页面/路由跳转后，滚动条消失，页面无法滚动
// 解决bug：页面/路由跳转后，滚动条消失，页面无法滚动
router.afterEach(() => {
  document.querySelector("body").setAttribute("style", "overflow: auto !important;")
});


export default router
