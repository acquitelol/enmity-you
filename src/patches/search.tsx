import { getByProps } from "enmity/metro";
import { Patcher } from "enmity/patcher";
import { data, uppers } from "../common/data";

import { Configurations, Getters, Search } from "@you/props";
import { GetSearchListItemResult, UseSettingSearchResults } from "@you/config";

const Search: Search = getByProps("useSettingSearch");
const Getters: Getters = getByProps("getSettingSearchListItems");
const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");

export default (Patcher: Patcher) => {
    Patcher.after(Search, "useSettingSearch", (_, __, res: UseSettingSearchResults) => {
        res.results = res.results.filter(result => !Object.values(uppers).includes(result));

        Object.keys(data).filter(base => base !== "page").forEach(base => {
            const { route, upper } = data[base];

            if (
                route.toLowerCase().includes(res.text.toLowerCase()) 
                && !res.results.find(result => result === upper)
            ) {
                res.results.unshift(upper);
            }
        })
    })

    Patcher.after(Getters, "getSettingSearchListItems", (_, [settings], res: GetSearchListItemResult[]) => {
        res = res.filter(item => !Object.values(uppers).includes(item.setting));

        Object.keys(data).filter(base => base !== "page").reverse().forEach(base => {
            const { upper, title, breadcrumbs, icon } = data[base];

            if (settings.includes(upper)) {
                res.unshift({
                    type: 'setting_search_result',
                    ancestorRendererData: Configurations.SETTING_RENDERER_CONFIGS[upper],
                    setting: upper,
                    title,
                    breadcrumbs,
                    icon
                } as GetSearchListItemResult);

                res.map((item: GetSearchListItemResult, index: number, parent: typeof res) => {
                    item.index = index;
                    item.total = parent.length;
                    return item;
                })
            }
        })

        return res;
    })
}