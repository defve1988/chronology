export const convert_date = function (date_str) {
   var date = new Date()
   date_str = date_str.split("-")
   if (date_str[0] == "") {
      date_str.splice(0, 1)
      date_str[0] = -parseInt(date_str[0])
   }
   date.setFullYear(date_str[0]);

   if (date_str.length > 1) {
      date.setMonth(date_str[1] - 1);
   }
   else {
      date.setMonth(0);
   }

   if (date_str.length > 2) {
      date.setDate(date_str[2] - 1);
   }
   else {
      date.setDate(1);
   }

   return date.getTime()
};

export const date2string = function (date_num, format) {
   var res
   var date = new Date(date_num)
   var year = date.getFullYear()
   if (format == "year with AD") {
      res = `${Math.abs(year)} ${year >= 0 ? "AD" : "BC"}`
   }
   else if (format == "yyyy-mm") {
      res = `${year}-${date.getMonth() + 1}`
   }
   else if (format == "yyyy-mm-dd") {
      res = `${year}-${date.getMonth() + 1}-${date.getDate() + 1}`
   }
   return res
}


export const showTooltip = function (evt) {
   let img = evt.target.parentElement.getAttribute("img")
   let text = evt.target.parentElement.getAttribute("comment")

   if (text != "" || img != "") {
      let tooltip = document.getElementById("time_line_tooltip");
      tooltip.innerHTML = text;
      tooltip.style.display = "block";
      tooltip.style.left = evt.layerX + 10 + "px";
      tooltip.style.top = evt.layerY + 10 + "px";

      let br = document.createElement("br");
      tooltip.appendChild(br);

      var node = document.createElement("img");
      node.setAttribute("src", img)
      node.style.maxWidth = "400px"
      node.style.maxHeight = "300px"
      node.style.width = "auto"
      node.style.height = "auto"
      tooltip.appendChild(node);
   }

}

export const hideTooltip = function (evt) {
   var tooltip = document.getElementById("time_line_tooltip");
   tooltip.style.display = "none";
}