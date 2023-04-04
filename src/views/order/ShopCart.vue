<template>
  <BaseCard>
    <div class="col-2"><LogoVue /></div>
    <div class="col-8">
      <!-- //搜索框 -->
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <span class="input-group-text" id="basic-addon2">搜索</span>
      </div>

      <!-- //cartList -->
      <BaseCard
        id="cart_list_card"
        v-for="(product, index) in cartListRef"
        :key="index"
      >
        <div class="row align-items-center">
          <div class="col-1">
            <!-- check_box -->
            <div class="input-group mb-3">
              <div class="input-group-text">
                <input
                  @change="ComputeTotalPrice()"
                  :id="'checkbox' + index"
                  v-model="checkbox[index]"
                  class="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
          </div>
          <!-- //图片 -->
          <div class="col-2">
            <img class="img-fluid img" :src="product.image" alt="" />
          </div>
          <!-- //标题 -->
          <div class="col-3">
            <div class="title">
              {{ product.title }}
            </div>
          </div>

          <!-- //销售属性 -->
          <div class="col-2">
            <div
              class="sale_name sale_value"
              v-for="(attr, index1) in product.attr"
              :key="index1"
            >
              {{ attr }}
            </div>
            <br />
          </div>

          <!-- 数量 -->
          <div class="col-2 num_text">
            <div>
              <span class="text-center">数量:</span>
              <span class="text-center"> {{ product.count }}</span>
            </div>

            <span class="text-center"> 单价：{{ product.oneprice }}</span>
          </div>

          <!-- //单价 -->

          <!-- 删除按钮 -->
          <div class="col-1 text-center">
            <button
              type="button"
              @click="delect(product.skuId)"
              class="btn btn-lg btn-primary"
            >
              删除
            </button>
            <!-- <button
              type="button"
              class="btn btn-lg btn-primary"
              @click="ckeck()"
            >
              text
            </button> -->
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <div class="row align-items-center">
          <div class="col-4">xxx</div>
          <div class="col-2 num_text" style="font-size: 25px">
            已选择
            <span style="color: red; font-size: 30px">{{ checkNum }}</span
            >件
          </div>
          <div class="col-3 text-end num_text" style="font-size: 25px">
            总价格：{{ orderTotalPrice }}
          </div>

          <!-- //结算按钮 -->
          <div class="col-3 text-center">
            <button
              type="button"
              class="btn btn-lg btn-danger"
              @click="ToSettle()"
            >
              去结算
            </button>
          </div>
        </div>
      </BaseCard>
    </div>
    <div class="col-2"></div>
  </BaseCard>
</template>
    
    <script>
import BaseCard from '@/components/BaseCard.vue'
import $ from 'jquery'
import storage from '@/utils/storageUtils.vue'
import { ref } from '@vue/reactivity'
import router from '@/router'
// import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import LogoVue from '../Logo.vue'

export default {
  name: 'ShopCart',
  components: {
    BaseCard,
    LogoVue,
  },
  setup() {
    let store = useStore();
    let orderTotalPrice = ref("");
    let checkNum = ref("");
    let checkbox = ref([]);
    console.log("xx" + checkbox.value);
    let cartItem = {
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
    }
    let cartList = [cartItem];

    let cartItemRef = ref({
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
    })
    let cartListRef = ref([cartItem]);


    const delect = (skuId) => {
      console.log("delect")
      $.ajax({
        url: "http://192.168.80.3:80/api/cart/DelectOneProductByMidAndSkuId",
        type: "POST",
        data: {
          mid: storage.get("user.id"),
          skuId: skuId,
        },
        success(resp) {
          if (resp.data == 'success') {
            location.reload();
          } else {
            alert("删除失败。。。")
          }
        }
      })
    }

    $.ajax({
      url: "http://192.168.80.3:80/api/cart/SeekMemberCartInfo",
      type: "POST",
      data: {
        mid: storage.get("user.id"),
      },
      success(resp) {
        cartList = resp.data;
        console.log(cartList);
        for (let i = 0; i < cartList.length; i++) {
          cartList[i].attr = new Array(10);
          checkbox.value[i] = cartList[i].check;
          if (cartList.check == "true") {
            checkNum.value++;
          }
          for (let j = 0; j < cartList[i].skuAttrName.length; j++) {
            var name = cartList[i].skuAttrName[j];
            var value = cartList[i].skuAttrValues[j];
            cartList[i].attr[j] = name + "：" + value;
          }
        }
        cartItemRef.value = cartItem;
        cartListRef.value = cartList;
        console.log("checkbox.value.");
        console.log(checkbox.value);
        ComputeTotalPrice();
      }
    })


    const ToSettle = () => {
      let skuIds = ref([]);
      let j = 0;
      for (let i = 0; i < checkbox.value.length; i++) {
        if (checkbox.value[i] == true) {
          skuIds.value[j++] = cartListRef.value[i].skuId;
        }
      }
      console.log("选中的商品skuId");
      console.log(skuIds.value);
      store.state.order.skuIds = skuIds.value;
      storage.set("order.skuIds", skuIds.value);
      //生成0~100之间的随机数
      var num = Math.floor(Math.random() * (100 - 0 + 1)) + 0
      router.push({
        name: "orderinfo",
        params: {
          num: num
        }
      })
    }

    const ComputeTotalPrice = () => {
      var price = 0;
      console.log("cartItem.length")
      console.log(cartListRef.value);
      checkNum.value = 0;
      for (let i = 0; i < cartListRef.value.length; i++) {
        if (checkbox.value[i] == true) {
          checkNum.value++;
        }
        if (checkbox.value[i] == true) {
          price += cartListRef.value[i].totalPrice
        }
      }
      orderTotalPrice.value = price;
    }

    const ckeck = () => {
      for (let i = 0; i < checkbox.value.length; i++) {
        console.log(checkbox.value[i]);
      }
    }




    return {
      delect,
      ToSettle,
      ComputeTotalPrice,
      orderTotalPrice,
      ckeck,
      checkNum,
      checkbox,
      cartList,
      cartItem,
      cartItemRef,
      cartListRef
    }

  }
}
    </script>
    
    <style scoped>
.img {
  border-radius: 5px;
  max-height: 150px;
}
.num_text {
  font-weight: 550;
}
.sale_value {
  font-weight: 550;
}
.title {
  font-weight: 600;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
    
    
    