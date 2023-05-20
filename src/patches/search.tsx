import { getByProps } from "enmity/metro";
import { Patcher } from "enmity/patcher";
import { data, uppers } from "../common/data";

import { Configurations, Getters, Search } from "@you/props";
import { GetSearchListItemResult, UseSettingSearchResults } from "@you/config";
import { ExtractSetT } from "@you/utilities";
import { Data } from "@you/settings";

const Search: Search = getByProps("useSettingSearch");
const Getters: Getters = getByProps("getSettingSearchListItems");
const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");

export default (Patcher: Patcher) => {
    Patcher.after(Search, "useSettingSearch", (_, __, res: UseSettingSearchResults) => {
        res.results = res.results.filter(result => !Object.values(uppers).includes(result));

        Object.keys(data).forEach(base => {
            const { keywords, upper }: ExtractSetT<Data> = data[base];

            if (keywords.length > 0 
                && keywords.some(keyword => keyword!.toLowerCase().includes(res.text.toLowerCase()))
                && !res.results.find(result => result === upper)) res.results.unshift(upper);
        })
    })

    Patcher.after(Getters, "getSettingSearchListItems", (_, [settings], res: GetSearchListItemResult[]) => {
        res = res.filter(item => !Object.values(uppers).includes(item.setting));

        Object.keys(data).reverse().forEach(base => {
            const { upper, title, breadcrumbs, icon }: ExtractSetT<Data> = data[base];

            if (settings.includes(upper)) (
                res.unshift({
                    type: 'setting_search_result',
                    ancestorRendererData: Configurations.SETTING_RENDERER_CONFIGS[upper],
                    setting: upper,
                    title,
                    breadcrumbs,
                    icon
                } as GetSearchListItemResult),

                res.forEach((value, index, parent) => {
                    value.index = index;
                    value.total = parent.length;
                })
            );
        })

        return res;
    })
};
