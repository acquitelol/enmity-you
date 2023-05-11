import { getByProps } from "enmity/metro";
import { Patcher } from "enmity/patcher";
import { data } from "../common/data";
import { Configurations } from "@you/props";

const Search = getByProps("useSettingSearch");
const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");

export default (Patcher: Patcher) => {
    Patcher.after(Search, "useSettingSearch", (_, __, res) => {
        // Get rid of default search results that Discord gives me
        res.results = res.results.filter(result => result.breadcrumbs[0] !== data['general'].title);
        
        // Add my own search results based on custom query
        Object.keys(data).filter(base => base !== "page").forEach(base => {
            const { route, upper, title, breadcrumbs, icon } = data[base];

            if (
                route.toLowerCase().includes(res.text.toLowerCase()) 
                && !res.results.find(result => result.setting === upper)
            ) {
                res.results.push({ 
                    rendererData: Configurations.SETTING_RENDERER_CONFIGS[upper],
                    setting: upper,
                    title,
                    breadcrumbs,
                    icon
                });
            }
        })
    })
}