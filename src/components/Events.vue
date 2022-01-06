<script setup>
import { useStore } from "vuex";
import { toRefs, ref, computed } from "vue";
import { convert_date, date2string } from "@/time_line/src/utils";
import { ColorPicker } from "vue-color-kit";

var show_detail = ref(true);
const store = useStore();
const ui_control = store.state.ui_control;
const app_data = store.state.app_data;

const { data, curr_event, curr_time_line } = toRefs(app_data);
var { new_event, is_new_event, event_color, canvas } = toRefs(ui_control);

const set_event_vals = () => {
  new_event.value = curr_event;
  event_color.value = curr_event.value.color;
};

let event_opt = computed(() => {
  return curr_time_line.value == null
    ? []
    : data.value[curr_time_line.value].events;
});

const update_event = (method) => {
  if (method == "del") {
    store.commit("delete_curr_event");
  } else {
    new_event.value.color = event_color.value;
    if (String(is_new_event.value) == "true") {
      store.commit("add_new_event", new_event.value);
    } else {
      curr_event.value = new_event.value;
    }
  }
  store.dispatch("create_canvas", canvas.value);
};

const changeColor = (color) => {
  const { r, g, b, a } = color.rgba;
  event_color.value = `rgba(${r}, ${g}, ${b}, ${a})`;
};
</script>

<template>
  <v-card flat>
    <v-card-text @click="show_detail = !show_detail" style="cursor: pointer">
      <div>
        <v-icon> mdi-arrow-down-drop-circle-outline </v-icon>
        Events:
        <span :style="`background-color:${event_color}`">
          {{ curr_event == null ? "" : curr_event.name }}
        </span>
      </div>
    </v-card-text>
    <v-card-text v-if="show_detail" class="ml-5">
      <select v-model="curr_event" @change="set_event_vals">
        <option v-for="t of event_opt" :key="t" :value="t">
          {{ date2string(convert_date(t.time), "year with AD") }} - {{ t.name }}
        </option>
      </select>

      <v-text-field v-model="new_event.name" label="Event Name"></v-text-field>
      <v-text-field v-model="new_event.time" label="Time"></v-text-field>
      <v-text-field v-model="new_event.comment" label="Comment"></v-text-field>
      <v-text-field v-model="new_event.url" label="Url"></v-text-field>
      <v-text-field v-model="new_event.img" label="Image"></v-text-field>

      <v-checkbox v-model="is_new_event" label="New Event"></v-checkbox>

      <v-btn class="mt-3 mr-3" @click="update_event('del')"> Del </v-btn>
      <v-btn class="mt-3 mr-3" @click="update_event('update')"> Update </v-btn>
    </v-card-text>
  </v-card>
  <ColorPicker theme="light" :color="event_color" @changeColor="changeColor" />

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