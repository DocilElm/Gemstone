import {
    @Vigilant,
    @SwitchProperty,
    @SelectorProperty,
    @ButtonProperty,
    Color 
} from 'Vigilance';

@Vigilant("Gemstone", "§dGemstone §fSettings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {
    constructor() {
        this.initialize(this);
    }
    @SwitchProperty({
        name: "Display",
        description: "Display Gemstone Stats\n§4Requires Pickaxe/Drill With Compact Enchant!",
        category: "General",
        subcategory: "General"
    })
    config_display = true
    @SwitchProperty({
        name: "Mining Speed Notifications",
        description: "Alerts You When Mining Speed Boost Is §aReady§r/§6Used§r/§cExpired",
        category: "General",
        subcategory: "General"
    })
    config_notif_msb = true
    @ButtonProperty({
        name: "Display Location",
        description: "Changes The Display Location",
        category: "General",
        subcategory: "General",
        placeholder: "Change"
    })
    action() {
        ChatLib.command("gemstonedisplayrender", true);
    }
}

export default new Settings();