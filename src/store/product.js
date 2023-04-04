// import $ from "jquery";

const ModelProduct = ({
    state: {
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
        skuId: "",
    },
    getters: {
    },
    mutations: {
        UpdateSkuId(state, data) {
            state.skuId = data.skuId;
        }
    },
    actions: {
        SetProduct(content, data) {
            content.commit("UpdateProduct", data)
        },
        SetSkuId(content, data) {
            content.commit("UpdateSkuId", data);
            data.success();
        }
    },
    modules: {

    }
})

export default ModelProduct;
