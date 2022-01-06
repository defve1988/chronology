<script setup>
import { useStore } from "vuex";
import { toRefs } from "vue";

const store = useStore();
const ui_control = store.state.ui_control;
const { drawer } = toRefs(ui_control);
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <CanvasSetting />
    <TimeLine />
    <Periods />
    <Events />
  </v-navigation-drawer>
</template>

<style lang="scss">
.hu-color-picker {
  margin: 25px;
  box-shadow: 3px 3px 5px rgba(128, 128, 128, 0.733);
}
.color-type,
.color-set {
  display: flex;
  margin: 2px;
  .name {
    margin-right: 10px;
  }
}
.hue,
.saturation {
  margin-right: 5px;
}
.color {
  width: 20px;
  height: 20px;
  margin: 2px;
  flex-wrap: wrap;
  border: solid;
  border-width: thin;
}
::marker {
  font-size: 0em;
}
.colors {
  display: flex;
  flex-wrap: wrap;
}
</style>