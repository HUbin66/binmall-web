<template>
  <!-- <BaseCard style="margin-bottom: 10px" v-for="(i, index) in num" :key="index"> -->
  <div class="attrSale">
    <div>销售属性填写</div>
    <div v-for="(attr, index1) in attrs" :key="index1">
      <div>
        {{ attr.attrName }}
        <input type="text" @input="search($event, index1, attr.attrName)" />
      </div>
    </div>
  </div>
  <BaseCard style="margin-bottom: 10px">
    <input type="text" v-model="skuName" placeholder="商品名称" />
    <input type="text" v-model="skuTitle" placeholder="商品标题" />
    <input type="text" v-model="skuSubTitle" placeholder="商品副标题" />
    <input type="text" v-model="skuPrice" placeholder="商品价格" />

    <div class="mult_img">
      <div class="img_text text-start sspx">商品图集</div>
      <!-- 上传图片集 -->
      <div class="up_mult_img">
        <div class="input-group mb-3">
          <input
            type="file"
            class="form-control"
            id="UploadMultImg_Id"
            placeholder="上传图片集"
          />
          <!-- <label class="input-group-text" for="inputGroupFile02">上传</label>  -->
          <div
            class="input-group-text"
            id="UploadMultImg"
            @click="UploadMultImg"
          >
            上传
          </div>
        </div>
        <BaseCard>
          <div v-for="(img_url, index) in mult_url" :key="index" class="col-3">
            <img class="img-fluid" :src="img_url" alt="" />
            <button
              v-if="img_url != ''"
              type="button"
              class="btn btn-danger del_btn"
              @click="DelMultImg(index)"
            >
              Danger
            </button>
          </div>
        </BaseCard>
      </div>
    </div>
  </BaseCard>

  <button type="button" class="btn btn-danger" @click="Add()">增加</button>
  <button type="button" class="btn btn-danger" @click="NextStep()">
    下一步：保存数据
  </button>
</template>
    
    <script>
import { ref } from 'vue';
import $ from 'jquery'
import { useStore } from 'vuex';
import BaseCard from '../BaseCard.vue';
import router from '@/router';

export default {
  name: 'AddProductSkuInfo',
  components: {
    BaseCard,
  },
  setup() {
    const store = useStore();

    let count = 0;
    let num = store.state.versionUtil.num;


    let mult_url_test = [];
    let mult_img_test = [];

    let mult_url = ref([]);
    let mult_img = ref([]);

    let skuName = ref("");
    let skuPrice = ref("");
    let skuTitle = ref("");
    let skuSubTitle = ref("");


    //attrsale
    let SaleAttrsName = ref([]);
    let SaleAttrsValue = ref([]);



    let attrs = ref("");

    const search = (event, index1, attrname) => {
      SaleAttrsName.value[index1] = attrname;
      SaleAttrsValue.value[index1] = event.currentTarget.value;
    }

    const NextStep = () => {
      Add();
      console.log(store.state.productinfo.SkuInfo);
      console.log("sale");
      console.log(store.state.productinfo.attrSaleValue);

      $.ajax({
        url: "http://192.168.80.3:80/api/product/spuinfo/AddProduct",
        type: "POST",
        traditional: true,
        data: {
          productname: store.state.productinfo.productname,
          product_des: store.state.productinfo.product_des,
          spu_des_url: store.state.productinfo.spu_des_url,
          weight: store.state.productinfo.weight,
          spu_mult_url: store.state.productinfo.mult_url,
          brand: store.state.productinfo.brand,
          cid: store.state.productinfo.cid,
          attrs: store.state.productinfo.attrs,
          attrsIds: store.state.productinfo.attrsIds,
          attrsValue: store.state.productinfo.attrsValue,
          attrSaleName: store.state.productinfo.attrSaleName,
          attrSaleValue: store.state.productinfo.attrSaleValue,
          SkuInfo: JSON.stringify(store.state.productinfo.SkuInfo)
        },
        success(resp) {
          if (resp.data == 'success') {
            alert("商品添加成功");
            router.push({
              name: "home"
            })
          } else {
            alert("商品添加失败");
            router.push({
              name: "addproducttest"
            })
          }
        }

      })
    }

    const Add = () => {
      store.dispatch("SetSku", {
        data: {
          num: num,
          attrSaleName: SaleAttrsName.value,
          attrSaleValue: SaleAttrsValue.value,
          skuName: skuName.value,
          skuPrice: skuPrice.value,
          skuTitle: skuTitle.value,
          skuSubTitle: skuSubTitle.value,
          skuImgsUrl: mult_url_test,
        },
        success() {
          console.log("success方法")
          console.log(store.state.productinfo.productname);
          console.log(store.state.productinfo.product_des);
          console.log(store.state.productinfo.weight);
          console.log(store.state.productinfo.spu_des_url);
          console.log(store.state.productinfo.mult_url);
          console.log(store.state.productinfo.brand);
          console.log(store.state.productinfo.cid);
          console.log(store.state.productinfo.attrs);
          console.log(store.state.productinfo.SkuInfo);
          alert("添加成功");
          store.state.versionUtil.num += 1;
          router.push({
            name: "addproductskuinfo",
            params: {
              num: store.state.versionUtil.num
            }
          })
        },
      })
    }

    const UploadMultImg = () => {
      var f = document.getElementById("UploadMultImg_Id").files[0];
      let formData = new FormData();
      formData.append("imgs", f);
      var date = new Date()
      var month = '';
      var day = '';
      if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
      } else {
        month = (date.getMonth() + 1);
      }
      if (date.getDate() < 10) {
        day = '0' + date.getDate()
      } else {
        day = date.getDate()
      }
      var time = date.getFullYear() + "-" + month + "-" + day;
      $.ajax({
        url: "http://192.168.80.3:80/api/third/oss/addmult",
        type: "POST",
        contentType: false,  //不要使用任何编码，django后端能够自动识别formdata对象
        processData: false,  //告诉浏览器不要对你的数据进行任何处理
        traditional: true,
        data: formData,
        success() {
          alert("成功发送图片集");
          mult_url.value[count] = "https://binmall.oss-cn-hangzhou.aliyuncs.com/" + time + '/' + f.name
          mult_url_test[count] = "https://binmall.oss-cn-hangzhou.aliyuncs.com/" + time + '/' + f.name
          mult_img.value[count] = time + '/' + f.name;
          count += 1;
        }
      })
    }

    const DelMultImg = (index) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/third/oss/del",
        type: "POST",
        data: {
          filename: mult_img.value[index],
        },
        success() {
          alert("删除图片集成功");
          mult_url.value[index] = "";
          mult_url_test[index] = "";
          count--;
          console.log(count);
        }
      })
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
      }
    })

    return {
      attrs,
      search,
      SaleAttrsName,
      SaleAttrsValue,
      skuName,
      NextStep,
      mult_img_test,
      skuPrice,
      skuSubTitle,
      skuTitle,
      UploadMultImg,
      mult_url,
      mult_img,
      DelMultImg,
      Add,
    }


  }
}
    </script>
    
    <style scoped>
</style>
    
    
    