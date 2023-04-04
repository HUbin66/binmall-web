<template>
  <BaseCard>
    <div class="col-2"><LogoVue /></div>
    <div class="col-8">
      <BaseCard>
        <BaseCard><div>我的订单</div></BaseCard>
        <BaseCard>
          <div>全部订单</div>

          <BaseCard
            class="product_card"
            v-for="(orderSn, index) in orderSns"
            :key="index"
          >
            <div>订单号： {{ orderSn }}</div>
            <BaseCard
              class="product_card"
              v-for="(info, index) in data[index].order"
              :key="index"
            >
              <div>123123</div>
              <div class="col-1">
                <img :src="info.img" class="img-fluid" alt="" />
              </div>
              <div class="col-4">
                <div>
                  {{ info.title }}
                </div>
              </div>
              <div class="col-1"></div>
              <div class="col-1">x{{ info.num }}</div>
              <div class="col-1">{{ info.username }}</div>
              <div class="col-1">¥{{ info.price }}</div>
              <div class="col-1">订单详情:{{ info.status }}</div>
            </BaseCard>
          </BaseCard>
        </BaseCard>
      </BaseCard>
    </div>
  </BaseCard>
</template>
    
    <script>
import BaseCard from '@/components/BaseCard.vue';
import $ from 'jquery'
import { ref } from 'vue';
import storage from '@/utils/storageUtils.vue';
import LogoVue from '../Logo.vue';
export default {
  name: 'OrderSuccess',
  components: {
    BaseCard,
    LogoVue,
  },

  setup() {

    let info = ({
      price: "",
      img: "",
      title: "",
      num: 0,
      username: "",
      status: "",
    })

    let orderSns = ref([])
    let data = ref([{
      orderSn: "",
      order: [info]
    }])
    $.ajax({
      url: "http://192.168.80.3:80/api/order/order/OrderSuccessInfo",
      type: "POST",
      data: {
        uid: storage.get("user.id")
      },
      success(resp) {
        console.log("resp.data");
        console.log(resp.data);
        data.value = resp.data;
        console.log("data.value");
        console.log(data.value);
        console.log("data.value.order");
        console.log(data.value.order);
        for (let i = 0; i < data.value.length; i++) {
          orderSns.value[i] = data.value[i].orderSn
        }


      }
    })

    return {
      orderSns,
      data,
    }
  }
}
    </script>
    
    <style scoped>
.product_card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
    
    
    