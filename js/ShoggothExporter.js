useLibrary("threads");
importClass(java.io.File);
importClass(java.io.FileWriter);
importClass(java.nio.file.Files);
importClass(java.nio.file.Paths);
importClass(arkham.project.ProjectUtilities);
importClass(ca.cgjennings.apps.arkham.project.Project);
importClass(javax.imageio.ImageIO);

const PROJECT = Eons.getOpenProject();
const PROJECT_FOLDER = new File(PROJECT.getFile().getPath(), "shoggoth_export");
if (!PROJECT_FOLDER.exists()) PROJECT_FOLDER.mkdirs();
const IMAGE_FOLDER = new File(PROJECT_FOLDER, "images");
if (!IMAGE_FOLDER.exists()) IMAGE_FOLDER.mkdirs();
const OUTPUT_FILE = new File(PROJECT_FOLDER, "project.json");

const front_types = {
    "Act.js": "act",
    "ActAssetStory.js": "act",
    "ActEnemy.js": "act",
    "ActLocation.js": "act",
    "ActPortrait.js": "act",
    "Agenda.js": "agenda",
    "AgendaAssetStory.js": "agenda",
    "AgendaEnemy.js": "agenda",
    "AgendaFrontPortrait.js": "agenda",
    "AgendaLocation.js": "agenda",
    "AgendaPortrait.js": "agenda",
    "AgendaTreachery.js": "agenda",
    "Asset.js": "asset",
    "AssetAsset.js": "asset",
    "AssetStory.js": "asset",
    "AssetStoryAsset.js": "asset",
    "AssetStoryEnemy.js": "asset",
    "AssetStoryPortrait.js": "asset",
    "Chaos.js": "chaos",
    "Concealed.js": "concealed",
    "Customizable.js": "customizable",
    "Enemy.js": "enemy",
    "EnemyEnemy.js": "enemy",
    "EnemyLocation.js": "enemy_location",
    "EnemyPortrait.js": "enemy",
    "Event.js": "event",
    "Investigator.js": "investigator",
    "InvestigatorStory.js": "investigator",
    "Key.js": "key",
    "Location.js": "location",
    "LocationLocation.js": "location",
    "Scenario.js": "scenario",
    "Skill.js": "skill",
    "StoryAsset.js": "story",
    "StoryChaos.js": "story",
    "StoryEnemy.js": "story",
    "StoryLocation.js": "story",
    "StoryStory.js": "story",
    "StoryTreachery.js": "story",
    "Treachery.js": "treachery",
    "TreacheryLocation.js": "treachery",
    "TreacheryPortrait.js": "treachery",
    "TreacheryStory.js": "treachery",
    "Ultimatum.js": "ultimatum",
    "WeaknessEnemy.js": "enemy",
    "WeaknessTreachery.js": "treachery",
    "MiniInvestigator.js": "mini",
};

const back_types = {
    "Act.js": "act_back",
    "ActAssetStory.js": "asset",
    "ActEnemy.js": "enemy",
    "ActLocation.js": "location",
    "ActPortrait.js": "act_back",
    "Agenda.js": "agenda_back",
    "AgendaAssetStory.js": "asset",
    "AgendaEnemy.js": "enemy",
    "AgendaFrontPortrait.js": "agenda_back",
    "AgendaLocation.js": "location",
    "AgendaPortrait.js": "agenda_back",
    "AgendaTreachery.js": "treachery",
    "Asset.js": "player",
    "AssetAsset.js": "asset",
    "AssetStory.js": "story",
    "AssetStoryAsset.js": "asset",
    "AssetStoryEnemy.js": "enemy",
    "AssetStoryPortrait.js": "story",
    "Chaos.js": "chaos",
    "Concealed.js": "concealed_back",
    "Customizable.js": "customizable_back",
    "Enemy.js": "encounter",
    "EnemyEnemy.js": "enemy",
    "EnemyLocation.js": "location_back",
    "EnemyPortrait.js": "encounter",
    "Event.js": "player",
    "Investigator.js": "investigator_back",
    "InvestigatorStory.js": "investigator_back",
    "Key.js": "key_back",
    "Location.js": "location_back",
    "LocationLocation.js": "location",
    "Scenario.js": "scenario_back",
    "Skill.js": "player",
    "StoryAsset.js": "asset",
    "StoryChaos.js": "chaos",
    "StoryEnemy.js": "enemy",
    "StoryLocation.js": "location",
    "StoryStory.js": "story",
    "StoryTreachery.js": "treachery",
    "Treachery.js": "encounter",
    "TreacheryLocation.js": "location",
    "TreacheryPortrait.js": "encounter",
    "TreacheryStory.js": "story",
    "Ultimatum.js": "ultimatum_back",
    "WeaknessEnemy.js": "player",
    "WeaknessTreachery.js": "player",
    "MiniInvestigator.js": "mini_back",
};

const PORTRAITS = {
    "Act.js": ["Portrait-Front", "Collection-Both", "Encounter-Both"],
    "ActAssetStory.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "ActEnemy.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "ActLocation.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "ActPortrait.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Front",
        "Encounter-Front",
    ],
    "Agenda.js": ["Portrait-Front", "Collection-Both", "Encounter-Both"],
    "AgendaAssetStory.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "AgendaEnemy.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "AgendaFrontPortrait.js": [
        "Portrait-Front",
        "Collection-Both",
        "Encounter-Both",
    ],
    "AgendaLocation.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "AgendaPortrait.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Front",
        "Encounter-Front",
    ],
    "AgendaTreachery.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "Asset.js": ["Portrait-Front", "Collection-Front"],
    "AssetAsset.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Front",
    ],
    "AssetStory.js": ["Portrait-Front", "Collection-Front", "Encounter-Front"],
    "AssetStoryAsset.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Front",
        "Encounter-Front",
    ],
    "AssetStoryEnemy.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "AssetStoryPortrait.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Front",
        "Encounter-Front",
    ],
    "BoxCover.js": ["Portrait-Front", "PortraitBottom-Front"],
    "Chaos.js": ["Collection-Both", "Encounter-Both"],
    "Concealed.js": ["Portrait-Front"],
    "Customizable.js": ["Collection-Front"],
    "Divider.js": ["Encounter-Both"],
    "Enemy.js": ["Portrait-Front", "Collection-Front", "Encounter-Front"],
    "EnemyEnemy.js": [
        "Portrait-Both",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "EnemyLocation.js": [
        "Portrait-Both",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "EnemyPortrait.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Front",
        "Encounter-Front",
    ],
    "Event.js": ["Portrait-Front", "Collection-Front", "Encounter-Both"],
    "Guide75.js": ["Portrait1-Front", "Portrait2-Front"],
    "GuideA4.js": ["Portrait1-Front", "Portrait2-Front"],
    "GuideLetter.js": ["Portrait1-Front", "Portrait2-Front"],
    "Investigator.js": [
        "TransparentPortrait-Both",
        "Portrait-Back",
        "Collection-Front",
    ],
    "InvestigatorStory.js": [
        "TransparentPortrait-Both",
        "Portrait-Back",
        "Collection-Front",
        "Encounter-Both",
    ],
    "Key.js": [
        "Portrait-Both",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "Location.js": [
        "Portrait-Both",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "LocationLocation.js": [
        "Portrait-Both",
        "BackPortrait-Back",
        "Collection-Both",
        "Encounter-Both",
    ],
    "MiniInvestigator.js": ["Portrait-Both"],
    "PackCover.js": ["Portrait-Front"],
    "Scenario.js": [
        "Portrait",
        "BackPortrait",
        "Collection-Both",
        "Encounter-Both",
    ],
    "Skill.js": ["Portrait-Front", "Collection-Front", "Encounter-Both"],
    "StoryAsset.js": ["BackPortrait-Back", "Collection-Back", "Encounter-Both"],
    "StoryChaos.js": ["Collection-Back", "Encounter-Both"],
    "StoryEnemy.js": ["BackPortrait-Back", "Collection-Back", "Encounter-Both"],
    "StoryLocation.js": [
        "BackPortrait-Back",
        "Collection-Back",
        "Encounter-Both",
    ],
    "StoryStory.js": ["Collection-Both", "Encounter-Both"],
    "StoryTreachery.js": [
        "BackPortrait-Back",
        "Collection-Back",
        "Encounter-Both",
    ],
    "Treachery.js": ["Portrait-Front", "Collection-Front", "Encounter-Front"],
    "TreacheryLocation.js": [
        "Portrait-Front",
        "Collection-Front",
        "Encounter-Front",
    ],
    "TreacheryPortrait.js": [
        "Portrait-Front",
        "BackPortrait-Back",
        "Collection-Front",
        "Encounter-Front",
    ],
    "TreacheryStory.js": [
        "Portrait-Front",
        "Collection-Both",
        "Encounter-Both",
    ],
    "Ultimatum.js": ["Portrait", "Collection", "Encounter"],
    "WeaknessEnemy.js": [
        "Portrait-Front",
        "Collection-Front",
        "Encounter-Front",
    ],
    "WeaknessTreachery.js": [
        "Portrait-Front",
        "Collection-Front",
        "Encounter-Front",
    ],
};

function translate_text(value) {
    if (!value) return value;
    value = String(value);
    value = value.replace(/^\n/, "");  // remove empty first lines
    value = value.replace(/<fullname>/g, "<name>");
    value = value.replace(/<act>/g, "<action>");
    value = value.replace(/<acts>/g, "<action>");
    value = value.replace(/<fre>/g, "<free>");
    value = value.replace(/<rea>/g, "<reaction>");
    value = value.replace(/<wil>/g, "<willpower>");
    value = value.replace(/<int>/g, "<intellect>");
    value = value.replace(/<agi>/g, "<agility>");
    value = value.replace(/<com>/g, "<combat>");
    value = value.replace(/<rog>/g, "<rogue>");
    value = value.replace(/<see>/g, "<seeker>");
    value = value.replace(/<sur>/g, "<survivor>");
    value = value.replace(/<gua>/g, "<guardian>");
    value = value.replace(/<mys>/g, "<mystic>");
    value = value.replace(/<sku>/g, "<skull>");
    value = value.replace(/<cul>/g, "<cultist>");
    value = value.replace(/<tab>/g, "<tablet>");
    value = value.replace(/<mon>/g, "<elder_thing>");
    value = value.replace(/<eld>/g, "<elder_sign>");
    value = value.replace(/<ten>/g, "<fail>");
    value = value.replace(/<ble>/g, "<blessing>");
    value = value.replace(/<cur>/g, "<curse>");
    value = value.replace(/<spa>/g, "<spawn>");
    value = value.replace(/<bul>/g, "<bullet>");
    value = value.replace(/<bultab>/g, "");
    value = value.replace(/<vs>\n/g, "");
    value = value.replace(/<svs>\n/g, "");
    value = value.replace(/<lvs>\n/g, "");
    value = value.replace(/<hs>\n/g, "");
    value = value.replace(/<shs>\n/g, "");
    value = value.replace(/<lhs>\n/g, "");
    value = value.replace(/\n\n/g, "\n");
    return value;
}

function get_portraits(card) {
    let script_parts = card.getClassName().split("/");
    let script_name = script_parts[script_parts.length - 1];
    let bindings = PORTRAITS[script_name];
    if (!bindings) return null;
    let output = {};
    for (let i = 0; i < bindings.length; i++) {
        output[bindings[i]] = card.getPortrait(i);
    }
    return output;
}

function extract_images(card, collection, image_folder) {
    let script_parts = card.getClassName().split("/");
    let script_name = script_parts[script_parts.length - 1];
    let bindings = PORTRAITS[script_name];
    if (!bindings) return;
    for (let i = 0; i < bindings.length; i++) {
        let portrait = card.getPortrait(i);
        let source = String(portrait.getSource());
        if (source in collection.images) continue;
        collection.images[source] = "";

        let parts = source.replace(/\\/g, "/").split("/");
        let portrait_name = parts[parts.length - 1];
        let format_parts = portrait_name.split(".");
        let portrait_format = format_parts[format_parts.length - 1];

        let new_path = new File(image_folder, portrait_name);
        let counter = 0;
        while (new_path.exists()) {
            new_path = new File(image_folder, counter + "_" + portrait_name);
            counter++;
            if (counter > 35) {
                println(
                    "ERROR: " +
                        card.getName() +
                        " failed to find suitable name for image " +
                        portrait_name,
                );
                break;
            }
        }
        collection.images[source] = "./images/" + new_path.getName();
        ImageIO.write(
            portrait.getImage(),
            portrait_format,
            new File(String(new_path)),
        );
    }
}

function determine_encounter_set(card) {
    let portraits = get_portraits(card);
    if (!portraits) return { name: null, icon: null };
    let titles = ["Encounter-Both", "Encounter-Front", "Encounter-Back"];
    for (let title of titles) {
        if (!(title in portraits)) continue;
        let source_raw = portraits[title].getSource();
        if (source_raw == null) continue;
        let source = String(source_raw);
        let parts = source.replace(/\\/g, "/").split("/");
        let name = parts[parts.length - 1];
        return { name: name, icon: source };
    }
    return { name: null, icon: null };
}

function has_value(val){
    if (val == null || val == "" || val == "None"){
        return false;
    }
    return val;
}

function convert_card(path, collection, image_folder) {
    let card = ResourceKit.getGameComponentFromFile(new File(path), false);
    if (!card) {
        println("ERROR: " + path + " appears to have issues loading.");
        return;
    }
    let script_parts = card.getClassName().split("/");
    let script_name = script_parts[script_parts.length - 1];
    if (!(script_name in front_types) && !(script_name in back_types)) {
        return;
    }
    let settings = card.getSettings();
    let out = {};

    println("processing " + path);

    extract_images(card, collection, image_folder);

    // name
    if (card.getFullName() != "") {
        out["name"] = card.getFullName();
    } else {
        let file_parts = path.replace("\\", "/").split("/");
        out["name"] = file_parts[file_parts.length - 1];
    }

    // front/back types
    out["front"] = {
        type: front_types[script_name],
    };
    out["back"] = {
        type: back_types[script_name],
    };

    // unique
    if (has_value(settings.get("Unique")) && settings.get("Unique") != "0") {
        out["front"]["title"] = "<unique><name>";
    }

    // subtitle
    if (has_value(settings.get("Subtitle"))) {
        out["front"]["subtitle"] = settings.get("Subtitle");
    }

    // traits
    if (settings.get("Traits")) {
        out["front"]["traits"] = settings.get("Traits");
    }

    // text (keywords + rules)
    if (has_value(settings.get("Rules")) && has_value(settings.get("Keywords"))) {
        out["front"]["text"] = settings.get("Keywords") + "\n" + settings.get("Rules");
    } else if (has_value(settings.get("Rules")) || has_value(settings.get("Keywords"))) {
        out["front"]["text"] = has_value(settings.get("Keywords")) || has_value(settings.get("Rules"));
    }

    // cost / level / slot
    if (settings.get("ResourceCost") != null)
        out["front"]["cost"] = String(settings.get("ResourceCost").replace("-", "<dash>"));
    if (settings.get("Level") != null)
        out["front"]["level"] = String(settings.get("Level"));
    if (has_value(settings.get("Slot"))) {
        let slots = [String(settings.get("Slot"))];
        if (has_value(settings.get("Slot2"))) {
            slots.push(String(settings.get("Slot2")))
        };
        out["front"]["slot"] = slots.join(", ");
    }

    // health / sanity / evade / combat
    let health = has_value(settings.get("Health")) || has_value(settings.get("Stamina"));
    if (health) {
        out["front"]["health"] =
            String(health) + ((settings.get("PerInvestigator") == "1" || settings.get("PerInvestigatorStamina") == "1") ? "<per>" : "");
    }
    if (has_value(settings.get("Sanity"))) {
        out["front"]["sanity"] = String(settings.get("Sanity")).replace("-", "<dash>") +
            (settings.get("PerInvestigatorSanity") == "1" ? "<per>" : "");
    }
    if (has_value(settings.get("Evade"))) {
        out["front"]["evade"] = String(settings.get("Evade")).replace("-", "<dash>") +
            (settings.get("PerInvestigatorEvade") == "1" ? "<per>" : "");
    }
    if (has_value(settings.get("Attack"))) {
        out["front"]["combat"] = String(settings.get("Attack")).replace("-", "<dash>") +
            (settings.get("PerInvestigatorAttack") == "1" ? "<per>" : "");
    }

    // damage / horror
    if (has_value(settings.get("Damage")))
        out["front"]["damage"] = parseInt(settings.get("Damage"));
    if (has_value(settings.get("Horror")))
        out["front"]["horror"] = parseInt(settings.get("Horror"));

    // flavor text
    let flavor =
        settings.get("AgendaStory") ||
        settings.get("ActStory") ||
        settings.get("Flavor");
    if (flavor) {
        out["front"]["flavor_text"] = flavor;
    }

    // victory
    if (has_value(settings.get("Victory"))) {
        out["front"]["victory"] = settings.get("Victory");
    }
    // victory
    if (has_value(settings.get("VictoryBack"))) {
        out["back"]["victory"] = settings.get("VictoryBack");
    }

    // classes
    if (has_value(settings.get("CardClass"))) {
        out["front"]["classes"] = [];
        let class_keys = ["CardClass", "CardClass2", "CardClass3"];
        for (let key of class_keys) {
            let cl = has_value(settings.get(key));
            if (cl) {
                out["front"]["classes"].push(String(cl).toLowerCase());
            }
        }
    }
    
    // subtype (for weakness cards)
    if (has_value(settings.get("Subtype"))){
        out["front"]["classes"] = out["front"]["classes"] || [];
        out["front"]["classes"].push(String(settings.get("Subtype")).toLowerCase().replace("basicweakness", "basic weakness"));
    }

    // skill icons (Skill1-Skill6, values: Willpower/Intellect/Combat/Agility/Wild/None)
    let skill_icon_map = {
        "Willpower": "W",
        "Intellect": "I",
        "Combat": "C",
        "Agility": "A",
        "Wild": "Q",
    };
    let icons = "";
    for (let i = 1; i <= 6; i++) {
        let skill = has_value(settings.get("Skill" + i));
        if (skill && skill_icon_map[String(skill)]) {
            icons += skill_icon_map[String(skill)];
        }
    }
    if (icons) {
        out["front"]["icons"] = icons;
    }

    // illustrations from portraits
    let illustrations = get_portraits(card);
    if (illustrations) {
        for (let name in illustrations) {
            let portrait = illustrations[name];
            if (
                name === "Portrait-Front" ||
                name === "Portrait-Both" ||
                name === "TransparentPortrait-Both"
            ) {
                out["front"]["illustration"] =
                    collection.images[String(portrait.getSource())];
            }
            if (
                name === "Portrait-Back" ||
                name === "Portrait-Both" ||
                name === "BackPortrait-Back" ||
                name === "TransparentPortrait-Both"
            ) {
                if (portrait.getSource() != null) {
                    out["back"]["illustration"] =
                        collection.images[String(portrait.getSource())];
                }
            }
        }
    }

    // clues
    if (has_value(settings.get("Clues"))) {
        out["front"]["clues"] =
            settings.get("Clues").replace("-", "<dash>") +
            (settings.get("PerInvestigator", "") != "" ? "<per>" : "");
    }

    // shroud
    if (has_value(settings.get("Shroud"))) {
        out["front"]["shroud"] =
            settings.get("Shroud", "").replace("-", "<dash>") +
            (settings.get("ShroudPerInvestigator", "") != "" ? "<per>" : "");
    }

    // doom
    if (has_value(settings.get("Doom"))) {
        out["front"]["doom"] =
            settings.get("Doom").replace("-", "<dash>") +
            (settings.get("PerInvestigator", "") != "" ? "<per>" : "");
    }

    // scenario index
    if (has_value(settings.get("ScenarioIndex"))) {
        out["front"]["index"] =
            settings.get("ScenarioIndex") + settings.get("ScenarioDeckID");
    }

    // location icon
    if (has_value(settings.get("LocationIcon"))) {
        out["front"]["connection"] = String(
            settings.get("LocationIcon"),
        ).toLowerCase();
    }

    // connections
    if (has_value(settings.get("Connection1Icon"))) {
        let connections = [];
        for (let i = 1; i <= 6; i++) {
            let c = has_value(settings.get("Connection" + i + "Icon"));
            if (c) {
                connections.push(String(c).toLowerCase());
            }
        }
        out["front"]["connections"] = connections;
    }

    // encounter / collection numbers
    if (has_value(settings.get("EncounterNumber"))) {
        out["encounter_number"] = settings.get("EncounterNumber");
    }
    if (has_value(settings.get("CollectionNumber"))) {
        out["project_number"] = settings.get("CollectionNumber");
    }

    // artist
    if (has_value(settings.get("Artist"))) {
        out["front"]["illustrator"] = "Illus. " + String(settings.get("Artist"));
    }
    if (has_value(settings.get("ArtistBack"))) {
        out["back"]["illustrator"] = "Illus. " + String(settings.get("ArtistBack"));
    }

    // back side fields
    if (has_value(settings.get("TitleBack"))) {
        out["back"]["name"] = String(settings.get("TitleBack"));
    }
    if (has_value(settings.get("SubtitleBack"))) {
        out["back"]["subtitle"] = String(settings.get("SubtitleBack"));
    }
    if (has_value(settings.get("TraitsBack"))) {
        out["back"]["traits"] = settings.get("TraitsBack");
    }
    if (has_value(settings.get("RulesBack")) && settings.get("KeywordsBack")) {
        out["back"]["text"] =
            String(settings.get("KeywordsBack")) +
            "\n" +
            String(settings.get("RulesBack"));
    } else if (has_value(settings.get("RulesBack")) || settings.get("KeywordsBack")) {
        out["back"]["text"] =
            settings.get("KeywordsBack") || settings.get("RulesBack");
    }
    if (has_value(settings.get("FlavorBack"))) {
        out["back"]["flavor_text"] = settings.get("FlavorBack");
    }
    if (has_value(settings.get("VictoryBack"))) {
        out["back"]["victory"] = settings.get("VictoryBack");
    }
    if (has_value(settings.get("ShroudBack"))) {
        out["back"]["shroud"] =
            settings.get("ShroudBack", "").replace("-", "<dash>") +
            (settings.get("ShroudPerInvestigatorBack", "") != "" ? "<per>" : "");
    }
    if (has_value(settings.get("CluesBack"))) {
        out["back"]["clues"] =
            settings.get("CluesBack").replace("-", "<dash>") +
            (settings.get("PerInvestigatorBack", "") != "" ? "<per>" : "");
    }

    // back location icon
    let backLocIcon = has_value(settings.get("LocationIconBack"));
    if (backLocIcon) {
        if (String(backLocIcon) === "Copy front") {
            out["back"]["connection"] = "<copy>";
        } else if (String(backLocIcon) !== "None") {
            out["back"]["connection"] = String(backLocIcon).toLowerCase();
        }
    }

    // back connections
    if (has_value(settings.get("Connection1IconBack"))) {
        let all_copy = true;
        let back_connections = [];
        for (let i = 1; i <= 6; i++) {
            let c = has_value(settings.get("Connection" + i + "IconBack"));
            if (String(c) === "Copy front") {
                continue;
            }
            all_copy = false;
            if (c) {
                back_connections.push(String(c).toLowerCase());
            }
        }
        if (all_copy) {
            out["back"]["connections"] = "<copy>";
        } else {
            out["back"]["connections"] = back_connections;
        }
    }

    // back skill icons
    let back_icons = "";
    for (let i = 1; i <= 6; i++) {
        let skill = has_value(settings.get("Skill" + i + "Back"));
        if (skill && skill_icon_map[String(skill)]) {
            back_icons += skill_icon_map[String(skill)];
        }
    }
    if (back_icons != "") {
        out["back"]["icons"] = back_icons;
    }

    // back unique
    if (settings.get("UniqueBack") == "1")  {
        out["back"]["title"] = "<unique><name>";
    }

    // back enemy stats
    let health_back = has_value(settings.get("HealthBack")) || has_value(settings.get("StaminaBack"));
    if (health_back)
        out["back"]["health"] =
            String(health_back) +
            (settings.get("PerInvestigatorBack") != "" ? "<per>" : "");
    if (has_value(settings.get("SanityBack"))){
        out["back"]["sanity"] = settings.get("SanityBack");
    }
    if (settings.get("AttackBack"))
        out["back"]["combat"] =
            String(settings.get("AttackBack")) +
            (settings.get("PerInvestigatorAttackBack") ? "<per>" : "");
    if (settings.get("EvadeBack"))
        out["back"]["evade"] =
            String(settings.get("EvadeBack")) +
            (settings.get("PerInvestigatorEvadeBack") ? "<per>" : "");
    if (settings.get("DamageBack"))
        out["back"]["damage"] = parseInt(settings.get("DamageBack"));
    if (settings.get("HorrorBack"))
        out["back"]["horror"] = parseInt(settings.get("HorrorBack"));

    // back asset stats
    if (settings.get("ResourceCostBack"))
        out["back"]["cost"] = String(settings.get("ResourceCostBack"));
    if (settings.get("CardClassBack")) {
        out["back"]["classes"] = [
            String(settings.get("CardClassBack")).toLowerCase(),
        ];
    }
    if (settings.get("SlotBack")) {
        out["back"]["slot"] = String(settings.get("SlotBack"));
    }

    // structured act/agenda back text (HeaderA/B/C + AccentedStoryA/B/C + RulesA/B/C)
    if (
        settings.get("HeaderABack") ||
        settings.get("AccentedStoryABack") ||
        settings.get("RulesABack")
    ) {
        let parts = [];
        let sections = ["A", "B", "C"];
        for (let s of sections) {
            let header = settings.get("Header" + s + "Back");
            let story = settings.get("AccentedStory" + s + "Back");
            let rules = settings.get("Rules" + s + "Back");
            if (header) parts.push(String(header));
            if (story) parts.push(String(story));
            if (rules) parts.push(String(rules));
        }
        if (parts.length > 0) {
            out["back"]["text"] = parts.join("\n");
        }
    }

    // chaos card entries
    if (front_types[script_name] === "chaos") {
        let token_map = {
            Skull: "skull",
            Cultist: "cultist",
            Tablet: "tablet",
            ElderThing: "elder_thing",
        };
        let merge_keys = {
            Skull: "MergeSkull",
            Cultist: "MergeCultist",
            Tablet: "MergeTablet",
        };

        // front entries
        let front_entries = [];
        for (let token_name in token_map) {
            let text = settings.get(token_name);
            if (text != "") {
                let token = token_map[token_name];
                let merge_key = merge_keys[token_name];
                if (merge_key) {
                    let merge_val = settings.get(merge_key);
                    if (merge_val && String(merge_val) !== "None") {
                        token = token + "," + token_map[String(merge_val)];
                    }
                }
                front_entries.push({ token: token, text: String(text) });
            }
        }
        out["front"]["entries"] = front_entries;

        // back entries
        let back_entries = [];
        for (let token_name in token_map) {
            let text = settings.get(token_name + "Back");
            if (text != "") {
                let token = token_map[token_name];
                let merge_key = merge_keys[token_name];
                if (merge_key) {
                    let merge_val = settings.get(merge_key + "Back");
                    if (merge_val && String(merge_val) !== "None") {
                        token = token + "," + token_map[String(merge_val)];
                    }
                }
                back_entries.push({ token: token, text: String(text) });
            }
        }
        out["back"]["entries"] = back_entries;
        out["back"]["difficulty"] = "Hard/Expert";
    }

    // encounter set
    let encounter = determine_encounter_set(card);
    if (encounter.name) {
        if (!collection.encounter_sets[encounter.name]) {
            collection.encounter_sets[encounter.name] = {
                name: encounter.name,
                icon: encounter.icon,
                id: java.util.UUID.randomUUID().toString(),
                card_amount: 0,
            };
        }
        out["encounter_set"] = collection.encounter_sets[encounter.name].id;
        collection.encounter_sets[encounter.name].card_amount += 1;
    }

    // translate text fields to shoggoth syntax
    let sides = [out["front"], out["back"]];
    for (let side of sides) {
        if (side["text"]) side["text"] = translate_text(side["text"]);
        if (side["flavor_text"])
            side["flavor_text"] = translate_text(side["flavor_text"]);
        if (side["entries"]) {
            for (let entry of side["entries"]) {
                entry.text = translate_text(entry.text);
            }
        }
    }

    collection.cards.push(out);
}

function process(progress) {
    let cards = [];
    Files.walk(Paths.get(PROJECT.getFile().getPath())).forEach(function (card) {
        let path = card.toString();
        if (
            path.slice(-4) === ".eon" &&
            card.getFileName().toString() !== "deck.eon"
        ) {
            cards.push(path);
            println(card);
        }
    });
    println("Processing " + cards.length + " cards");

    let collection = {
        name: PROJECT.getFile().getName(),
        encounter_sets: {},
        cards: [],
        images: {},
    };

    let step = 0;
    for (let path of cards) {
        convert_card(path, collection, IMAGE_FOLDER);
    }

    println("Done processing cards. Post processing begins...");
    // let cards = [];
    // Files.walk(Paths.get(PROJECT.getFile().getPath())).forEach(function (card) {
    //     let path = card.toString();
    //     if (
    //         path.slice(-4) === ".eon" &&
    //         card.getFileName().toString() !== "deck.eon"
    //     ) {
    //         cards.push(path);
    //         println(card);
    //     }
    // });
    // println("Processing " + cards.length + " cards");

    // let collection = {
    //     name: PROJECT.getFile().getName(),
    //     encounter_sets: {},
    //     cards: [],
    //     images: {},
    // };

    // let step = 0;
    // while (step < cards.length) {
    //     let threads = [];
    //     let batch = cards.slice(step, step + 25);
    //     for (let path of batch) {
    //         let t = new java.lang.Thread(function () {
    //             convert_card(path, collection, IMAGE_FOLDER);
    //         });
    //         t.start();
    //         threads.push(t);
    //     }
    //     for (let t of threads) {
    //         t.join();
    //     }
    //     step += 25;
    // }

    // println("Done processing cards. Post processing begins...");

    // convert encounter_sets from dict to array, resolve icon paths
    let encounter_set_list = [];
    for (let key in collection.encounter_sets) {
        let es = collection.encounter_sets[key];
        if (collection.images[es.icon]) {
            es.icon = collection.images[es.icon];
        }
        encounter_set_list.push(es);
    }
    collection.encounter_sets = encounter_set_list;
    delete collection.images;

    OUTPUT_FILE.createNewFile();
    let writer = new FileWriter(OUTPUT_FILE);
    writer.write(JSON.stringify(collection, null, 4));
    writer.close();
    println("Done writing to " + String(OUTPUT_FILE));
}

Thread.busyWindow(process, "Building...", true);
