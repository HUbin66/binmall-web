<template>
  <BaseCard>
    <div class="col-1">123</div>
    <div class="col-10">
      <div class="row">
        <div class="col-2">
          <Login />
        </div>
        <div class="col-8">
          <SearchInput />
        </div>
        <div class="col-2">xxx</div>
      </div>

      <!-- 上半部分 -->
      <BaseCard>
        <div class="col-3">
          <!-- <BaseCard class="classify"> -->
          <div class="contain">
            <div class="card">
              <div class="card-body classify">
                <div class="row">
                  <home_classify />
                </div>
              </div>
            </div>
          </div>

          <!-- </BaseCard> -->
        </div>
        <div class="col-6">
          <BaseCard class="">
            <div
              id="carouselExampleInterval"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                  <img
                    src="../assets/tbimages/cat.jpg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                  <img
                    src="../assets/tbimages/房子消息.jpg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="../assets/tbimages/机械设备.png"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
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
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </BaseCard>
        </div>

        <div class="col-3">
          <BaseCard> <UserStatus /> </BaseCard>
        </div>
      </BaseCard>

      <!-- 部分商品展示 -->
      <BaseCard>
        <div class="product_display">
          <div class="row">
            <div class="col-4" v-for="(good, index) in goods" :key="index">
              <div class="GoodsDisplay" @click="JoinProductInfo(good.skuid)">
                <GoodsDisplay :good="good" />
              </div>
            </div>
            <!-- <div class="col-4" v-if="index % 3 == 1">
              <GoodsDisplay />
            </div>
            <div class="col-4" v-if="index % 3 == 2">
              <GoodsDisplay />
            </div> -->
          </div>
        </div>
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <div class="paging">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#">Previous</a>
                  </li>
                  <li class="page-item">
                    <div class="page-link" @click="ToPage(1)" href="#">1</div>
                  </li>
                  <li class="page-item">
                    <div class="page-link" @click="ToPage(2)" href="#">2</div>
                  </li>
                  <li class="page-item">
                    <div class="page-link" @click="ToPage(3)" href="#">3</div>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="col-4"></div>
        </div>
      </BaseCard>
    </div>

    <div class="col-1">123</div>
  </BaseCard>
</template>

<script>
import BaseCard from '../components/BaseCard.vue'
import GoodsDisplay from "../components/GoodsDisplay.vue"
import home_classify from '@/components/home_classify.vue'
import UserStatus from '@/components/UserStatus.vue'
import $ from 'jquery'
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router';
import storage from '@/utils/storageUtils.vue'
import SearchInput from '@/views/SearchInput.vue'
import Login from '@/views/Logo.vue'

export default {
  name: 'HomeView',
  components: {
    BaseCard,
    GoodsDisplay,
    home_classify,
    UserStatus,
    SearchInput,
    Login,
  },
  setup() {
    let status = ref("");
    status.value = storage.get("user.codeCheck");
    let goods = ref([]);
    let pageNum = ref("1");
    let store = useStore();



    let searchParam = ref({
      keyword: "",
      brandId: [],
      catalog3Id: "",
      sort: "",
      hasStock: Boolean,
      minPrice: "",
      maxPrice: "",
      attrIds: [],
      attrs: [],
      pageNum: 1,
    });


    let searchResult = ref({
      products: [{
        skuId: "",
        spuId: "",
        skuTitle: "",
        skuPrice: "",
        skuImg: "",
        saleCount: "",
        hasStock: "",
        hotScore: "",
        brandId: "",
        catalogId: "",
        brandName: "",
        brandImg: "",
        catalogName: "",
        attrs: [{
          attrId: "",
          attrName: "",
          attrValue: "",
        }],

      }],
      /*** 当前页码*/
      pageNum: "",
      /** 总记录数*/
      total: "",
      /** * 总页码*/
      totalPages: "",

      /** 当前查询到的结果, 所有涉及到的品牌*/
      brands: [{
        brandId: "",
        brandName: "",
        brandImg: "",
      }],
      /*** 当前查询到的结果, 所有涉及到的分类*/
      catalogs: [{
        catalogId: "",
        catalogName: "",
      }],
      /** * 当前查询的结果 所有涉及到所有属性*/
      attrs: [{
        attrId: "",
        attrName: "",
        attrValue: [],
      }]
    })

    const ToPage = (num) => {
      pageNum.value = num;
      $.ajax({
        url: "http://192.168.80.3:80/api/product/spuinfo/homelist",
        type: "POST",
        data: {
          pageNum: pageNum.value,
        },
        success(resp) {
          console.log(resp.data);
          goods.value = resp.data;
        }
      })
    }

    const JoinProductInfo = (skuid) => {
      store.dispatch("SetSkuId", {
        skuId: skuid,
        success() {
          router.push({
            name: "productinfo",
            params: {
              skuId: skuid
            }
          })
        }
      }
      )
    }

    $.ajax({
      url: "http://192.168.80.3:80/api/product/skuinfo/homelist",
      type: "POST",
      data: {
        pageNum: "1",
      },
      success(resp) {
        console.log(resp.data);
        goods.value = resp.data;
      }
    })


    return {
      searchResult,
      searchParam,
      // search,
      store,
      JoinProductInfo,
      goods,
      ToPage,
      status,
    }
  }
}
</script>


<style scoped>
.classify {
  padding-bottom: 5px;
}
.search_btn {
  cursor: pointer;
}
</style>
