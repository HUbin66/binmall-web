// import $ from "jquery";


const ModelVersion = ({
  state: {
    index: "",
    cid: "",
    productname: "",
    price: [],
    subtitle: [],
    title: [],
    version_name: [],
    version_url: [],
    attrs: [[]],
    sku_mult_img: [],
  },
  getters: {
  },
  mutations: {
    UpdateVersion(state, data) {
      state.index = data.index;
      state.price[data.index] = data.price;
      state.title[data.index] = data.title;
      state.subtitle[data.index] = data.subtitle;
      state.version_url[data.index] = data.version_url;
      state.version_name[data.index] = data.version_name;
      state.attrs[data.index] = data.attrs;
      state.sku_mult_img[data.index] = data.sku_mult_img;
    },
    UpdateCid(state, data) {
      state.cid = data.cid;
    }
  },
  actions: {
    SetVersion(content, data) {
      content.commit("UpdateVersion", data);
      data.success("成功");
    },
    SetCid(content, data) {
      content.commit("UpdateCid", data);
      data.success("成功");
    }
  },
  modules: {

  }
})

export default ModelVersion;
