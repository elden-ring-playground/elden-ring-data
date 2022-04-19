const fs = require('fs');

var npcIds = {};

// combine msg/engus/item/*.fmg.json
var itemMessages = {
    "Place": {},
    "Npc": {},
    "Weapon": {},
    "Protector": {}, // armor
    "Accessory": {}, // talismans
    "Goods": {}, // items
    "Magic": {},
    "Gems": {}, // Ashes of War as items
    "Arts": {}, // Ashes of War as applied
};

// combine msg/engus/menu/*.fmg.json
var menuMessages = {
    "Tutorial": {}, // TutorialTitle, TutorialBody
    "Loading": {}, // LoadingTitle, LoadingText
    "TalkMsg": {}, // TalkMsg
    "EventTextForMap": {}, // EventTextForMap
    "EventTextForTalk": {}, // EventTextForTalk
    // TODO: Others...
};

//// ITEM MESSAGES: msg/engus/item/*.fmg.json

var dictionary = {};

let addToDictionary = function(dictionary, name, type, id) {
    if (!dictionary[name]) {
        dictionary[name] = [];
    }
    dictionary[name].push(type + "/" + id);
}

const placeNameData = JSON.parse(fs.readFileSync('../msg/engus/item/PlaceName.fmg.json', 'utf8'));
for (let id of Object.keys(placeNameData)) {
    itemMessages["Place"][id] = {
        "name": placeNameData[id]
    };
    addToDictionary(dictionary, placeNameData[id], "Place", id);
}

const npcNameData = JSON.parse(fs.readFileSync('../msg/engus/item/NpcName.fmg.json', 'utf8'));
for (let id of Object.keys(npcNameData)) {
    let npcName = npcNameData[id];
    if (npcName != null && npcName != "null") {
        let superId = null;
        if (id.length < 7) {
            superId = id.substring(id.length - 5, id.length - 2);
        } else {
            superId = id.substring(id.length - 7, id.length - 2);
        }
        if (itemMessages["Npc"][superId] == undefined) {
            itemMessages["Npc"][superId] = [];
        }
        itemMessages["Npc"][superId].push(npcName);
        addToDictionary(dictionary, npcName, "Npc", id);
    }
}

const weaponNameData = JSON.parse(fs.readFileSync('../msg/engus/item/WeaponName.fmg.json', 'utf8'));
const weaponInfoData = JSON.parse(fs.readFileSync('../msg/engus/item/WeaponInfo.fmg.json', 'utf8'));
const weaponCaptionData = JSON.parse(fs.readFileSync('../msg/engus/item/WeaponCaption.fmg.json', 'utf8'));
const weaponEffectData = JSON.parse(fs.readFileSync('../msg/engus/item/WeaponEffect.fmg.json', 'utf8'));
for (let id of Object.keys(weaponNameData)) {
    itemMessages["Weapon"][id] = {
        "name": weaponNameData[id],
        "info": weaponInfoData[id],
        "caption": weaponCaptionData[id],
        "effect": weaponEffectData[id]
    };
    addToDictionary(dictionary, weaponNameData[id], "Weapon", id);
}

const protectorNameData = JSON.parse(fs.readFileSync('../msg/engus/item/ProtectorName.fmg.json', 'utf8'));
const protectorInfoData = JSON.parse(fs.readFileSync('../msg/engus/item/ProtectorInfo.fmg.json', 'utf8'));
const protectorCaptionData = JSON.parse(fs.readFileSync('../msg/engus/item/ProtectorCaption.fmg.json', 'utf8'));
for (let id of Object.keys(protectorNameData)) {
    itemMessages["Protector"][id] = {
        "name": protectorNameData[id],
        "info": protectorInfoData[id],
        "caption": protectorCaptionData[id]
    };
    addToDictionary(dictionary, protectorNameData[id], "Protector", id);
}

const accessoryNameData = JSON.parse(fs.readFileSync('../msg/engus/item/AccessoryName.fmg.json', 'utf8'));
const accessoryInfoData = JSON.parse(fs.readFileSync('../msg/engus/item/AccessoryInfo.fmg.json', 'utf8'));
const accessoryCaptionData = JSON.parse(fs.readFileSync('../msg/engus/item/AccessoryCaption.fmg.json', 'utf8'));
for (let id of Object.keys(accessoryNameData)) {
    itemMessages["Accessory"][id] = {
        "name": accessoryNameData[id],
        "info": accessoryInfoData[id],
        "caption": accessoryCaptionData[id]
    };
    addToDictionary(dictionary, accessoryNameData[id], "Accessory", id);
}

const goodsNameData = JSON.parse(fs.readFileSync('../msg/engus/item/GoodsName.fmg.json', 'utf8'));
const goodsInfoData = JSON.parse(fs.readFileSync('../msg/engus/item/GoodsInfo.fmg.json', 'utf8'));
//const goodsInfo2Data = JSON.parse(fs.readFileSync('../msg/engus/item/GoodsInfo2.fmg.json', 'utf8'));
const goodsCaptionData = JSON.parse(fs.readFileSync('../msg/engus/item/GoodsCaption.fmg.json', 'utf8'));
//const goodsDialogData = JSON.parse(fs.readFileSync('../msg/engus/item/GoodsDialog.fmg.json', 'utf8'));
for (let id of Object.keys(goodsNameData)) {
    itemMessages["Goods"][id] = {
        "name": goodsNameData[id],
        "info": goodsInfoData[id],
        //"info2": goodsInfo2Data[id], // TODO: partial id match
        "caption": goodsCaptionData[id],
        //"dialog": goodsDialogData[id] // TODO: id mismatch, perhaps separate
    };
    addToDictionary(dictionary, goodsNameData[id], "Goods", id);
}

/*
// TODO: all the Magic data seems broken
const magicNameData = JSON.parse(fs.readFileSync('../msg/engus/item/MagicName.fmg.json', 'utf8'));
const magicInfoData = JSON.parse(fs.readFileSync('../msg/engus/item/MagicInfo.fmg.json', 'utf8'));
const magicCaptionData = JSON.parse(fs.readFileSync('../msg/engus/item/MagicCaption.fmg.json', 'utf8'));
for (let id of Object.keys(magicNameData)) {
    itemMessages["Magic"][id] = {
        "name": magicNameData[id],
        "info": magicInfoData[id],
        "caption": magicCaptionData[id]
    };
}
// TODO: Gems and Arts ("Ashes of War (Unapplied)" and "Ashes of War (Applied)")
*/


//// MENU MESSAGES: msg/engus/menu/*.fmg.json

const tutorialTitleData = JSON.parse(fs.readFileSync('../msg/engus/menu/TutorialTitle.fmg.json', 'utf8'));
const tutorialBodyData = JSON.parse(fs.readFileSync('../msg/engus/menu/TutorialBody.fmg.json', 'utf8'));
for (let id of Object.keys(tutorialTitleData)) {
    menuMessages["Tutorial"][id] = {
        "title": tutorialTitleData[id],
        "body": tutorialBodyData[id]
    };
}

const loadingTitleData = JSON.parse(fs.readFileSync('../msg/engus/menu/LoadingTitle.fmg.json', 'utf8'));
const loadingBodyData = JSON.parse(fs.readFileSync('../msg/engus/menu/LoadingText.fmg.json', 'utf8'));
for (let id of Object.keys(loadingTitleData)) {
    menuMessages["Loading"][id] = {
        "title": loadingTitleData[id],
        "body": loadingBodyData[id]
    };
}

const talkMsgData = JSON.parse(fs.readFileSync('../msg/engus/menu/TalkMsg.fmg.json', 'utf8'));
for (let id of Object.keys(talkMsgData)) {
    if (talkMsgData[id] != null) {
        let npcId = "000";
        if (id.length > 6) {
            npcId = id.substring(0, id.length - 6).padStart(3, "0");
        }
        let conversationId = id.substring(id.length - 6, id.length - 3).padStart(3, "0");
        let lineId = id.substring(id.length - 3).padStart(3, "0");
        if (menuMessages["TalkMsg"][npcId] == undefined) {
            menuMessages["TalkMsg"][npcId] = {};
        }
        if (menuMessages["TalkMsg"][npcId][conversationId] == undefined) {
            menuMessages["TalkMsg"][npcId][conversationId] = {};
        }
        menuMessages["TalkMsg"][npcId][conversationId][lineId] = talkMsgData[id];
    }
}

const eventTextForMapData = JSON.parse(fs.readFileSync('../msg/engus/menu/EventTextForMap.fmg.json', 'utf8'));
for (let id of Object.keys(eventTextForMapData)) {
    menuMessages["EventTextForMap"][id] = eventTextForMapData[id];
}

const eventTextForTalkData = JSON.parse(fs.readFileSync('../msg/engus/menu/EventTextForTalk.fmg.json', 'utf8'));
for (let id of Object.keys(eventTextForTalkData)) {
    menuMessages["EventTextForTalk"][id] = eventTextForTalkData[id];
}

// TODO: GR_Dialogues, GR_KeyGuide, etc.

// Remove dictionary mapping from "null" to all the null objects
dictionary["null"] = undefined;

// NOTE: When cleaning, try to keep original separate from extensions/cleaned
// WILL-NOT-DO: Remove nulls from messages - do not do this until relatinoships and UI design is solid
// TODO: Clean dictionary: add aliases like "Ranni" = "Ranni the Witch"
// TODO: Add Japanese
// TODO: Clean data: remove duplicates and near-duplicates like "+1"
// TODO: Add other languages besides English and Japanese

fs.writeFileSync('./dictionary.json', JSON.stringify(dictionary, null, 2), 'utf8')
fs.writeFileSync('./msg-item.json', JSON.stringify(itemMessages, null, 2), 'utf8')
fs.writeFileSync('./msg-menu.json', JSON.stringify(menuMessages, null, 2), 'utf8')
