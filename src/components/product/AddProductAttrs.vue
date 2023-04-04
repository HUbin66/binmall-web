<template>
  <!-- 新增商品属性目录（商品规格参数） -->
  <div class="attr_region">
    <div class="attrs_menu text-start">商品规格参数</div>

    <div class="add_cat_level" v-for="attr in attrs" :key="attr.attrId">
      <div class="row">
        <div class="col-3">
          <div class="add_cat_level_text text-start">
            {{ attr.attrName }}
          </div>
        </div>

        <!-- 单选按钮 -->
        <div class="col-6" v-if="attr.multchoice == 0">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-danger dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="DisplayAttrValue(attr.attrName)"
            >
              {{ btn_attr_value_text[attr.attrId] }}
            </button>
            <ul class="dropdown-menu">
              <li
                v-for="(attr_value, index) in attr_values"
                :key="index"
                @click="DetermineAttr(attr_value, attr.attrId, attr.attrName)"
              >
                {{ attr_value }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 多选按钮 -->
        <div class="col-9" v-if="attr.multchoice == 1">
          <div class="input-group mb-3">
            <input
              v-model="multchoice_text[attr.attrId]"
              type="text"
              class="form-control"
              placeholder="输入x1;x2;"
            />

            <button
              placeholder="下拉查看所有属性值"
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="DisplayAttrValue(attr.attrName)"
            >
              <!-- {{ btn_attr_value_text[attr.attrId] }} -->
              下拉查看所有属性值
            </button>

            <button
              placeholder="确认"
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              aria-expanded="false"
              @click="MultChoiceConfirm(attr.attrId, attr.attrName)"
            >
              确认
            </button>

            <ul class="dropdown-menu dropdown-menu-end">
              <li v-for="(attr_value, index) in attr_values" :key="index">
                {{ attr_value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button type="button" class="btn btn-primary" @click="NextStep()">
    下一步：设置销售属性
  </button>
</template>
    
    <script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery'
import router from '@/router';
// import BaseCard from '../BaseCard.vue';
export default {
  name: 'AddProductAttrs',
  components: {
    // BaseCard,
  },
  setup() {
    const store = useStore();
    let btn_attr_value_text = ref([]);

    // attrs

    let count = 0;
    let multchoice_text = ref([]);
    let attr_values = ref("");
    let attrs = ref("");
    let Attrs = ref([]);
    let AttrValues = ref([]);
    let AttrIds = ref([]);
    attrs.value = store.state.versionUtil.attrs;


    const NextStep = () => {
      store.state.productinfo.attrsIds = AttrIds.value;
      store.state.productinfo.attrs = Attrs.value;
      store.state.productinfo.attrsValue = AttrValues.value;
      router.push({
        name: "addproductskuinfo",
        params: {
          num: 1,
        },
      })
    }

    const DisplayAttrValue = (attrName) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/attr/GetAttrValueByAttr",
        type: "POST",
        data: {
          Tcid: store.state.versionUtil.Attr_Tcid,
          attrname: attrName,
        },
        success(resp) {
          attr_values.value = resp.data;
          console.log(resp.data);
        }
      })
    }


    const DetermineAttr = (attr_value, attrId, attrname) => {
      console.log("DE");

      btn_attr_value_text.value[attrId] = attr_value

      Attrs.value[count] = attrname;
      AttrIds.value[count] = attrId;
      AttrValues.value[count] = btn_attr_value_text.value[attrId]
      count++;
    }

    return {
      NextStep,
      multchoice_text,
      AttrValues,
      Attrs,
      DetermineAttr,
      DisplayAttrValue,
      attrs,
      attr_values,
      AttrIds,
      count,
      btn_attr_value_text,
    }
  }
}
    </script>
    
    <style scoped>
</style>
    
    
    