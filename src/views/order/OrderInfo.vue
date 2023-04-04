<template>
  <BaseCard>
    <div class="col-2"><LogoVue /></div>
    <div class="col-8">
      <!-- 地址部分 -->
      <BaseCard>
        <div class="col-9">
          <div class="info_people_text">收货人信息</div>
          <div v-for="(address, index) in orderPage.addresses" :key="index">
            <span>
              <button
                v-if="count != index"
                @click="SelectAddress(index)"
                type="button"
                class="btn btn-outline-secondary"
              >
                {{ address.name }} {{ address.province }}
              </button>
              <button
                v-else
                @click="SelectAddress(index)"
                type="button"
                style="border-color: red; color: red"
                class="btn select_btn btn-outline-secondary"
              >
                {{ address.name }} {{ address.province }}
              </button>
            </span>
            <span>
              {{ address.name }} {{ address.province }} {{ address.city }}
              {{ address.region }} {{ address.detailAddress }}
              {{ address.phone }}</span
            >
            <span v-if="address.defaultStatus == 1" style="margin-left: 10px"
              ><button type="button" class="btn btn-sm btn-secondary">
                默认地址
              </button></span
            >
            <span style="margin-left: 10px"
              ><button
                type="button"
                @click="DelAddress(index)"
                class="btn btn-sm btn-secondary"
              >
                删除
              </button></span
            >
            <span style="margin-left: 10px"
              ><button
                type="button"
                @click="SetDefaultAddress(index)"
                class="btn btn-sm btn-secondary"
              >
                设置为默认地址
              </button></span
            >
          </div>
        </div>
        <div class="col-3 justify-content-md-end">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <AddressModel />
          </div>
        </div>
      </BaseCard>
      <!-- //购物车部分 -->
      <BaseCard
        style="margin-top: 10px"
        v-for="(cart, index) in orderPage.carts"
        :key="index"
      >
        <div class="col-6">
          <div>配送方式</div>
          <div>
            <button type="button" class="btn btn-outline-danger">
              蚂蚁速递
            </button>
          </div>
          <div>配送时间：工作日、双休日与节假日均可送货</div>
          <div>自签收后7天内退货，15天内换货，可享1次上门取件服务 查看详情</div>
          <div>
            总重量：<span style="color: red; font-size: 30px">{{
              cart.weight * cart.count
            }}</span
            >kg
          </div>
        </div>
        <div class="col-6">
          <div>商家：BinMall自营</div>
          <div class="row">
            <div class="col-3">
              <img class="img-fluid" :src="cart.image" alt="" />
            </div>
            <div class="col-5 text-center text_css">
              {{ cart.title }}
            </div>
            <div class="col-2 text_css" style="color: red">
              ￥{{ cart.oneprice }}
            </div>
            <div class="col-2 text_css" v-if="cart.hasStock">有货</div>
            <div class="col-2 text_css" v-else>无货</div>
          </div>
        </div>
      </BaseCard>
      <!-- //下面部分 -->
      <BaseCard style="margin-top: 20px">
        <div class="row align-items-center justify-content-center">
          <div class="col-4"></div>
          <div class="col-5">
            <div>
              应付总额：<span style="color: red; font-size: 30px"
                >￥{{ totalPrice }}</span
              >
            </div>
            <div>
              寄送至： {{ addressFinal.province }} {{ addressFinal.city }}
              {{ addressFinal.region }} {{ addressFinal.detailAddress }}
            </div>
            <div>收货人：{{ peopleInfo }}</div>
          </div>
          <div class="col-1"></div>
          <div class="col-2">
            <button
              type="button"
              @click="SubmitOrder()"
              class="btn btn-lg btn-danger"
            >
              提交订单
            </button>
          </div>
        </div>
      </BaseCard>
    </div>
    <div class="col-2" style="font-size">{{ orderPage.sn }}</div>
  </BaseCard>
</template>
    
    <script>
import BaseCard from '@/components/BaseCard.vue';
import $ from 'jquery'
import { useStore } from 'vuex';
import storage from '@/utils/storageUtils.vue';
import { ref } from 'vue';
import AddressModel from '@/components/AddressModel.vue'
import router from '@/router';
import utils from '@/utils/utils.vue';
import LogoVue from '../Logo.vue'

export default {
  name: 'OrderInfo',
  components: {
    BaseCard,
    AddressModel,
    LogoVue,
  },
  setup() {


    let carts = {
      check: "",
      skuId: "",
      image: "",
      title: "",
      attr: [],
      skuAttrName: [],
      skuAttrValues: [],
      oneprice: "",
      totalPrice: "",
      count: "",
      weight: "",
      hasStock: Boolean,
    }
    let address = {
      id: "",
      memberId: "",
      name: "",
      phone: "",
      province: "",
      city: "",
      region: "",
      detailAddress: "",
      defaultStatus: "",
    }
    let orderPage = ref({
      sn: "",
      carts: [],
      addresses: [],
    });

    let count = ref("");
    let addressFinal = ref({
      id: "",
      memberId: "",
      name: "",
      phone: "",
      province: "",
      city: "",
      region: "",
      detailAddress: "",
      defaultStatus: "",
    });
    let totalPrice = ref(0);
    let peopleInfo = ref("");
    let random = ref(0);
    let accessSn = ref("");

    let store = useStore();
    const SubmitOrder = () => {
      console.log("SnRondom");
      console.log("accessSn");
      console.log(accessSn);
      $.ajax({
        url: "http://192.168.80.3:80/api/cart/CreatOrder",
        type: "POST",
        traditional: true,
        data: {
          mid: storage.get("user.id"),
          address: JSON.stringify(addressFinal.value),
          products: JSON.stringify(orderPage.value.carts),
          accessSn: accessSn.value
        },
        success(resp) {
          console.log("SubmitOrder");
          console.log(resp.data);

          if (resp.data.status == 'success') {
            store.state.pay.price = resp.data.msg;
            store.state.pay.orderSn = resp.data.orderSn;
            router.push({
              name: "cashierpage"
            })
          } else {
            alert(resp.data.msg);
          }

        }
      })

    }

    const SetDefaultAddress = (index) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/member/memberreceiveaddress/SetDefaultAddress",
        type: "POST",
        data: {
          mid: orderPage.value.addresses[index].memberId,
          id: orderPage.value.addresses[index].id,
        },
        success(resp) {
          console.log(resp.data);
          var num = Math.floor(Math.random() * (100 - 0 + 1)) + 0
          router.push({
            name: "orderinfo",
            params: {
              num: num
            }
          })
        }
      })
    }

    const DelAddress = (index) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/member/memberreceiveaddress/DelAddress",
        type: "POST",
        data: {
          id: orderPage.value.addresses[index].id,
        },
        success(resp) {
          console.log(resp.data);
          var num = utils.random();
          router.push({
            name: "orderinfo",
            params: {
              num: num
            }
          })
        }
      })
    }

    $.ajax({
      url: "http://192.168.80.3:80/api/cart/SeekSelectedCartInfoAndMemberAddress",
      type: "POST",
      traditional: true,
      data: {
        skuIds: storage.get("order.skuIds"),
        uid: storage.get("user.id"),
      },
      success(resp) {
        console.log("data");
        console.log(resp.data)
        accessSn.value = resp.data.sn;
        console.log(" accessSn.value");
        console.log(accessSn.value);
        random.value = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

        orderPage.value = resp.data;
        for (let i = 0; i < orderPage.value.carts.length; i++) {

          totalPrice.value += orderPage.value.carts[i].totalPrice;
        }


        for (let i = 0; i < orderPage.value.addresses.length; i++) {
          var status = orderPage.value.addresses[i].defaultStatus;
          if (status == 1) {
            count.value = i;
            addressFinal.value = orderPage.value.addresses[i];
            peopleInfo.value = addressFinal.value.name + " " + addressFinal.value.phone;

          }
        }

      }
    })

    const SelectAddress = (index) => {
      count.value = index;
      addressFinal.value = orderPage.value.addresses[index];

      peopleInfo.value = addressFinal.value.name + " " + addressFinal.value.phone;
    }

    return {
      random,
      SubmitOrder,
      addressFinal,
      SetDefaultAddress,
      DelAddress,
      count,
      SelectAddress,
      totalPrice,
      peopleInfo,
      address,
      carts,
      orderPage,
    }
  }
}


</script>



    
    <style scoped>
.select_btn {
  border-top-width: 3px;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-left-width: 3px;
}
.btn-outline-secondary:hover {
  background-color: white;
  color: black;
}
.text_css {
  font-weight: bolder;
}
</style>
    
    
    