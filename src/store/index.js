
import { createStore } from 'vuex'
import app_data from './modules/app_data'
import ui_control from './modules/ui_control'


export default createStore({
  modules: {
    app_data,
    ui_control
  }
})
