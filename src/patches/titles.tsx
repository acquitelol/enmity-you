import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import { data } from '../data';
import insteadPatchHook from '../insteadPatchHook';

const Titles = getByProps("useSettingTitle", "useSettingTitles");

export default (Patcher: Patcher) => {
    insteadPatchHook(Patcher, Titles, "useSettingTitle", "title");

    Patcher.after(Titles, "useSettingTitles", (_, __, res) => {
        return {
            ...res,
            [data.base.upper]: data.base.title,
            [data.plugins.upper]: data.plugins.title,
            [data.themes.upper]: data.themes.title,
            [data.page.upper]: data.page.title
        };
    });

    Patcher.after(Titles, "useSettingTitlePairs", (_, __, res) => {
        Object.keys(data)
            .filter(k => k.toLowerCase() !== "page")
            .forEach(k => {
                res.push([ data[k].upper, data[k].route ])
            });
    });
};
