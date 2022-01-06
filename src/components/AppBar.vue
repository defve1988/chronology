<script setup>
import { useStore } from "vuex";
import { toRefs } from "vue";
import * as saveSvgAsPng from "save-svg-as-png";
import { saveAs } from "file-saver";

const store = useStore();

const ui_control = store.state.ui_control;
const { drawer } = toRefs(ui_control);

const change_drawer = () => {
  store.commit("update_ui", { drawer: !drawer.value });
};

const save_data = () => {
  const app_data = store.state.app_data;
  const { data } = toRefs(app_data);
  const { canvas } = toRefs(ui_control);
  var fileName = "myTimeline.json";
  // Create a blob of the data
  var fileToSave = new Blob(
    [
      JSON.stringify({
        data: data.value,
        canvas: canvas.value,
      }),
    ],
    {
      type: "application/json",
    }
  );
  // Save the file
  saveAs(fileToSave, fileName);
};

const save_fig = () => {
  const node = document.getElementById("draw").children[0];
  const filename = "my_timeline.png";
  saveSvgAsPng.saveSvgAsPng(node, filename);
};
</script>

<template>
  <v-app-bar app color="primary" dark clipped-left dense flat>
    <v-btn
      icon
      color="primary"
      elevation="0"
      class="mx-5"
      @click="change_drawer"
    >
      <v-icon> mdi-menu </v-icon>
    </v-btn>

    Create Your Own Time Lines

    <v-btn icon flat color="primary" class="ml-3" @click="save_fig">
      <v-icon>mdi-image</v-icon>
    </v-btn>

    <v-btn icon flat color="primary" class="ml-3" @click="save_data">
      <v-icon>mdi-cloud-download-outline</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>
