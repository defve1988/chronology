import { SVG } from "@svgdotjs/svg.js"
import { convert_date, date2string } from "./src/utils"

import { add_axis, adjust_axis } from "./src/main_axis"
import { add_title, adjust_title } from "./src/title"
import { add_period, adjust_period } from "./src/period"
import { add_event, adjust_event } from "./src/event"

export default class {
   constructor(div, mode) {
      this.div = div
      this.mode = mode // detail or simple
      this.draw = null
      this.data = {}
      // this.tooltip_div = tooltip_div
   }

   // test() {
   //    this.draw = SVG()
   //       .addTo(this.div)
   //       .size(500, 500)
   //       this.draw.rect(50, 400).fill("red").move(200,100)
   //       let rect = this.draw.rect(100, 20)
   //       rect.transform( {
   //          translate: [150, 100],
   //          origin: 'top left',
   //          rotate: 90,
   //       })

   //       rect.transform( {
   //          translate: [150, 100],
   //          origin: 'top left',
   //          rotate: 90,
   //       })
   //       // console.log(rect.node.getBBox())

   //       // rect.move(50,-100)

   //    // let st = new Date()
   //    // for (let i = 0; i < 10000; i++) {
   //    //    let rect = this.draw.rect(100, 100)

   //    //    rect.move(0, 0)
   //    //    // rect.attr('width', 50)
   //    // }
   //    // console.log(new Date() - st)
   // }

   create_canvas(canvas, time_line_data) {
      const { H, W, padding, interval, base_font, st, ed, ticks, dateformat, duration } = canvas

      this.config = {
         H: parseInt(H),
         W: parseInt(W),
         padding: parseInt(padding),
         interval: parseInt(interval),
         base_font: parseFloat(base_font),
         st: convert_date(st),
         ed: convert_date(ed),
         ticks: parseInt(ticks),
         dateformat: dateformat,
         duration: duration
      }

      this.x_scale = 1
      this.y_scale = 1

      this.data = time_line_data

      if (this.draw != null) {
         this.draw.clear()
         this.draw.size(this.config.W * this.x_scale, this.config.H * this.y_scale)
            .viewbox(-padding, -padding, this.config.W, this.config.H)
      }
      else {
         this.draw = SVG()
            .addTo(this.div)
            .size(this.config.W * this.x_scale, this.config.H * this.y_scale)
            .viewbox(-padding, -padding, this.config.W, this.config.H)
      }

      // main axis
      this.axis_g = this.draw.group()
      // period groups
      this.period_g = this.draw.group()
      // event groups
      this.event_g = this.draw.group()
      // title
      this.title_g = this.draw.group()

      this.computer_vals()
      this.add_content()
      this.adjust_content()
   }

   computer_vals() {
      let base_font = this.config.base_font
      this.computed = {
         mode: this.mode,
         st: this.config.st,
         ed: this.config.ed,
         x_scale: this.x_scale,
         y_scale: this.y_scale,
         L: (this.config.H - 2 * this.config.padding) * this.y_scale,
         T: this.config.interval / 5 * this.x_scale,
         main_T: this.config.interval / 5 * this.x_scale,
         period_T: this.config.interval / 5 * 2 / 3 * this.x_scale,
         event_T: this.config.interval / 5 * this.x_scale,
         top: parseFloat(base_font) * this.x_scale * 1.5,
         left: this.config.padding * 1.5 * this.x_scale,
         interval: this.config.interval * this.x_scale,
         period_font: {
            size1: parseFloat(base_font) * this.x_scale,
            size2: parseFloat(base_font) / 2 * this.x_scale,
            size3: parseFloat(base_font) / 3 * 2 * this.x_scale,
            label_family: "'Trebuchet MS', sans-serif",
            time_font_family: "'Brush Script MT', cursive",
         },
         event_font: {
            size: parseFloat(base_font) / 3 * 2 * this.x_scale,
            label_font_family: "'Trebuchet MS', sans-serif",
            time_font_family: "'Brush Script MT', cursive",
         },
         comment_font: {
            size: parseFloat(base_font) / 3 * 2 * this.x_scale,
            font_family: "'Trebuchet MS', sans-serif",
         }
      }
      this.computed.d = this.computed.L / (this.config.ed - this.config.st)
   }

   add_content() {
      add_axis(this.axis_g, this.config.ticks,
         {
            dateformat: this.config.dateformat,
            st: this.config.st,
            ed: this.config.ed,
         },
         this.computed.period_font)
      for (const [key, value] of Object.entries(this.data)) {
         let index = value["index"]
         add_title(this.title_g, value["text"], index, this.computed.period_font)
         for (const p of value["periods"]) {
            add_period(this.period_g, p, index, this.computed.period_font, this.config.dateformat, this.config.duration);
         }
         if (this.mode == "detail") {
            for (const e of value["events"]) {
               add_event(this.event_g, e, index, this.computed.event_font, this.config.dateformat);
            }
         }
      }
   }

   adjust_content() {
      adjust_axis(this.axis_g, this.computed, this.config.ticks, this.config.st, this.config.ed)
      adjust_title(this.title_g, this.computed)
      adjust_period(this.period_g, this.computed, false)
      adjust_event(this.event_g, this.computed, false)
   }

   rescale(zoomin) {
      if (zoomin) {
         this.y_scale = this.y_scale * 1.1
         this.x_scale = this.x_scale * 1.1 > 1.2 ? 1.2 : this.x_scale * 1.1
      }
      else {
         this.y_scale = this.y_scale * 0.9 < 0.5 ? 0.5 : this.y_scale * 0.9
         this.x_scale = this.x_scale * 0.9 < 0.5 ? 0.5 : this.x_scale * 0.9
      }

      let padding = this.config.padding
      this.draw
         .size(this.config.W * this.x_scale, this.config.H * this.y_scale)
         .viewbox(-padding, -padding, this.config.W * this.x_scale, this.config.H * this.y_scale)
      this.computer_vals()
      this.adjust_content()
   }

}
