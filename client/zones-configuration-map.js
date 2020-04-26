// Modifications copyright (C) Flole
/*global ons, fn*/
import {VacuumMap} from "./zone/js-modules/vacuum-map.js";

let map;
let loadingBarSaveZones;
let saveButton;
let renameButton;
let renameDialog;
let renameZoneInput;

let topPage;
/** @type {Array<{id:number, name:string, user: boolean, areas: Array}>} */
let zonesConfig;
let zoneToModify;

function zoneMapInit() {
    map = new VacuumMap(document.getElementById("zone-configuration-map"));
    loadingBarSaveZones = document.getElementById("loading-bar-save-zones");
    saveButton = document.getElementById("zones-configuration-save");
    renameButton = document.getElementById("zones-configuration-rename");
    renameDialog = document.getElementById("rename-zone-dialog");
    renameZoneInput = document.getElementById("rename-zone-input");

    topPage = fn.getTopPage();
    zonesConfig = topPage.data.zonesConfig;
    zoneToModify = topPage.data.zoneToModify;
    map.initCanvas(topPage.data.map, {metaData: "forbidden", noGotoPoints: true});

    updateZoneName();
    for (let zone of zonesConfig[zoneToModify].areas) {
        map.addZone([zone[0], zone[1], zone[2], zone[3]], true);
    }

    document.getElementById("zones-configuration-add-zone").onclick = () => {
        map.addZone();
    };

    saveButton.onclick = () => {
        saveZone(true);
    };

    renameButton.onclick = () => {
        renameZoneInput.value = zonesConfig[zoneToModify].name;
        renameDialog.show();
    };
}

function saveZone(hide) {
    const areasOnMap = map.getLocations().zones.map(zoneCoordinates => [...zoneCoordinates, 1]);
    zonesConfig[zoneToModify].areas = areasOnMap;

    loadingBarSaveZones.setAttribute("indeterminate", "indeterminate");
    saveButton.setAttribute("disabled", "disabled");
    fn.requestWithPayload(
        "api/zones", JSON.stringify(zonesConfig), "PUT", function(err) {
            loadingBarSaveZones.removeAttribute("indeterminate");
            saveButton.removeAttribute("disabled");
            if (err) {
                ons.notification.toast(
                    err,
                    {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
            } else {
                ons.notification.toast(
                    "Successfully saved zones!",
                    {buttonLabel: "Dismiss", timeout: window.fn.toastOKTimeout});
                if (hide)
                    fn.popPage();
            }
        });
}

function
updateZoneName() {
    document.getElementById("zones-configuration-map-page-h1").innerText =
                      `Editing zone: ${zonesConfig[zoneToModify].name}`;
}

function
hideRenameZoneDialog() {
    renameDialog.hide();
}

function
renameZone() {
    var newZoneName = renameZoneInput.value.trim();
    if (newZoneName === "") {
        ons.notification.toast("Please enter a spot name",
            {buttonLabel: "Dismiss", timeout: 1500});
    } else {
        zonesConfig[zoneToModify].name = newZoneName;
        renameDialog.hide();
        saveZone(false);
        updateZoneName();
    }
}

window.hideRenameZoneDialog = hideRenameZoneDialog;
window.renameZone = renameZone;
window.zoneMapInit = zoneMapInit;