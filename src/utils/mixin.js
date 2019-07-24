export default {
  data() {
    return {
      visibleSearch: false,
      currentPage: 1,//当前页数
      pageSize: 10,//每页显示个数
      total: 0,//总条目数
      isAdd: true,
      loading: true,
    }
  },
  methods: {
    //搜索
    search() {
      this.currentPage = 1;
      this.getList();
    },
    //打开收起筛选
    showSearch() {
      this.visibleSearch = !this.visibleSearch;
    },
    //批量处理
    confirmBatch(val) {
      if(val && this.checkItemId.length > 0){
        if(val == 'delete') {
          this.remove(this.checkItemId);
        }else if(val == "shift") {

        }else {
          this.$msgWar("未操作选项")
        }
      }else {
        this.$msgWar("请勾选数据或者选择需要操作的内容")
      }
    },
    // 显示商品图片
    getGoodImg(data) {
      if(data) {
        return data.split(',')[0]
      } else {
        return require("@/assets/image.png")
      }
    },
    //下一页
    next(val) {
      this.currentPage = val;
      this.getList();
    },
    //全选change事件
    handleChangeAll(val) {
      if(val) {
        this.$refs.table.toggleAllSelection()
      } else {
        this.$refs.table.clearSelection()
      }
    },
    //表格select事件
    tableSelection(val) {
      let checkItemId = [];
      if (val.length == this.tableData.length) {
        this.$refs.pagination._data.checkAll = true;
      } else {
        this.$refs.pagination._data.checkAll = false;
      }
      val.forEach((item) => {
        checkItemId.push(item.id)
      });
      this.checkItemId = checkItemId;
    },
    //表头样式
    headerStyle() {
      return {
        color: '#595757',
        background: "#F6F6F6",
        fontSize: '15px',
        borderLeft: '1px solid #b4b4b4',
        borderTop: '1px solid #b4b4b4',
        textAlign: 'center'
      }
    },
    //表格样式
    tdStyle() {
      return {
        color: '#595757',
        fontSize: '15px',
        borderLeft: '1px solid #b4b4b4',
        borderTop: '1px solid #b4b4b4',
        textAlign: 'center'
      }
    }
  }
}