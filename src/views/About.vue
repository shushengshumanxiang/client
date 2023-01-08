<template>
  <div class="about">
    <el-input v-model="name" placeholder="请输入姓名"></el-input>
    <el-button type="primary" @click="get">主要按钮</el-button>
    <el-input v-model="age" placeholder="请输入姓名"></el-input>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // name: "",
      // age: "",
    };
  },
  methods: {
    updateName() {
      this.$store.commit("updateName", this.name);
    },
    ...mapMutations(["getServe"]),
    ...mapActions(["get"]),
  },
  computed: {
    ...mapState(["name", "age"]),
  },
};
</script>
