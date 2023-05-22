import { getByProps } from "enmity/metro";

import { data, uppers } from "../data";
import { Getters, Search } from "@you/modules";
import { Patch } from "@you/functions";
import { 
    GetSearchListItemResult, 
    UseSettingSearchResults 
} from "@you/config";

const Search: Search = getByProps("useSettingSearch");
const Getters: Getters = getByProps("getSettingSearchListItems");

export default ({ Patcher, Configurations }: Patch) => {
    Patcher.after(Search, "useSettingSearch", (_, __, res: UseSettingSearchResults) => {
        res.results = res.results.filter(result => !Object.values(uppers).includes(result));

        Object.keys(data).filter(key => key !== "page").forEach(key => {
            const { upper, title } = data[key];

            if ([data.general.upper, title].some(keyword => keyword.toLowerCase().includes(res.text.toLowerCase()))
                && !res.results.find(result => result === upper)) res.results.unshift(upper);
        });
    });

    Patcher.after(Getters, "getSettingSearchListItems", (_, [settings], res: GetSearchListItemResult[]) => {
        res = res.filter(item => !Object.values(uppers).includes(item.setting));

        Object.keys(data).reverse().forEach(key => {
            const { upper, title, breadcrumbs, icon } = data[key];

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
    });
};
