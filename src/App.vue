<script setup>
import { useStore } from "vuex";
import { onMounted, toRefs } from "vue";
import time_line from "@/time_line";

const store = useStore();
const app_data = store.state.app_data;
const { simple_mode } = toRefs(app_data);

onMounted(() => {
  store.commit("update_app_data", {
    time_line: new time_line(
      "#draw",
      String(simple_mode) == "true" ? "simple" : "detail"
    ),
  });
  const slider = document.getElementById("draw");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk_x = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk_x;

    // console.log(walk);
  });
});

var lastScrollFireTime = 0;
document.addEventListener(
  "wheel",
  function (e) {
    if (e.altKey) {
      e.preventDefault();
      if (new Date() - lastScrollFireTime > 100) {
        store.dispatch("rescale", e.deltaY < 0);
        lastScrollFireTime = new Date();
      }
    }
  },
  { passive: false }
);
</script>

<template>
  <v-app>
    <AppBar />
    <NavBar />
    <v-main>
      <v-card flat>
        <div class="scroll_div"></div>
        <div
          id="time_line_tooltip"
          display="none"
          style="position: absolute; display: none"
        ></div>
        <div id="draw"></div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>

<style lan="sass">
#draw {
  overflow: auto;
  /* cursor: grab; */
}

#time_line_tooltip {
  background-color: rgba(236, 205, 146, 0.863);
  padding: 15px;
  padding-bottom: 10px;
  border-radius: 5px;
  position: fixed;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.4s ease-out;
  transition-delay: 5ms;
  filter: drop-shadow(4px 4px 1px #707070b9);
  border: solid 1px #707070b9;
}

.v-input__details {
  display: none !important;
}
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
}

/* svg text {
  text-anchor: middle;
  dominant-baseline: middle;
} */
.hover {
  filter: drop-shadow(4px 4px 1px #707070b9);
  transition-duration: 100ms;
  transition-delay: 5ms;
}
</style>
