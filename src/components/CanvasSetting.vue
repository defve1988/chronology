<script setup>
import { useStore } from "vuex";
import { toRefs, ref } from "vue";

const store = useStore();
const ui_control = store.state.ui_control;
const { canvas } = toRefs(ui_control);
const { H, W, padding, st, ed, interval, base_font, ticks, dateformat } =
  toRefs(store.state.ui_control.canvas);
var show_detail = ref(false);

const app_data = store.state.app_data;
const { time_line, simple_mode } = toRefs(app_data);

// const dateformats = ["year with AD", "yyyy-mm", "yyyy-mm-dd"];

const create_canvas = () => {
  store.dispatch("create_canvas", canvas.value);
};

const change_mode = () => {
  store.commit("change_mode");
};

const open_file = (evt) => {
  try {
    let files = evt.target.files;

    if (!files.length) {
      alert("No file selected!");
      return;
    }
    let file = files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      let data = JSON.parse(event.target.result);
      store.commit("update_app_data", {
        data: data.data,
      });
      store.commit("update_canvas", data.canvas);
      store.dispatch("create_canvas", canvas.value);
    };
    reader.readAsText(file);
  } catch (err) {
    console.error(err);
  }
};

const click_file_input = () => {
  document.getElementById("contentFile").click();
};
</script>

<template>
  <v-card flat>
    <v-card-text @click="show_detail = !show_detail" style="cursor:pointer">
      <div>
        <v-icon> mdi-arrow-down-drop-circle-outline </v-icon>
        Canvas
      </div>
    </v-card-text>
    <v-card-text v-if="show_detail" class="ml-5">
      <v-text-field v-model="H" label="Height (px)"></v-text-field>
      <v-text-field v-model="W" label="Width (px)"></v-text-field>
      <v-text-field v-model="padding" label="Padding (px)"></v-text-field>
      <v-text-field v-model="interval" label="Interval (px)"></v-text-field>
      <v-text-field
        v-model="base_font"
        label="Base Font Size (px)"
      ></v-text-field>
      <v-text-field v-model="st" label="Starting Date"></v-text-field>
      <v-text-field v-model="ed" label="Ending Date"></v-text-field>
      <v-text-field v-model="ticks" label="Ticks"></v-text-field>
      <v-text-field v-model="dateformat" label="Date Format"></v-text-field>

      <v-checkbox
        v-model="simple_mode"
        label="Simple Mode"
        @change="change_mode"
      ></v-checkbox>

      <v-btn class="mt-3 mr-3" @click="create_canvas"> Draw</v-btn>
      <v-btn class="mt-3 mr-3" @click="click_file_input"> Open</v-btn>

      <input
        id="contentFile"
        type="file"
        accept="application/json"
        style="display: none"
        @change="open_file"
      />
    </v-card-text>
  </v-card>
  <v-divider></v-divider>
</template>
