import { getByProps } from "enmity/metro";

import { data, uppers } from "../data";
import { Patch } from "@you/functions";
import {
    GetSearchListItemResult
} from "@you/config";

const SearchResults = getByProps('useSettingSearchResults');
const Getters = getByProps("getSettingListSearchResultItems");
const SearchQuery = getByProps('getSettingSearchQuery');

export default ({ Patcher, Configurations }: Patch) => {
    Patcher.after(SearchResults, "useSettingSearchResults", (_, __, res) => {
        res = res.filter(result => !Object.values(uppers).includes(result));

        Object.keys(data).filter(key => key !== "page").forEach(key => {
            const { upper, title } = data[key];

            if ([uppers.general, title].some(keyword => keyword.toLowerCase().includes(SearchQuery.getSettingSearchQuery().toLowerCase()))
                && !res.find(result => result === upper)) res.unshift(upper);
        });

        return res;
    });

    Patcher.after(Getters, "getSettingListSearchResultItems", (_, [settings], res: GetSearchListItemResult[]) => {
        res = res.filter(item => !Object.values(uppers).includes(item.setting));

        Object.keys(data).reverse().forEach(key => {
            const { upper, title, breadcrumbs, icon } = data[key];

            if (settings.includes(upper)) (
                res.unshift({
                    type: 'setting_search_result',
                    ancestorSettingData: Configurations.SETTING_RENDERER_CONFIG[upper],
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
