<template>
  <div>销售属性</div>

  <div v-for="(attr, index1) in attrs" :key="index1">
    <div>
      {{ attr.attrName }}
      <input
        @input="search($event, index1, index2, attr.attrName)"
        type="text"
        style="width: 100px"
        v-for="(i, index2) in count[index1]"
        :key="index2"
      />
      <button type="button" class="btn btn-danger" @click="AddInput(index1)">
        +
      </button>
    </div>
  </div>
  <button type="button" class="btn btn-primary" @click="NextStep()">
    下一步：设置Sku信息
  </button>
</template>
    
    <script>
import $ from "jquery"
import { useStore } from 'vuex';
import { ref } from "vue";
import router from '@/router';


export default {
  name: 'AddProductSaleAttrs',
  components: {

  },
  methods: {

  },
  setup() {
    const store = useStore();
    let SaleAttrs_text = ref([]);
    let SaleAttrs = ref([[]]);

    let count = ref([]);





    let attrs = ref("");

    const NextStep = () => {
      store.state.productinfo.attrSaleName = SaleAttrs_text.value;
      for (let i = 0; i < SaleAttrs.value.length; i++) {
        store.state.productinfo.attrSaleValue[i] = SaleAttrs.value[i].value;
      }
      console.log("这里")
      console.log(store.state.productinfo.attrSaleName)
      console.log(store.state.productinfo.attrSaleValue)
      router.push({
        name: "addproductskuinfo",
        params: {
          num: 1
        }
      })
    }

    const AddInput = (index1) => {
      count.value[index1] += 1;
    }

    const search = (event, index1, index2, attrname) => {
      SaleAttrs_text.value[index1] = attrname;
      SaleAttrs.value[index1].value[index2] = event.currentTarget.value;
    }




    $.ajax({
      url: "http://192.168.80.3:80/api/product/attr/GetAttrsByCategoryForVersion",
      type: "POST",
      data: {
        Tcid: store.state.versionUtil.Attr_Tcid
      },
      success(resp) {

        attrs.value = resp.data;
        console.log("成功了")
        console.log(attrs.value);
        console.log(attrs.value.length);
        for (let i = 0; i < attrs.value.length; i++) {
          count.value[i] = 1;
        }
        for (let i = 0; i < attrs.value.length; i++) {
          SaleAttrs.value[i] = ref([]);
        }
      }
    })


    return {
      NextStep,
      SaleAttrs_text,
      search,
      SaleAttrs,
      count,
      AddInput,
      attrs
    }
  }
}
    </script>
    
    <style scoped>
</style>
    
    
    