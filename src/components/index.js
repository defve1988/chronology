import AppBar from '@/components/AppBar.vue'
import NavBar from '@/components/NavBar.vue'
import CanvasSetting from '@/components/CanvasSetting.vue'
import TimeLine from '@/components/TimeLine.vue'
import Periods from '@/components/Periods.vue'
import Events from '@/components/Events.vue'


export default {
  install: function (Vue) {
    Vue.component('AppBar', AppBar)
    Vue.component('NavBar', NavBar)
    Vue.component('CanvasSetting', CanvasSetting)
    Vue.component('TimeLine', TimeLine)
    Vue.component('Periods', Periods)
    Vue.component('Events', Events)
  }
  // ...
}