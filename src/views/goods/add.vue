<template>
  <div>
    <sub-title :subTitle="isAdd ? '添加商品' : '编辑商品'" ></sub-title>
    <div class="body" :active="setpActive" align-center>
      <el-steps>
        <el-step title="选择商品分类"></el-step>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品属性"></el-step>
        <el-step title="选择商品关联"></el-step>
      </el-steps>
      <div class="form-wrap flex" v-loading="loading">
        <!-- 选择商品分类 -->
        <div v-if="setpActive == 1">
          <div class="flex">
            <div class="form-lable">基本信息</div>
            <div class="flex-1">
              <div class="select-category flex h-center">
                <div class="flex-1">
                  <div class=" title font-18 gray bold">选择一级分类</div>
                  <ul class="category-list">
                    <li 
                      @click="getCategory(item)"
                      v-for="item in categoryList"
                    >
                      <span>{{item.typeName}}</span>
                      <i class="el-icon-arrow-right fr"></i>
                    </li>
                  </ul>
                </div>
                <img src="@/assets/icon-arrow.png" alt="">
                <div class="flex-1">
                  <div class="title font-18 gray bold">选择二级分类</div>
                  <ul class="category-list" v-if="childCategoryList.length > 0">
                    <li 
                    >
                      {{item.typeName}}
                    </li>
                  </ul>
                  <div class="category-list" v-if="childCategoryList.length === 0">
                    <span class="empty">暂无分类</span>
                  </div>
                </div>
              </div>
              <p class="tips">
                您当前选择的商品类别是：
                <span>未选择</span>
              </p>
              <el-button type="primary">
                下一步，填写商品信息
              </el-button>
            </div>
          </div>
        </div>
        <!-- 填写商品信息 -->
        <div v-if="setpActive == 2"></div>
        <!-- 填写商品属性 -->
        <div v-if="setpActive == 3"></div>
        <!-- 选择商品关联 -->
        <div v-if="setpActive == 4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import subTitle from "@/components/subTitle";
import mixin from "@/utils/mixin"
export default {
  name: "add",
  mixins: [mixin],
  data() {
    return {
      loading: false,
      categoryList: [],//一级分类列表
      childCategoryList: [],//二级分类列表
      categoryName: "",//一级分类名臣
      childCategoryName: "",//二级分类名称
      brandList: [],//品牌列表
      setpActive: 1,//添加商品步骤
      ruleForm: {
        typeId: "",//一级分类ID
        childId: "",//二级分类ID
        goodsName: "",//商品名称
        goodsSubtitle: "",//副标题
        brandId: "",//商品品牌
        goodsDesc: "",//商品介绍
        goodsNo: "",//商品货号
        goodsPrice: "",//商品售价
        marketPrice: "",//市场价
        goodsStock: "",//商品库存
        goodsWarning: "",//商品预警值
        goodsUnit: "",//计量单位
        goodsWeight: "",//商品重量
        styleId: "",//类型Id
        merchantSpecifications: [],//商品属性列表
        merchantGoodsTypePropertyList: [],//商品属性值列表
        merchantParamDetailIds: {
          merchantParamDetails: [],
          mainMaterial: "",
          paramObject: ""
        },//商品参数值列表
        goodsImg: "",//商品图片
        navId: "",
        navchildId: ""
      },
      typeList: [],//类型列表
      albunList: [],//相册列表
      headerList: [],


    }
  },
  mounted() {
    // this.loading = true;
    this.$http.post("merchantGoodsType/query_goods_type_tree").then(res => {
      this.categoryList = res;
      this.$http.post("merchant_goods_brand/query_list").then(res => {
        this.brandList = res;
        this.$http.post("merchantGoodsStyle/merchant_goods_style_list_page", {
          currentPage: 1,
          pageSize: 100
        }).then(res => {
          this.typeList = res.list;
          this.$http.post("merchant_goods_galleries/query_for_page", {
            currentPage: 1,
            pageSize: 100
          }).then(res => {
            this.albunList = res.list
            this.$http.post("merchantNavigation/query_navigation_type_tree").then(res => {
              this.headerList = res;
              if (this.$route.query.id) {
                this.isAdd = false;
                this.$http.post("merchantGoods/merchant_goods_by_id", {
                  id: this.$route.query.id
                }).then(res => {
                  this.categoryName = res.typeName;
                  this.childCategoryName =  res.childName;
                  this.$set(this.ruleForm, "typeId", res.typeId);
                  if(String(res.childId)) {
                    this.$set(this.ruleForm, "childId", res.childId);
                    this.categoryList.map(item => {
                      if(item.id == res.typeId) {
                        this.childCategoryList = item.list;
                      }
                    });
                  }
                  this.$set(this.ruleForm, "goodsName", res.goodsName);
                  this.$set(this.ruleForm, "goodsSubtitle", res.goodsSubtitle);
                  this.$set(this.ruleForm, "brandId", res.brandId);
                  this.$set(this.ruleForm, "goodsDesc", res.goodsDesc);
                  this.$set(this.ruleFormm, "goodsNo", res.goodsNo);
                  this.$set(this.ruleForm, "goodsPrice", res.goodsPrice);
                  this.$set(this.ruleForm, "marketPrice", res.marketPrice);
                  this.$set(this.ruleForm, "goodsStock", res.goodsStock);
                  
                })
              }
            })
          })
        })
      })
    })
  },
  methods: {
    getCategory(data) {

    }
  },
  components: {
    subTitle
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/common';
.form-wrap {
  margin-top: 50px;
  >div {
    width: 100%;
  }
}
.form-lable {
  width: 175px;
  height: 50px;
  line-height: 50px;
  color:#fff;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: $green;
  position: relative;
  margin-right: 100px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: -50px;
    border: 25px solid transparent;
    border-left-color: $green;
  }
}
.select-category {
  margin-top: 40px;
  .title {
    height: 48px;
    line-height: 48px;
    border: $border;
    border-bottom: transparent;
    padding: 0 24px;
    box-sizing: border-box;
  }
  img {
    margin: 0 36px;
  }
  .flex-1 {
    max-width: 380px;
  }
  .category-list {
    height: 380px;
    position: relative;
    border: $border;
    box-sizing: border-box;
    overflow: auto;
    li {
      height: 48px;
      line-height: 48px;
      color: $gray;
      border-bottom: $border;
      padding: 0 24px;
      cursor: pointer;
      i {
        margin-top: 17px;
      }
    }
    .active {
      background-color: $green;
      color: #fff;
    }
    .empty {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: $gray;
    }
  }
}
.tips {
  font-size: 14px;
  margin: 20px 0;
  span {
    color: $green
  }
}

</style>