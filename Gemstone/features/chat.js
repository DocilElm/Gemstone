import config from "../config";
import { PREFIX } from "../utils/util";
register("chat", (msg) => {
    if(!config.config_display) return;
    switch (msg) {
        case "Mining Speed Boost is now available!":
            if(!config.config_notif_msb) break;
            Client.showTitle("&aMining Speed Boost!", `${PREFIX}`,1,30,1);
            break;
        case "You used your Mining Speed Boost Pickaxe Ability!":
            if(!config.config_notif_msb) break;
            Client.showTitle("&6Used Mining Speed Boost!", `${PREFIX}`,1,30,1);
            break;
        case "Your Mining Speed Boost has expired!":
            if(!config.config_notif_msb) break;
            Client.showTitle("&cMining Speed Boost Expired!", `${PREFIX}`,1,30,1);
            break;
    }
}).setCriteria("${msg}");