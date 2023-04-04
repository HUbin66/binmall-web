

const ModelProductInfo = ({
    state: {
        productname: "",
        product_des: "",
        weight: "",
        spu_des_url: [],
        mult_url: [],
        brand: "",
        cid: "",
        attrs: [],
        attrsIds: [],
        attrsValue: [],
        // attrSaleName: [],
        // attrSaleValue: [[]],
        SkuInfo: []
    },
    getters: {
    },
    mutations: {
        UpdateSku(state, data) {
            state.SkuInfo.push({
                attrSaleName: [],
                attrSaleValue: [],
                skuName: "",
                skuPrice: "",
                skuTitle: "",
                skuSubTitle: "",
                skuImgsUrl: [],
            });
            state.SkuInfo[data.num - 1].skuName = data.skuName;
            state.SkuInfo[data.num - 1].skuPrice = data.skuPrice;
            state.SkuInfo[data.num - 1].skuTitle = data.skuTitle;
            state.SkuInfo[data.num - 1].skuSubTitle = data.skuSubTitle;
            state.SkuInfo[data.num - 1].skuImgsUrl = data.skuImgsUrl;
            state.SkuInfo[data.num - 1].attrSaleName = data.attrSaleName;
            state.SkuInfo[data.num - 1].attrSaleValue = data.attrSaleValue;
        }
    },
    actions: {
        SetSku(content, data) {
            content.commit("UpdateSku", data.data);
            data.success();
        },
    },
    modules: {

    }
})

export default ModelProductInfo;