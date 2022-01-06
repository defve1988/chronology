export const add_title = function (group, text, index, font) {
   group
      .text(text)
      .font({ family: font.time_font_family, weight: "bold" })
      .attr({
         index: index
      })
};

export const adjust_title = function (group, config) {
   var font = config.period_font
   var interval = config.mode == "detail" ? config.interval: config.period_T
   var tick_length = config.period_T
   var left = config.left
   var label_padding_left = tick_length + left
   
   for (let el of group.children()) {
      let index = el.node.getAttribute("index")
      el.font({ size: font.size1 })
         .move(label_padding_left + index * interval, 0)
   }
};