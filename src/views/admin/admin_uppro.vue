<template>
  <BaseCard>
    <div class="col-3">xxx</div>
    <div class="col-6">
      <ProBraCatNavbar />

      <div v-for="(pro, index) in proList" :key="index">
        <BaseCard>
          <div class="col-2">{{ pro.spuId }}</div>
          <div class="col-2 spu_name">{{ pro.spuName }}</div>
          <div class="col-4">{{ pro.spuDes }}</div>
          <div class="col-2">
            <button
              type="button"
              v-if="pro.status == '未上架'"
              class="btn btn-outline-primary"
            >
              {{ pro.status }}
            </button>
            <button type="button" v-else class="btn btn-primary">
              {{ pro.status }}
            </button>
          </div>
          <div class="col-2" v-if="pro.status == '未上架'">
            <button
              type="button"
              class="btn btn-primary"
              @click="up(pro.spuId, index)"
            >
              上架
            </button>
          </div>
        </BaseCard>
      </div>
    </div>
    <div class="col-3">xxx</div>
  </BaseCard>
</template>
    
    <script>
import BaseCard from '@/components/BaseCard.vue';
import ProBraCatNavbar from '../../components/por_bra_cat_navbar.vue'
import { ref } from 'vue';
import $ from 'jquery'
export default {
  name: 'UpProduct',
  components: {
    ProBraCatNavbar,
    BaseCard
  },
  setup() {

    let notShelf = {
      spuId: "",
      spuName: "",
      spuDes: "",
      status: "",
    };
    let proList = ref([notShelf]);

    $.ajax({
      url: "http://192.168.80.3:80/api/product/spuinfo/GetNotShelf",
      type: "POST",
      data: {
      },
      success(resp) {
        console.log(resp.data);
        proList.value = resp.data;
      }
    })

    const up = (spuId, index) => {
      $.ajax({
        url: "http://192.168.80.3:80/api/product/spuinfo/up",
        type: "POST",
        data: {
          spuId: spuId
        },
        success(resp) {
          console.log(resp.data);
          if (resp.data == "success") {
            proList.value[index].status = "已上架";
          }

        }
      })
    }

    return {
      proList,
      up,
    }
  }
}
    </script>
    
    <style scoped>
.spu_name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
    
    
    