import { Locale } from "enmity/metro/common";
import { getByName } from "enmity/metro";
import { findInReactTree } from "enmity/utilities";

import { data } from "../data";
import { SettingsOverviewScreen, Section } from "@you/modules";
import { Patch } from "@you/functions";

const SettingsOverviewScreen: SettingsOverviewScreen = getByName("SettingsOverviewScreen", { default: false });

export default ({ Patcher }: Patch) => {
    Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
        const { sections }: { sections: Section[] } = findInReactTree(res, r => r.sections);
        const index = sections?.findIndex(section => section.settings.find(setting => setting === "ACCOUNT"));

        !sections.find(section => section.title === data.general.route) && 
            sections.splice(index === -1 ? 1 : index + 1, 0, {
                title: data.general.route,
                settings: [data.general.upper, data.plugins.upper, data.themes.upper]
            });

        const omittable = sections.findIndex(section => section.title === Locale.Messages.SUPPORT);
        omittable !== -1 && sections[omittable].settings.filter(setting => setting !== "UPLOAD_DEBUG_LOGS");
    });
};
