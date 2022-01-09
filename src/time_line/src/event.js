import { convert_date, date2string, showTooltip, hideTooltip } from "./utils"

export const add_event = function (group, event, index, font, dateformat) {
   var time = convert_date(event["time"])

   let G = group.group()
   G.attr({
      time: time,
      index: index
   })

   // content
   var text_time = date2string(time, dateformat)
   var text_label = event["name"]
   var color = event["color"]
   var url = event["url"]
   var comment = event["comment"]
   var img = event["img"]

   if (comment != "" || img != "") comment = `<b>${text_label}:</b> <br> ${comment}`


   // draw tick
   G.line(0, 0, 1, 0)
      .stroke({ color: '#303030' })
   // draw text
   G.text(text_time)
      .font({ size: font.size, family: font.time_font_family, weight: "bold" })
   G.link(url)
      .target('_blank')
      .text(text_label)
      .font({ size: font.size, family: font.label_family, weight: "bold", fill: color })
      .attr({ comment: comment, img: img })
      .on('mouseover', showTooltip)
      .on('mouseout', hideTooltip)
}

export const adjust_event = function (group, config, last) {

   var tick_width = 2 * config.x_scale
   var yr_padding = 5 * config.x_scale

   var font = config.event_font
   var interval = config.interval
   var tick_length = config.event_T
   var period_tick = config.period_T
   var left = config.left
   var top = config.top
   var L = config.L
   var st = config.st
   var ed = config.ed

   var periods = group.children()
   if (last) periods = [periods[periods.length - 1]]

   for (let el of periods) {
      let index = el.node.getAttribute("index")
      let time = el.node.getAttribute("time")

      var perv = (time - st) * (L / (ed - st))
      let x = period_tick * 2 + index * interval + left
      let y = top + perv

      let c = el.children()
      c[0].move(x, y)
         .width(tick_length)
         .stroke({ width: tick_width })

      let yr_box = c[1].node.getBBox()
      c[1].font({ size: font.size })
         .move(x + tick_length - yr_box.width, y - yr_box.height)

      let label_box = c[2].node.getBBox()
      c[2].children()[0].font({ size: font.size })
         .move(x + tick_length + yr_padding, y - label_box.height)
   }
};