<script setup>
import { useStore } from "vuex";
import { toRefs, ref, computed } from "vue";
import { convert_date, date2string } from "@/time_line/src/utils";
import { ColorPicker } from "vue-color-kit";

var show_detail = ref(true);
const store = useStore();
const ui_control = store.state.ui_control;
const app_data = store.state.app_data;

const { data, curr_period, curr_time_line } = toRefs(app_data);
var { new_period, is_new_period, period_color, canvas } = toRefs(ui_control);

const set_period_vals = () => {
  new_period.value = curr_period;
  period_color.value = curr_period.value.color;
};

let period_opt = computed(() => {
  return curr_time_line.value == null
    ? []
    : data.value[curr_time_line.value].periods;
});

const update_period = (method) => {
  if (method == "del") {
    store.commit("delete_curr_period");
  } else {
    new_period.value.color = period_color.value;
    if (String(is_new_period.value) == "true") {
      store.commit("add_new_period", new_period.value);
    } else {
      console.log(JSON.parse(JSON.stringify(new_period.value)));
      curr_period.value = JSON.parse(JSON.stringify(new_period.value));
    }
  }
  store.dispatch("create_canvas", canvas.value);
};

const changeColor = (color) => {
  const { r, g, b, a } = color.rgba;
  period_color.value = `rgba(${r}, ${g}, ${b}, ${a})`;
};
</script>

<template>
  <v-card flat>
    <v-card-text @click="show_detail = !show_detail" style="cursor: pointer">
      <div>
        <v-icon> mdi-arrow-down-drop-circle-outline </v-icon>
        Periods:
        <span :style="`background-color:${period_color}`">
          {{ curr_period == null ? "" : curr_period.name }}
        </span>
      </div>
    </v-card-text>
    <v-card-text v-if="show_detail" class="ml-5">
      <select v-model="curr_period" @change="set_period_vals">
        <option v-for="t of period_opt" :key="t" :value="t">
          {{ t.name }} ({{ date2string(convert_date(t.st), "year with AD") }} -
          {{ date2string(convert_date(t.ed), "year with AD") }})
        </option>
      </select>

      <v-text-field
        v-model="new_period.name"
        label="Period name"
      ></v-text-field>
      <v-text-field v-model="new_period.st" label="From"></v-text-field>
      <v-text-field v-model="new_period.ed" label="To"></v-text-field>
      <v-text-field v-model="new_period.url" label="Url"></v-text-field>

      <v-checkbox
        v-model="new_period.vertical"
        label="Chinese character"
      ></v-checkbox>

      <v-checkbox v-model="is_new_period" label="New Period"></v-checkbox>

      <v-btn class="mt-3 mr-3" @click="update_period('del')"> Del </v-btn>
      <v-btn class="mt-3 mr-3" @click="update_period('update')"> Update </v-btn>
    </v-card-text>
  </v-card>
  <ColorPicker theme="light" :color="period_color" @changeColor="changeColor" />

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