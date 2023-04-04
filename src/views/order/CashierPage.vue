<template>
  <BaseCard class="CashierPage">
    <div class="col-2"></div>
    <div class="col-8">
      <!-- //头部 -->
      <div class="row">
        <div class="col-8">
          <div>BinMall收银台</div>

          <div>订单提交成功，请尽快付款！订单号：70715901829</div>
          <div>
            扫码支付请您在24小时内完成支付，否则订单会被自动取消(库存紧订单请参见详情页时限)
          </div>
        </div>
        <div class="col-4 text-center align-self-center">
          应付金额{{ price }}元
        </div>
      </div>

      <BaseCard>
        <img
          style="width: 129px; height: 35px"
          src="../../assets/CashirePage/title.png"
          alt=""
        />
        <div class="card">
          <div class="row align-items-center justify-content-center">
            <div class="col-3">
              <img
                class="img-fluid"
                src="../../assets/CashirePage/白条.png"
                alt=""
              />
              <span>打白条</span>
            </div>

            <div class="col-7">
              <div>
                可用额度 7275.38元 白条还款日 2018-01-27 优惠随机立减(最高10元)
              </div>
              <div>
                <button type="button" class="btn btn-outline-primary">
                  <div class="top_text">不分期</div>
                  <div>0服务费</div>
                </button>
                <button type="button " class="btn btn-outline-primary">
                  <div class="top_text">3期</div>
                  <div>9.48元/期</div>
                </button>
                <button type="button" class="btn btn-outline-primary">
                  <div class="top_text">6期</div>
                  <div>4.94元/期</div>
                </button>
                <button type="button" class="btn btn-outline-primary">
                  <div class="top_text">12期</div>
                  <div>2.35元/期</div>
                </button>
                <button type="button" class="btn btn-outline-primary">
                  <div class="top_text">24期</div>
                  <div>1.44元/期</div>
                </button>
              </div>
            </div>

            <div class="col-2">
              <div>支付{{ price }}元</div>
            </div>
          </div>
        </div>

        <ul class="list-group">
          <li class="list-group-item">
            <div class="row">
              <div class="col-1">
                <img
                  class="img-fluid"
                  src="../../assets/CashirePage/小金库.png"
                  alt=""
                />
              </div>
              <div class="col-4 align-self-center">
                BinMall学院小金库 未开通小金库
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-1">
                <img
                  class="img-fluid"
                  src="../../assets/CashirePage/招商银行.png"
                  alt=""
                />
              </div>
              <div class="col-5 align-self-center">
                信用卡(4337) 优惠单单减最高99元
              </div>
            </div>
          </li>
        </ul>
      </BaseCard>

      <div class="Jd_footer">
        <ul class="ul_foot">
          <li class="wx" style="cursor: pointer; color: rgb(94, 94, 94)">
            <img src="../../assets/CashirePage/wx.png" alt="" />微信支付
          </li>
          <li
            @click="Payment()"
            style="cursor: pointer; color: rgb(94, 94, 94)"
          >
            <img
              src="../../assets/CashirePage/zfb.png"
              style="weight: auto; height: 30px"
              alt=""
            />支付宝
          </li>
        </ul>
      </div>
    </div>

    <div class="col-2"></div>
  </BaseCard>
</template>
    
    <script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import BaseCard from '@/components/BaseCard.vue';
import $ from 'jquery'

export default {
  name: 'CashierPage',
  components: {
    BaseCard,
  },
  setup() {
    let store = useStore();
    let price = ref("");
    let orderSn = ref("");
    price.value = store.state.pay.price;

    orderSn.value = store.state.pay.orderSn

    const Payment = () => {
      $.ajax({
        url: "http://192.168.80.3/api/third/alipay/pay",
        type: "POST",
        data: {
          price: price.value,
          orderSn: orderSn.value,
        },
        success(resp) {
          console.log("zfb")
          console.log(resp);

          //将后台传过来的html页面写到新打开的浏览器窗口中显示
          $(".CashierPage").html(resp);
        }

      })
    }
    return {
      price,
      Payment,
    }
  }
}
    </script>
    
    <style scoped>
.zf {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  width: 200px;
  height: 50px;
  border: none;
  color: white;
  text-align: center;
  line-height: 50px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  background: rgb(252, 110, 108);
}
.ul_foot {
  margin: 0;
  box-sizing: border-box;
  font-size: 14px;
  list-style: none;
  height: 70px;
  padding: 20px 15px;
}
.wx {
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  float: left;
  padding: 0 10px;
  font-size: 16px;
  border-right: 1px solid #e3dddf;
  cursor: pointer;
  color: rgb(94, 94, 94);
}
.Jd_footer {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  box-shadow: 0px 5px 5px 5px #e9e9e9;
  margin-top: 30px;
  margin-bottom: 50px;
}
.forget_password {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  margin-left: 8px;
  cursor: pointer;
  color: rgb(103, 164, 255);
}
.input_css {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
  height: 40px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  text-align: center;
}
.top_text {
  font-weight: 600px;
}
</style>
    
    
    