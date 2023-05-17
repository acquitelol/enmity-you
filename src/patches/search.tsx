import { getByProps } from "enmity/metro";
import { Patcher } from "enmity/patcher";
import { data, uppers } from "../common/data";
import { Configurations } from "@you/props";

const Search = getByProps("useSettingSearch");
const Getters = getByProps("getSettingSearchListItems");
const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");

export default (Patcher: Patcher) => {
    Patcher.after(Search, "useSettingSearch", (_, __, res) => {
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

    Patcher.after(Getters, "getSettingSearchListItems", (_, [settings]: string[][], res: any[]) => {
        res = res.filter(item => !Object.values(uppers).includes(item.setting));

        Object.keys(data).filter(base => base !== "page").reverse().forEach(base => {
            const { upper, title, breadcrumbs, icon } = data[base];

            if (settings.includes(upper)) {
                res = res.map(item => {
                    item.index += 1;
                    item.total += 1;
                    return item;
                })
            
                res.unshift({
                    type: 'setting_search_result',
                    ancestorRendererData: Configurations.SETTING_RENDERER_CONFIGS[upper],
                    setting: upper,
                    title,
                    breadcrumbs,
                    icon,
                    index: 0,
                    total: res.length + 1
                })
            }
        })

        return res;
    })
}