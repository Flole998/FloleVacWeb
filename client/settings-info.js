// Modifications copyright (C) Flole
/*global ons, fn*/
var loadingBarSettingsInfo = document.getElementById("loading-bar-settings-info");
ons.getScriptPage().onShow = function() {
    updateSettingsInfoPage();
};
function updateSettingsInfoPage() {
    loadingBarSettingsInfo.setAttribute("indeterminate", "indeterminate");
    fn.request("api/get_fw_version", "GET", function(err, res) {
        loadingBarSettingsInfo.removeAttribute("indeterminate");
        if (!err) {
            document.getElementById("info_fw_version").innerHTML = res.version;
            document.getElementById("info_fw_build").innerHTML = res.build;
            document.getElementById("info_floleVacWeb_version").innerHTML = res.floleVacWebVersion;
        } else {
            ons.notification.toast(err,
                {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
        }
        updateAppLocale();
    });
}
function updateAppLocale() {
    loadingBarSettingsInfo.setAttribute("indeterminate", "indeterminate");
    fn.request("api/get_app_locale", "GET", function(err, res) {
        loadingBarSettingsInfo.removeAttribute("indeterminate");
        if (!err) {
            var appLocale = res;
            document.getElementById("app_locale_name").innerHTML = appLocale.name;
            document.getElementById("app_locale_bom").innerHTML = appLocale.bom;
            document.getElementById("app_locale_location").innerHTML = appLocale.location;
            document.getElementById("app_locale_language").innerHTML = appLocale.language;
            document.getElementById("app_locale_timezone").innerHTML = appLocale.timezone;
            document.getElementById("app_locale_logserver").innerHTML = appLocale.logserver;
        } else {
            ons.notification.toast(err,
                {buttonLabel: "Dismiss", timeout: window.fn.toastErrorTimeout});
        }
    });
}

// eslint-disable-next-line no-unused-vars
function checkNewFloleVacWebVersion() {
    loadingBarSettingsInfo.setAttribute("indeterminate", "indeterminate");
    fn.request("https://api.github.com/repos/Hypfer/FloleVacWeb/releases", "GET", function(err, res) {
        loadingBarSettingsInfo.removeAttribute("indeterminate");
        if (!err) {
            try {
                var info_floleVacWeb_newest_release = res[0];
                document.getElementById("info_newest_floleVacWeb_version").innerHTML =
                    info_floleVacWeb_newest_release.tag_name;
                document.getElementById("info_floleVacWeb_update_url").innerHTML =
                    "<a href=\"" + info_floleVacWeb_newest_release.html_url + "\">" +
                    info_floleVacWeb_newest_release.html_url + "</a>";
                if (document.getElementById("info_floleVacWeb_version").innerHTML !=
                    info_floleVacWeb_newest_release.tag_name) {
                    document.getElementById("info_floleVacWeb_update_url_list").style.display =
                        ""; // make entry visible if newer version is availiable
                }
            } catch (e) {
                ons.notification.toast(e, {buttonLabel: "Dismiss", timeout: 1500});
            }
        } else {
            ons.notification.toast(err, {buttonLabel: "Dismiss", timeout: 1500});
        }
    });
}
