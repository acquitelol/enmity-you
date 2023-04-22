import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import { data } from '../data/data';
import insteadPatchHook from '../insteadPatchHook';

const Titles = getByProps("useSettingTitle", "useSettingTitles");

export default (Patcher: Patcher) => {
    insteadPatchHook(Patcher, Titles, "useSettingTitle", "title");

    Patcher.after(Titles, "useSettingTitles", (_, __, res) => {
        const titles = Object.keys(data)
            .map(key => ({ [data[key].upper]: data[key].title }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {});

        return {
            ...res,
            ...titles
        };
    });

    Patcher.after(Titles, "useSettingTitlePairs", (_, __, res) => {
        console.log({ res, data });

        Object.keys(data)
            .filter(k => k.toLowerCase() !== "page")
            .forEach(k => res.push([ data[k].upper, data[k].route ]));
    });
};
