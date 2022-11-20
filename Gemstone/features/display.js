import request from "../../requestV2";
import config from "../config";
import { abc, data, PREFIX, short_number } from "../utils/util";

let session_xp = 0
let session_pet_xp = 0
let compact_ench = 0
let drill_fuel = 0
let purse_powder = null
let old_compact = 0
let profit_session = 0

register('actionbar', (gained) => {
  if(!config.config_display) return;
  if(Player.getHeldItem() == null) return;
  let h_obj = Player.getHeldItem().getNBT().toObject()["tag"]["ExtraAttributes"];
  let scoreb = Scoreboard.getLines().map(line => line.getName().removeFormatting()); 
  let new_comp = parseInt(h_obj["compact_blocks"]);
  scoreb.forEach(line => {
        if (line.includes("Gemstone")) {
            purse_powder = line.split(":")[1].replace(" ","");
        }
  })
  if(old_compact == 0) old_compact = new_comp;
  else if(old_compact !== new_comp){
    session_xp += parseInt(gained);
    session_pet_xp += parseInt(gained*1.5);
    compact_ench = parseInt(h_obj["compact_blocks"]);
    drill_fuel = parseInt(h_obj["drill_fuel"]);
    old_compact = new_comp;
  }
}).setCriteria('${*}+${gained} Mining ${*}');

register("chat", (gemstone_type, amount) => {
  let am = parseInt(amount)
  let gem_type = `FLAWED_${gemstone_type.toUpperCase()}_GEM`
  request({url : `https://api.slothpixel.me/api/skyblock/bazaar/${gem_type}`,headers: { 'User-Agent': ' Mozilla/5.0' }, json: true}).then(response => {
    profit_session += parseInt(response.quick_status.sellPrice) * am
  }).catch(error =>{ print(error);});
}).setCriteria("PRISTINE! You found ${*} Flawed ${gemstone_type} Gemstone x${amount}!");

register("renderOverlay", () => {
  if(!config.config_display) return;
  if (abc.isOpen()) {
    const txt = "Click anywhere to move!"
    Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2)
  }
  let sessionxp_txt = `&dSession XP: &6${short_number(session_xp)}`;
  let session_petxp_txt = `&dSession Pet XP: &6${short_number(session_pet_xp)}`;
  let compe_txt = compact_ench >= 1000000 ?`&9Compacted Blocks: &6${short_number(compact_ench)}` : `&9Compacted Blocks: &7${short_number(compact_ench)}`;
  let drillf_txt = drill_fuel >= 1000 ?`&2Drill Fuel: &6${short_number(drill_fuel)}` : `&2Drill Fuel: &c${short_number(drill_fuel)}`;
  let powderp_txt = `&dPurse Powder: &6${purse_powder}`;
  let profit_txt = `&dSession Profit: &6${short_number(profit_session)}`
  Renderer.drawStringWithShadow(`${PREFIX}\n${sessionxp_txt}\n${session_petxp_txt}\n${compe_txt}\n${drillf_txt}\n${powderp_txt}\n${profit_txt}`, data.x, data.y)
});
register("command", () => profit_session = 0).setName("profit_rs");