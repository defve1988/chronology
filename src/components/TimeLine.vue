<script setup>
import { useStore } from "vuex";
import { toRefs, ref, computed } from "vue";

var show_detail = ref(true);
const store = useStore();
const ui_control = store.state.ui_control;
const app_data = store.state.app_data;

const { data, curr_time_line } = toRefs(app_data);
const { new_time_line } = toRefs(ui_control);

let timeline_opt = computed(() => {
  return Object.keys(data.value);
});

const add_new_time_line = () => {
  store.commit("add_new_time_line", new_time_line);
};
</script>

<template>
  <v-card flat>
    <v-card-text @click="show_detail = !show_detail" style="cursor: pointer">
      <div>
        <v-icon> mdi-arrow-down-drop-circle-outline </v-icon>
        TimeLine: {{ curr_time_line == null ? "" : data[curr_time_line].text }}
      </div>
    </v-card-text>
    <v-card-text class="ml-5 my-0 py-0">
      <select v-model="curr_time_line">
        <option v-for="t of timeline_opt" :key="t" :value="t">
          {{ t }}
        </option>
      </select>
    </v-card-text>
    <v-card-text v-if="show_detail" class="ml-5">
      <v-text-field v-model="new_time_line" label="New TimeLine"></v-text-field>
      <v-btn class="mt-3 mr-3" @click="add_new_time_line"> Add </v-btn>
    </v-card-text>
  </v-card>
  <v-divider></v-divider>
</template>
<style scoped>
select {
  width: 100%;
  background-color: azure;
  border: solid;
  border-width: thin;
  margin-bottom: 15px;
}
</style>