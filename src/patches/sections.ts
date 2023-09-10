import { Locale } from "enmity/metro/common";
import { getByProps } from "enmity/metro";

import { data } from "../data";
import { SearchableSettingsList } from "@you/modules";
import { Section } from "@you/config";
import { Patch } from "@you/functions";

const { SearchableSettingsList }: { SearchableSettingsList: SearchableSettingsList } = getByProps('SearchableSettingsList');

export default ({ Patcher }: Patch) => {
    Patcher.after(SearchableSettingsList, "type", (_, __, [{ sections }]: [{ sections: Section[] }]) => {
        const index = sections?.findIndex(section => section.settings.find(setting => setting === "ACCOUNT"));

        !sections.find(section => section.title === data.general.route) &&
            sections.splice(index === -1 ? 1 : index + 1, 0, {
                title: data.general.route,
                settings: [data.general.upper, data.plugins.upper, data.themes.upper]
            });

        const support = sections.find(section => section.title === Locale.Messages.SUPPORT);
        support && (support.settings = support.settings.filter(setting => setting !== "UPLOAD_DEBUG_LOGS"));
    });
};
