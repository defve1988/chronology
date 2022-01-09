import { convert_date, date2string, showTooltip, hideTooltip } from "./utils"

export const add_period = function (group, period, index, font, dateformat) {
   let G = group.group()
   G.attr({
      st: period["st"],
      ed: period["ed"],
      index: index,
      v: period["vertical"]
   })

   var yr = Math.floor((convert_date(period["ed"]) - convert_date(period["st"])) / 3600000 / 24 / 365)
   var text = period["name"]
   if (period["vertical"]) {
      text = text.split("").join("\n")
   }

   var color = period["color"]
   var url = period["url"]
   var comment = period["comment"]
   if (comment == undefined) comment = ""
   var img = period["img"]
   if (img == undefined) img = ""
   var st = date2string(convert_date(period["st"]), dateformat)
   var ed = date2string(convert_date(period["ed"]), dateformat)
   comment = `<b>${period["name"]}:</b> <br> From ${st} to ${ed} <br> ${comment}`

   // draw axis
   G.line(0, 0, 0, 1)
      .stroke({ color: '#303030' })

   // draw upper and lower tick
   G.line(0, 0, 1, 0)
      .stroke({ color: '#303030' })
   G.line(0, 0, 1, 0)
      .stroke({ color: '#303030' })

   // draw background
   G.rect(10, 10)
      .fill(color)

   G.link(url)
      .target('_blank')
      .text(text)
      .font({ family: font.label_family, weight: "bold" })

   G.text(`(${yr})`)
      .font({ family: font.label_family, weight: "thin" })

   G.attr({
      comment: comment, img: img
   })
}

export const adjust_period = function (group, config, last) {
   var axis_width = 8 * config.x_scale
   var tick_width = 5 * config.x_scale
   var yr_padding = 10 * config.x_scale

   var font = config.period_font
   var interval = config.interval
   var tick_length = config.period_T
   var left = config.left
   var top = config.top
   var L = config.L

   var st = config.st
   var ed = config.ed

   var periods = group.children()
   if (last) periods = [periods[periods.length - 1]]

   for (let el of periods) {
      let index = el.node.getAttribute("index")
      let period_st = el.node.getAttribute("st")
      let period_ed = el.node.getAttribute("ed")
      let vertical = el.node.getAttribute("v") === 'true'

      let perv = (convert_date(period_st) - st) * (L / (ed - st))
      let duration = (convert_date(period_ed) - convert_date(period_st)) * (L / (ed - st))
      var label_padding_left = config.mode == "detail" ?
         tick_length + index * interval + left :
         tick_length + tick_length * index + left + axis_width / 2 * index

      // positions
      let x = label_padding_left
      let y = top + perv
      let c = el.children()

      c[0].move(x + tick_length, y)
         .height(duration)
         .stroke({ width: axis_width })
      c[1].move(x, y)
         .width(tick_length)
         .stroke({ width: tick_width })
      c[2].move(x, y + duration)
         .width(tick_length)
         .stroke({ width: tick_width })
      c[3].move(x, y)
         .attr({
            width: tick_length,
            height: duration
         })
         .on('mouseover', showTooltip)
         .on('mouseout', hideTooltip)

      // adjust the label
      c[4].children()[0].font({ size: font.size1 })
      c[5].font({ size: font.size3 })

      let rect_box = c[3].node.getBBox()
      let label_box = c[4].node.getBBox()
      let yr_box = c[5].node.getBBox()


      let r_w = rect_box.width
      let r_h = rect_box.height
      let l_w = vertical ? label_box.width : label_box.height
      let l_h = vertical ? label_box.height : label_box.width
      let yr_w = yr_box.width
      let yr_h = yr_box.height

      if (r_h < l_h + yr_h) {
         c[4].children()[0].font({ size: font.size3, family: font.label_family, weight: "bold" })
         c[5].font({ size: font.size3 / 2, family: font.label_family, weight: "bold" })
         label_box = c[4].node.getBBox()
         yr_box = c[5].node.getBBox()
         l_w = vertical ? label_box.width : label_box.height
         l_h = vertical ? label_box.height : label_box.width
         yr_w = yr_box.width
         yr_h = yr_box.height
      }

      if (r_h < l_h + yr_h) {
         // move to outside of period
         if (!vertical) {
            c[4].transform({
               translate: [x - (r_w - l_w) / 2, y + (r_h - l_h - yr_h) / 2 - yr_padding],
               origin: 'bottom left',
               rotate: 90,
            })
         }
         else {
            c[4].move(x - (r_w - l_w) / 2, y + (r_h - l_h - yr_h) / 2)
         }
         c[5].move(x - (r_w - yr_w) / 2, y + (r_h - l_h - yr_h) / 2 + l_h)
      }
      else {
         // move to inside of period
         if (!vertical) {
            c[4].transform({
               translate: [x + (r_w - l_w) / 2, y + (r_h - l_h - yr_h) / 2 - yr_padding],
               origin: 'bottom left',
               rotate: 90,
            })
         }
         else {
            c[4].move(x + (r_w - l_w) / 2, y + (r_h - l_h - yr_h) / 2)
         }
         c[5].move(x + (r_w - yr_w) / 2, y + (r_h - l_h - yr_h) / 2 + l_h)
      }
   }
};