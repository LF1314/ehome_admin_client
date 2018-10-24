<template>
<div>
<el-upload
  class="avatar-uploader"
  action="https://upload-z1.qiniup.com"
   :data="obj"
  :on-success="handleAvatarSuccess"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</div> 
</template>
<script>
import axios from "axios";
export default {
  name: "pic",
  props: {
    value: {
      props: String,
      default: ""
    }
  },
  data() {
    return {
      imageUrl: this.value,
      token: "",
      obj: {
        token: ""
      }
    };
  },
  watch: {
    value(val) {
      this.imageUrl = val;
    }
  },
  methods: {
    getToken() {
      axios.get("http://upload.yaojunrong.com/getToken").then(res => {
        this.obj.token = res.data.data;
      });
    },
    handleAvatarSuccess(file) {
      this.imageUrl = file.url;
      this.$emit("input", this.imageUrl);
    }
  },
  created() {
    this.getToken();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
