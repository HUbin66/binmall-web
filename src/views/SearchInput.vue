<template>
  <div class="input-group mb-3 input-group-lg">
    <input
      v-model="searchParam.keyword"
      type="text"
      class="form-control"
      placeholder="输入搜索关键字"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <span
      @click="search()"
      class="input-group-text search_btn"
      id="basic-addon2"
      >搜索</span
    >
  </div>
</template>
    
    <script>
import $ from 'jquery'
import { ref, toRefs } from 'vue'
import router from '@/router';
import storage from '@/utils/storageUtils.vue'
export default {
  name: 'SearchInput',
  components: {

  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
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
    searchParam.value = toRefs(props.data);


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
    const search = () => {
      console.log("启动搜索时候传递的数值");
      console.log(searchParam.value);
      $.ajax({
        url: "http://192.168.80.3:80/api/search/search",
        type: "POST",
        data: {
          searchParam: JSON.stringify(searchParam.value)
        },
        success(resp) {
          console.log("resp.data");
          console.log(resp.data);
          searchResult.value = resp.data
          console.log("searchResult");
          console.log(searchResult.value);
          storage.remove("search.searchResult");
          storage.set("search.searchResult", searchResult.value);
          console.log("search.searchResult")
          console.log(storage.get("search.searchResult"));
          var num = Math.floor(Math.random() * (100 - 0 + 1)) + 0
          router.push({
            name: "searchpage",
            params: {
              num: num
            }
          })
        }
      })
    }

    return {
      search,
      searchParam,
    }



  }

}
    </script>
    
    <style scoped>
</style>
    
    
    