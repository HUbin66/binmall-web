<template>
  <BaseCard>
    <div class="col-2"></div>
    <div class="col-8">
      <ProBraCatNavbar />
      <BaseCard>
        <div class="add_text text-start">新增属性值</div>
        <!-- Example single danger button -->

        <div class="cat_menu">
          <div class="all_cat_menu text-start">选择种类</div>
          <div class="row">
            <div class="col-3">
              <!-- 一级分类 -->
              <div class="first_cat">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle cat_btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ first_cat_text }}
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      class="Fcat"
                      v-for="Fcat in FirstCat"
                      :key="Fcat.cid"
                      @click="GetFcid(Fcat.cid, Fcat.fcat)"
                    >
                      {{ Fcat.fcat }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-3">
              <!-- 二级分类 -->
              <div class="second_cat">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle cat_btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ second_cat_text }}
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      class="Fcat"
                      v-for="Scat in SecondCat"
                      :key="Scat.cid"
                      @click="GetScid(Scat.cid, Scat.fcat)"
                    >
                      {{ Scat.fcat }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-3">
              <!-- 三级分类 -->
              <div class="third_cat">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle cat_btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ third_cat_text }}
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      class="Fcat"
                      v-for="Tcat in ThirdCat"
                      :key="Tcat.cid"
                      @click="GetTcid(Tcat.cid, Tcat.fcat)"
                    >
                      {{ Tcat.fcat }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-3">
              <!-- 该分类下的所有属性 -->
              <div class="third_cat">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-danger dropdown-toggle cat_btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ attrs_text }}
                  </button>
                  <ul class="dropdown-menu">
                    <li
                      class="Fcat"
                      v-for="attr in attrs"
                      :key="attr.attrId"
                      @click="DisplayAttr(attr.attrName)"
                    >
                      {{ attr.attrName }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 该属性下的所有属性值 -->
          <div class="attr_value">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-danger dropdown-toggle cat_btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ attr_value_text }}
              </button>
              <ul class="dropdown-menu">
                <li
                  class="Fcat"
                  v-for="(value, index) in attr_values"
                  :key="index"
                  @click="DisplayAttrValue(value)"
                >
                  {{ value }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="input_region">
          <!-- 新增属性名称 -->
          <div class="add_cat_level">
            <div class="row">
              <div class="col-3">
                <div class="add_cat_level_text text-start">新增属性值</div>
              </div>
              <div class="col-6">
                <div class="input-group mb-3 input-group-lg">
                  <input
                    v-model="add_attr_value"
                    type="text"
                    class="form-control"
                    placeholder="输入新增属性值(默认在所选的三级分类下添加)"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="error-message">{{ error_message }}</div>
          <button
            class="btn btn-primary btn-lg mx-auto"
            type="submit"
            @click="add_attr_value_submit"
          >
            提交
          </button>
        </div>
      </BaseCard>
    </div>
    <div class="col-2"></div>
  </BaseCard>
</template>
      
      <script>
import ProBraCatNavbar from '../por_bra_cat_navbar.vue'
import BaseCard from '../BaseCard.vue';
import $ from 'jquery';
import { ref } from 'vue';

export default {
  name: "AddAttrValue",
  components: {
    ProBraCatNavbar,
    BaseCard
  },
  setup() {
    let first_cat_text = ref("");
    let second_cat_text = ref("");
    let third_cat_text = ref("");
    let FirstCat = ref("");
    let SecondCat = ref("");
    let ThirdCat = ref("");
    let attr_name = ref("");

    let Son_cat_name = ref("");
    let error_message = ref("");
    let attrs = ref("");
    let attrs_text = ref("");
    let Attr_Tcid = ref("");

    let attr_values = ref("");
    let attr_value_text = ref("");

    let add_attr_value = ref("");

    const DisplayAttrValue = (valuename) => {

      attr_value_text.value = valuename;
      console.log(valuename)
      console.log(attr_value_text.value);
    }

    const DisplayAttr = (attrName) => {
      attrs_text.value = attrName;
      $.ajax({
        url: "http://192.168.80.3:80/api/product/attr/GetAttrValueByAttr",
        type: "POST",
        data: {
          Tcid: Attr_Tcid.value,
          attrname: attrName,
        },
        success(resp) {
          attr_values.value = resp.data;
          console.log(resp.data);
        }
      })
    }


    $.ajax({
      url: 'http://192.168.80.3:80/api/product/category/GetFirstCat',
      type: "POST",
      success(resp) {
        first_cat_text.value = "一级分类";
        second_cat_text.value = "二级分类";
        third_cat_text.value = "三级分类";
        attrs_text.value = "该分类下的所有属性"
        attr_value_text.value = "该属性下所有值"
        FirstCat.value = resp.data;
        console.log(resp.data);
      }
    })

    const add_attr_value_submit = () => {
      error_message.value = '';
      if (third_cat_text.value == '三级分类') {
        error_message.value += '种类未选择 ';
      }
      if (attrs_text.value == '') {
        error_message.value += '属性未选择 ';
      }
      if (attr_value_text.value == '') {
        error_message.value += '属性的值未填写 '
      }
      if (error_message.value == '') {
        $.ajax({
          url: 'http://192.168.80.3:80/api/product/attr/AddAttrValue',
          type: "POST",
          data: {
            tcid: Attr_Tcid.value,
            attrname: attrs_text.value,
            addattrvalue: add_attr_value.value,
          },
          success(resp) {
            if (resp.data == '成功') {
              alert("属性值添加成功!!!")
            } else {
              error_message.value = resp.data;
            }
          }
        })
      }
    }

    const GetFcid = (Fcid, FcatName) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/category/GetSecondCat",
        type: "POST",
        data: {
          Fcid: Fcid,
        },
        success(resp) {
          first_cat_text.value = FcatName;
          SecondCat.value = resp.data;
          console.log(SecondCat.value);
        }
      })
    }

    const GetScid = (Scid, ScatName) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/category/GetThirdCat",
        type: "POST",
        data: {
          Scid: Scid,
        },
        success(resp) {
          second_cat_text.value = ScatName;
          ThirdCat.value = resp.data;
          console.log(ThirdCat.value);
        }
      })
    }

    const GetTcid = (Tcid, TcatName) => {
      Attr_Tcid.value = Tcid;
      third_cat_text.value = TcatName;
      $.ajax({
        url: "http://192.168.80.3:80/api/product/attr/GetAttrsByCategory",
        type: "POST",
        data: {
          Tcid: Tcid,
        },
        success(resp) {
          attrs.value = resp.data;
          console.log(resp.data);
        }
      })
    }






    return {
      add_attr_value,
      DisplayAttrValue,
      attr_values,
      Attr_Tcid,
      attr_value_text,
      DisplayAttr,
      attrs,
      attrs_text,
      add_attr_value_submit,
      error_message,
      Son_cat_name,
      attr_name,
      GetTcid,
      third_cat_text,
      second_cat_text,
      first_cat_text,
      GetFcid,
      FirstCat,
      SecondCat,
      ThirdCat,
      GetScid,
    }
  }


}

      </script>
    
      
      <style scoped>
.attr_value {
  margin-top: 30px;
}
.error-message {
  color: red;
  font-size: 30px;
}
.all_cat_menu {
  margin-bottom: 20px;
}
.cat_menu {
  margin-top: 50px;
}
.input_region {
  margin-top: 50px;
}
.btn {
  width: 200px;
}
.add_Son_cat_text {
  font-size: 30px;
}
.add_Father_cat_text {
  font-size: 30px;
}
.add_cat_level_text {
  font-size: 30px;
}
.all_cat_menu {
  margin-top: 20px;
  font-size: 25px;
}
.Fcat {
  cursor: pointer;
  font-size: 20px;
}
.cat_btn {
  width: 250px;
  height: 50px;
}

.add_text {
  font-size: 30px;
}
</style>