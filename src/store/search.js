// import $ from "jquery";

const ModelSearch = ({
    state: {
        /** * 查询到的所有商品信息*/
        searchData: {
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

        }

    },
    getters: {
    },
    mutations: {

    },
    actions: {

    },
    modules: {

    }
})

export default ModelSearch;
