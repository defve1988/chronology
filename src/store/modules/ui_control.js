import time_line_data from "@/assets/time_line.json";

const state = {
   drawer: true,
   canvas:time_line_data.canvas,
   // canvas: {
   //    "H": 7000,
   //    "W": 5000,
   //    "padding": 50,
   //    "interval": 400,
   //    "base_font": 24,
   //    "st": "-4500",
   //    "ed": "2500",
   //    "ticks": 14,
   //    // or yyyy-mm or yyyy-mm-dd
   //    "dateformat": "year with AD"
   // },
   period_color: "#000000",
   event_color: "#000000",

   new_time_line: "",
   new_period: {
      "name": "",
      "st": "",
      "ed": "",
      "url": "",
      "color": "",
      "comment":"",
      "img":"",
      "vertical": true
   },
   is_new_period: true,

   new_event: {
      "time": "",
      "name": "",
      "comment": "",
      "color": "",
      "url": "",
      "img": ""
   },
   is_new_event: true,

};

const getters = {

};

const actions = {

};

const mutations = {
   update_ui(store, new_vals) {
      Object.assign(store, new_vals)
   },
   update_canvas(store, new_vals) {
      console.log(new_vals)
      Object.assign(store.canvas, new_vals)
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};