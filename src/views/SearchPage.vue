<template>
  <BaseCard>
    <div class="col-1">123</div>
    <div class="col-10">
      <!-- //搜索框 -->
      <div class="row">
        <div class="col-2">xxx</div>
        <div class="col-8">
          <SearchInput :data="searchParam" ref="childRef" />
        </div>
        <div class="col-2">xxx</div>
      </div>

      <!-- //检索属性和品牌部分 -->
      <BaseCard>
        <!-- 品牌部分 -->
        <div class="row">
          <div class="col-2"></div>
          <div class="col-2">
            <div>品牌：</div>
          </div>
          <div
            class="col-1 align-self-cente text-center"
            v-for="(brandImg, index) in searchResult.brands"
            :key="index"
            :id="'brand' + index"
          >
            <img
              v-if="searchReflect.brands[index].flag != 1"
              @click="ConfirmBrand(index)"
              class="img-fluid"
              :src="brandImg.brandImg"
              alt=""
            />
            <img
              v-else
              @click="ConfirmBrand(index)"
              class="img-fluid box_shadow"
              :src="brandImg.brandImg"
              alt=""
            />
          </div>
        </div>

        <!-- //属性部分 -->
        <div
          class="row"
          v-for="(attr, index1) in searchResult.attrs"
          :key="index1"
        >
          <div class="col-2"></div>
          <div class="col-2">
            <div>{{ attr.attrName }} :</div>
          </div>
          <div
            class="col-2"
            v-for="(value, index2) in attr.attrValue"
            :key="index2"
          >
            <span
              @click="ConfirmAttrValue(index1, index2)"
              style="margin-right: 10px"
            >
              <div v-if="searchReflect.attrs[index1].flag[index2] != 1">
                {{ value }}
              </div>
              <div v-else class="box_shadow">{{ value }}</div>
            </span>
          </div>
        </div>
      </BaseCard>

      <!-- //商品展示部分 -->
      <BaseCard>
        <div class="row">
          <div
            class="col-3"
            v-for="(product, index) in searchResult.products"
            :key="index"
          >
            <BaseCard>
              <div class="col-1"></div>
              <div class="col-10" @click="JoinProductInfo(product.skuId)">
                <img :src="product.skuImg" class="img-fluid" alt="" />
                <div>￥{{ product.skuPrice }}</div>
                <div>
                  {{ product.skuTitle }}
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </BaseCard>
    </div>

    <div class="col-1">123</div>
  </BaseCard>
</template>
    
    <script>
import BaseCard from '@/components/BaseCard.vue'
import { ref } from 'vue';
import storage from '@/utils/storageUtils.vue';
import { useStore } from 'vuex';
import router from '@/router';
// import $ from 'jquery'
import SearchInput from './SearchInput.vue';
export default {
  name: 'SearchPage',
  components: {
    BaseCard,
    SearchInput,
  },
  setup() {

    const store = useStore();
    const childRef = ref();

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


    let searchReflect = ref({
      attrs: [{
        attrId: "",
        attrName: "",
        attrValue: [],
        flag: [],
      }],
      brands: [{
        brandId: "",
        brandName: "",
        brandImg: "",
        flag: 0,
      }],
    })

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



    searchResult.value = storage.get("search.searchResult");
    searchReflect.value.brands = new Array(searchResult.value.brands.length);
    searchReflect.value.brands = searchResult.value.brands;
    searchReflect.value.attrs = new Array(searchResult.value.attrs.length)
    searchReflect.value.attrs = searchResult.value.attrs;

    for (let i = 0; i < searchResult.value.brands.length; i++) {
      searchReflect.value.brands[i].flag = 0;
    }
    for (let i = 0; i < searchResult.value.attrs.length; i++) {
      searchReflect.value.attrs[i].flag = new Array(searchResult.value.attrs[i].attrValue.length)
      for (let j = 0; j < searchResult.value.attrs[i].attrValue.length; j++) {

        searchReflect.value.attrs[i].flag[j] = 0;
      }
    }
    console.log("searchReflect");
    console.log(searchReflect.value);
    // console.log(searchReflect.value[0].flag);


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

    const ConfirmBrand = (index) => {
      if (searchReflect.value.brands[index].flag != 1) {
        console.log("searchReflect.value.brands[index].flag");
        console.log(searchReflect.value.brands[index].flag)
        searchReflect.value.brands[index].flag = 1;
        //添加brandId进去
        searchParam.value.brandId.push(searchResult.value.brands[index].brandId)
        //调用子组件方法
        childRef.value.search();
      } else {
        let array = new Array(searchReflect.value.brands.length);
        for (let i = 0; i < searchReflect.value.brands.length; i++) {
          if (i != index) {
            array.push(searchReflect.value.brands[i]);
          }
        }
        searchParam.value.brandId.length = 0;
        searchParam.value.brandId = array;
        //调用子组件方法
        childRef.value.search();
        searchReflect.value.brands[index].flag = 0;
      }
    }

    const ConfirmAttrValue = (index1, index2) => {
      if (searchReflect.value.attrs[index1].flag[index2] != 1) {
        for (let i = 0; i < searchReflect.value.attrs[index1].attrValue.length; i++) {
          searchReflect.value.attrs[index1].flag[index2] = 0;
        }
        searchReflect.value.attrs[index1].flag[index2] = 1
      } else {
        searchReflect.value.attrs[index1].flag[index2] = 0;
      }
    }


    return {
      JoinProductInfo,
      childRef,
      ConfirmAttrValue,
      ConfirmBrand,
      searchResult,
      searchParam,
      searchReflect,
    }
  }
}
    </script>
    
    <style scoped>
.box_shadow {
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 50%);
}
</style>
    
    
    