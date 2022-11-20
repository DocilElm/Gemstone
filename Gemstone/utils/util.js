import PogObject from "PogData";
export const PREFIX = "&d[Gemstone] ";
export let data = new PogObject("Gemstone", {
    "x": 0,
    "y": 0,
    "first_time": true
}, ".gemstone_data.json");
export const short_number = (num) => {
    if(num == undefined) return;
    return num.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
export let abc = new Gui()
register("command", () => {
      abc.open();
}).setName("gemstonedisplayrender");
register("dragged", (dx, dy, x, y) => {
      if (!abc.isOpen()) return
      data.x = x
      data.y = y
      data.save()
});