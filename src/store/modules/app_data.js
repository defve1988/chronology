import time_line_data from "@/assets/time_line.json";

const state = {
   // data: time_line_data.data,
   data: {},
   time_line: null,
   simple_mode: false,
   curr_time_line: null,
   curr_period: null,
   curr_event: null,
};

const getters = {

};

const actions = {
   create_canvas(store, canvas) {
      // console.log(canvas)
      // console.log(store.state.data)
      store.state.time_line.create_canvas(canvas, store.state.data);
      // store.state.time_line.test();
   },
   redraw(store) {
      store.state.time_line.redraw(store.state.data);
   },
   rescale(store, zoomin) {
      store.state.time_line.rescale(zoomin);
   }

};

const mutations = {
   update_app_data(state, new_vals) {
      Object.assign(state, new_vals)
   },
   change_mode(state) {
      state.time_line.mode = state.simple_mode ? "simple" : "detail"
   },
   add_new_time_line(state, new_val) {
      let value = new_val.value
      let new_time_line = {
         [value]: {
            text: value,
            index: Object.keys(state.data).length,
            periods: [],
            events: [],
         }
      }
      Object.assign(state.data, new_time_line)
      Object.assign(state.time_line.data, new_time_line)
   },
   add_new_period(state, new_val) {
      let time_line = state.curr_time_line
      state.data[time_line]["periods"].push(JSON.parse(JSON.stringify(new_val)))
   },
   delete_curr_period(state) {
      let time_line = state.curr_time_line
      let index = state.data[time_line]["periods"].findIndex(
         (x) => x.name == state.curr_period.name
      );
      state.data[time_line]["periods"].splice(index, 1);
   },

   add_new_event(state, new_val) {
      let time_line = state.curr_time_line
      state.data[time_line]["events"].push(JSON.parse(JSON.stringify(new_val)))
   },
   delete_curr_event(state) {
      let time_line = state.curr_time_line
      let index = state.data[time_line]["events"].findIndex(
         (x) => x.name == state.curr_event.name
      );
      state.data[time_line]["events"].splice(index, 1);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};