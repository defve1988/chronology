import { date2string } from "./utils"

export const add_axis = function (group, tick_number, date_infor, font) {
   let st = date_infor.st
   let ed = date_infor.ed
   let dateformat = date_infor.dateformat

   let G1 = group.group()

   G1.line(0, 0, 0, 1)
      .stroke({ color: '#303030' })

   let G2 = group.group()
   for (let i = 0; i <= tick_number; i++) {
      let tick = G2.group().attr({
         tick_index: i
      })
      let curr = i * (ed - st) / tick_number
      tick.line(0, 0, 1, 0)
         .stroke({ color: '#303030', linecap: 'round' })
      tick.text(date2string(curr + st, dateformat))
         .font({ family: font.time_font_family, weight: "bold" })
   }

};

export const adjust_axis = function (group, config, tick_number, st, ed) {
   var tick_length = config.main_T
   var top = config.top
   var font = config.period_font
   var period = config.L

   var axis_width = 8 * config.x_scale
   var tick_width = 1 * config.x_scale

   let G1 = group.children()[0]
   let axis = G1.children()[0]
   axis.move(tick_length, top).height(period).stroke({ width: axis_width })

   let G2 = group.children()[1]

   for (let tick of G2.children()) {
      let tick_index = tick.node.getAttribute("tick_index")
      let curr = tick_index * (ed - st) / tick_number
      let tick_loc = curr * (period / (ed - st))

      let c = tick.children()
      c[0].move(0, tick_loc + top).width(tick_length).stroke({ width: tick_width })
      c[1].move(0, tick_loc + top - c[1].node.getBBox().height)
         .font({ size: font.size3 })
   }

};