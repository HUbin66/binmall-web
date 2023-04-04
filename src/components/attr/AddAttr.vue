<template>
  <BaseCard>
    <div class="col-2"></div>
    <div class="col-8">
      <ProBraCatNavbar />
      <BaseCard>
        <div class="add_text text-start">新增属性</div>
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
        </div>

        <div class="input_region">
          <!-- 新增属性名称 -->
          <div class="add_cat_level">
            <div class="row">
              <div class="col-3">
                <div class="add_cat_level_text text-start">新增属性名称</div>
              </div>
              <div class="col-6">
                <div class="input-group mb-3 input-group-lg">
                  <input
                    v-model="attr_name"
                    type="text"
                    class="form-control"
                    placeholder="输入新增属性名称(默认在所选的三级分类下添加)"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <div class="more_chose text-start">是否可以多选</div>
            </div>
            <!-- <div class="col-1">

              <div class="yes more_chose text-start">是</div>
            </div>
            <input
              v-model="value_type"
              class="form-check-input float-start"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div class="col-2"></div>
            <div class="col-1">
              <div class="no more_chose text-start">否</div>
            </div>
            <input
              v-model="value_type"
              class="form-check-input float-start"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            /> -->

            <div class="col-1">
              <div class="yes more_chose text-start">是</div>
            </div>
            <input
              v-model="value_yes"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />

            <div class="col-2"></div>
            <div class="col-1">
              <div class="no more_chose text-start">否</div>
            </div>
            <input
              v-model="value_no"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
          </div>
        </div>

        <div class="error-message">{{ error_message }}</div>
        <button
          class="btn btn-primary btn-lg mx-auto"
          type="submit"
          @click="add_attr_submit"
        >
          提交
        </button>
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
  name: "AddAttr",
  components: {
    ProBraCatNavbar,
    BaseCard
  },
  setup() {
    let value_yes = ref("");
    let value_no = ref("");
    let value_result = ref("");

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

    const DisplayAttr = (attrName) => {
      attrs_text.value = attrName;
    }


    $.ajax({
      url: 'http://192.168.80.3:80/api/product/category/GetFirstCat',
      type: "POST",
      success(resp) {
        first_cat_text.value = "一级分类";
        second_cat_text.value = "二级分类";
        third_cat_text.value = "三级分类";
        attrs_text.value = "该分类下的所有属性"
        FirstCat.value = resp.data;
        console.log(resp.data);
      }
    })

    const add_attr_submit = () => {
      if (value_yes.value != null) {
        value_result = 1;
      } else {
        value_result = 0;
      }

      error_message.value = '';
      if (third_cat_text.value == '三级分类') {
        error_message.value += '种类未选择 ';
      }
      if (attr_name.value == '') {
        error_message.value += '属性名称未填写 ';
      }
      if (error_message.value == '') {

        console.log("result");
        console.log(value_result);

        $.ajax({
          url: 'http://192.168.80.3:80/api/product/attr/AddAttr',
          type: "POST",
          data: {
            attrname: attr_name.value,
            category: third_cat_text.value,
            value_result: value_result,
          },
          success(resp) {
            if (resp.data == '成功') {
              alert("属性添加成功!!!")
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
      value_result,
      value_yes,
      value_no,
      DisplayAttr,
      attrs,
      attrs_text,
      add_attr_submit,
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
.more_chose {
  font-size: 30px;
}
.form-check {
  padding-left: 10px;
}
.form-check-label {
  font-size: 30px;
}
.form-check-input {
  margin-left: 0px;
  zoom: 200%;
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