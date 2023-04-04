<template>
  <BaseCard class="all_page">
    <div class="row">
      <div class="col-1"></div>
      <!-- spu图片集展示 -->
      <div class="col-4">
        <div class="col-10">
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div v-for="(img, index) in productInfo.skuImgs" :key="index">
                <div class="carousel-item active" v-if="index == 0">
                  <img :src="img" class="d-block w-100" alt="..." />
                </div>

                <div class="carousel-item" v-if="index != 0">
                  <img :src="img" class="d-block w-100" alt="..." />
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <!-- title -->
        <div class="title">
          {{ productInfo.skuTitle }}
        </div>
        <div class="subtitle">
          {{ productInfo.skuSubTitle }}
        </div>
        <!-- 月销量 -->
        <div class="sale_text text-start">月销量</div>
        <div class="sale text-start">6000</div>

        <!-- 销售属性选择 -->
        <div class="attrs">
          <div class="row">
            <div class="attr_text text-start col-1" style="padding-right: 0px">
              属性:
            </div>
            <div class="col-7">
              <div
                v-for="(attrName, index1) in productInfo.attrSaleName"
                :key="index1"
              >
                <button
                  type="button"
                  class="btn btn-primary btn-lg attr_sale_btn"
                >
                  {{ attrName }}
                </button>

                <dis
                  class="col-2"
                  v-for="(attrValue, index2) in productInfo.atrrSaleValue[
                    index1
                  ]"
                  :key="index2"
                >
                  <button
                    @click="SelectAttrvalue(index1, attrValue)"
                    :id="index1 + 'value' + index2"
                    type="button"
                    class="btn btn-outline-primary btn-lg btn_attr_sale_value"
                  >
                    {{ attrValue }}
                  </button>
                </dis>
                <dis class="col-2"> </dis>
              </div>
            </div>
          </div>
        </div>

        <!-- 数量 -->
        <div class="num_xx">
          <div class="row">
            <div class="col-1 num_text text-start">数量:</div>
            <div class="col-2">
              <div class="num">
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-lg"
                    @click="delone"
                  >
                    -
                  </button>
                  <button type="button" class="btn btn-outline-primary btn-lg">
                    {{ num }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-lg"
                    @click="addone"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="price">
                <!-- <div class="price_text text-start">￥ {{ price }}</div> -->
                <div>
                  <CartLoginView
                    v-if="status == null"
                    @ChangeStatus="ChangeStatus"
                  />
                  <!-- 加入购物车 -->
                  <button
                    v-else
                    type="button"
                    class="btn btn-outline-primary btn-lg"
                    @click="JoinShopCat()"
                  >
                    加入购物车
                  </button>
                </div>

                <!-- 模态弹框 -->
                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn_model btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Launch demo modal
                </button>
                <!-- Modal -->
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Modal title
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">加入购物车成功。。。。</div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          关闭
                        </button>
                        <button
                          @click="GoToCartList()"
                          type="button"
                          class="btn btn-primary"
                        >
                          去购物车查看
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-1"></div>
    </div>
    <!-- 属性 -->
    <div class="attr">
      <div class="card">
        <div class="row">
          <!-- 同类产品 -->
          <div class="col-3">
            <div class="same_type_product_test">同类型产品</div>
            <div class="row">
              <img
                @click="ToOtherImg(sku)"
                v-for="(sku, index) in sameTypeSkuImg"
                :key="index"
                class="img-fluid same_type_img"
                :src="sku.url"
                alt=""
              />
            </div>
          </div>
          <!-- 属性 -->
          <div class="col-9">
            <div class="product_des">商品介绍</div>
            <div class="row">
              <div
                class="col-4 attrs_text"
                v-for="(attrname, index1) in productInfo.attrs"
                :key="index1"
              >
                {{ attrname }}:
                <span
                  v-for="(attrvalue, index2) in productInfo.attrsValue[index1]"
                  :key="index2"
                  >{{ attrvalue }}</span
                >
              </div>
            </div>
            <!-- DesImg -->
            <div
              class="row"
              v-for="(desImg, index) in productInfo.spuDesImg"
              :key="index"
            >
              <div class="col-1"></div>
              <div class="col-10">
                <img class="img-fluid" :src="desImg" alt="" />
              </div>
              <div class="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>



<script>
import BaseCard from '@/components/BaseCard.vue'
import $ from 'jquery';
import router from '@/router';
import { ref } from 'vue';
import { useStore } from 'vuex';
import storage from '@/utils/storageUtils.vue';
import CartLoginView from '@/components/CartLoginView.vue';

export default {
  name: 'ProductInfo',
  components: {
    BaseCard,
    CartLoginView,
  },
  setup() {

    //user
    let status = ref("");
    status.value = storage.get("user.codeCheck");
    console.log("status");
    console.log(status.value);
    let check = ref("");

    //SameTypeSkuImg（）
    let sameTypeSkuImg = ref([]);


    let skuValueLoc = ref([]);

    //attrValue
    let count = new Array();
    for (let i = 0; i < 7; i++) {
      count[i] = new Array();
      for (let j = 0; j < 7; j++) {
        count[i][j] = 0;
      }
    }
    let attrValueLoc = ref([]);
    let attrSaleName = ref([]);
    let attrSaleValue = ref([]);
    const store = useStore();
    let price = ref("");
    // let store = useStore();
    let product = ref("");
    let productInfo = ref({
      spuId: "",
      cid: "",
      bid: "",
      skuImgs: [],
      skuTitle: "",
      skuSubTitle: "",
      attrSaleName: [],
      atrrSaleValue: [[]],
      attrs: [],
      attrsValue: [],
      price: "",
      spuDesImg: [],
    });
    let attr_value = ref([]);
    let num = ref(1);


    const ChangeStatus = () => {
      status.value = storage.get("user.codeCheck");
      console.log("修改状态成功")
    }

    const GoToCartList = () => {
      $('.modal-backdrop').remove();//去除黑幕
      router.push({
        name: "shopcart"
      })
    }

    const JoinShopCat = () => {
      $.ajax({
        url: "http://192.168.80.3:80/api/cart/AddProductInCart",
        type: "POST",
        traditional: true,
        data: {
          mid: storage.get("user.id"),
          skuId: store.state.product.skuId,
          num: num.value,
          attrSaleName: attrSaleName.value,
          attrSaleValue: attrSaleValue.value,
        },
        success(resp) {
          if (resp.data == "success") {
            $(".btn_model").trigger("click");

            console.log(resp.data);
          }
        }
      })
    }

    const SelectAttrvalue = (index1, attrValue) => {
      let attrValueTemp = ref([]);
      attrValueTemp.value = attrSaleValue.value;

      attrValueTemp.value[index1] = attrValue;
      $.ajax({
        url: "http://192.168.80.3:80/api/product/skuinfo/GetSkuIdBySkuSale",
        type: "POST",
        traditional: true,
        data: {
          attrName: productInfo.value.attrSaleName,
          attrValue: attrValueTemp.value,
          spuId: productInfo.value.spuId,
        },
        success(resp) {
          store.state.product.skuId = resp.data;
          router.push({
            name: "productinfo",
            params: {
              skuId: store.state.product.skuId,
            }
          })
        }
      })
    }

    const CalPrice = () => {
      console.log((product.value));
      console.log(typeof (product.value.spuid));
      $.ajax({
        url: "http://192.168.80.3:80/api/product/spuinfo/CalPrice",
        type: "POST",
        traditional: true,
        data: {
          pid: product.value.spuId,
          attr_value: attr_value.value[0],
        },
        success(resp) {
          price.value = resp.data * num.value;
          console.log(resp.data);
        }
      })
    }

    const addone = () => {
      num.value++;
      price.value = productInfo.value.price * num.value;
    }
    const delone = () => {
      if (num.value == 1) {
        alert("最低为1个")
      } else {
        num.value--;
        price.value = productInfo.value.price * num.value;
      }

    }
    const SelectThisValue = (value, index) => {
      attr_value.value[index] = value;
    }

    const del = (index1, index2, idname) => {
      var firstClass = "btn btn-outline-primary";
      count[index1][index2] = 0;
      $('#' + idname).removeClass();
      $('#' + idname).addClass(firstClass)
    }

    const add = (index1, index2, idname) => {
      var firstClass = "btn btn-outline-primary btn-lg btn_attr_sale_value";
      count[index1][index2] = 1;
      console.log("idname");
      console.log(idname);
      $('#' + idname).removeClass();
      $('#' + idname).addClass(firstClass + " btn_power")
    }

    const GetSameTypeSkuImg = () => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/skuinfo/GetSameTypeSkuImgs",
        type: "POST",
        data: {
          skuId: store.state.product.skuId,
          spuId: productInfo.value.spuId,
        },
        success(resp) {
          console.log("GetProductAllInfo");
          console.log(resp.data);
          sameTypeSkuImg.value = resp.data;
        }
      })
    }

    const ToOtherImg = (sku) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/skuinfo/GetSkuIdBySkuSale",
        type: "POST",
        traditional: true,
        data: {
          attrName: sku.attrSaleName,
          attrValue: sku.attrSaleValue,
          spuId: productInfo.value.spuId,
        },
        success(resp) {
          store.state.product.skuId = resp.data;
          router.push({
            name: "productinfo",
            params: {
              skuId: store.state.product.skuId,
            }
          })
        }
      })

    }

    $.ajax({
      url: "http://192.168.80.3:80/api/product/skuinfo/GetProductAllInfo",
      type: "POST",
      data: {
        skuId: store.state.product.skuId,
      },
      success(resp) {
        productInfo.value = resp.data;
        console.log(resp.data);
        GetSameTypeSkuImg()

        //设置钱的数值
        var priceTemp = productInfo.value.price;
        if (priceTemp % 1 == 0) {
          price.value = parseFloat(priceTemp).toFixed(0);
        } else {
          price.value = parseFloat(priceTemp).toFixed(2);
        }



        attrSaleName.value = productInfo.value.attrSaleName;
        $.ajax({
          url: "http://192.168.80.3:80/api/product/skuinfo/GetSkuSaleValueBySkuId",
          type: "POST",
          data: {
            skuId: store.state.product.skuId,
          },
          success(resp) {
            console.log(resp.data);
            attrSaleValue.value = resp.data;

            for (let i = 0; i < attrSaleValue.value.length; i++) {
              var result = attrSaleValue.value[i];
              attrValueLoc.value = productInfo.value.atrrSaleValue[i];
              for (let j = 0; j < attrValueLoc.value.length; j++) {
                if (attrValueLoc.value[j] == result) {
                  var idname = i + "value" + j;
                  add(i, j, idname);
                  skuValueLoc.value.push(i);
                  skuValueLoc.value.push(j);
                }
              }
            }

          }
        })

      }
    })

    return {
      GoToCartList,
      ChangeStatus,
      status,
      check,
      JoinShopCat,
      ToOtherImg,
      sameTypeSkuImg,
      GetSameTypeSkuImg,
      SelectAttrvalue,
      skuValueLoc,
      attrValueLoc,
      del,
      add,
      count,
      attrSaleValue,
      attrSaleName,
      product,
      CalPrice,
      price,
      delone,
      addone,
      num,
      productInfo,
      attr_value,
      SelectThisValue,
    }
  }


}


</script>

<style scoped>
.all_page {
  overflow: scroll;
}
.btn_model {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
.same_type_img:hover {
  border-top-width: 5px;
  border-right-width: 5px;
  border-bottom-width: 5px;
  border-left-width: 5px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-color: lightblue;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
}
.same_type_product_test {
  font-size: 30px;
  text-align: center;
}
.product_des {
  margin-left: 0px;
  font-size: 35px;
  color: #666;
  margin-bottom: 10px;
  margin-bottom: 10px;
}
.attrs_text {
  margin-left: 0px;
  font-size: 25px;
  color: #666;
  margin-bottom: 10px;
}
.btn_power {
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 50%);
}

.btn-outline-primary:focus {
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 50%);
}
.btn_attr_sale_value {
  margin-bottom: 10px;
  margin-right: 10px;
}
.attr_sale_btn {
  margin-bottom: 10px;
  margin-right: 20px;
}

.num_text {
  padding-right: 0px;
  font-size: 25px;
  margin-left: 20px;
}
.price_text {
  font-size: 50px;
  color: rgb(255, 97, 0);
}
.num_xx {
  margin-top: 100px;
}
.sale {
  margin-bottom: 50px;
}
.btn_attr {
  zoom: 150%;
}

.sspx {
  font-size: 30px;
}
.attr_value {
  margin-left: 30px;
}
.attr_text {
  font-size: 25px;
  margin-left: 20px;
}
.title {
  font-size: 40px;
  font-family: PingFang SC;
  color: #000;
  font-weight: 900;
}
.sale_text {
  float: left;
  margin-left: 30px;
  font-size: 20px;
  color: gray;
}
.sale {
  margin-left: 30px;
  float: left;
  font-size: 20px;
  color: gray;
}
.attrs {
  clear: both;
}
</style>
