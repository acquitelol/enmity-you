import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import { data } from '../common/data';
import hook from '../common/hook';

import { Configurations } from '@you/props';
import { Titles } from '@you/settings';

const Titles: Configurations = getByProps("getSettingTitle", "getSettingTitles");

export default (Patcher: Patcher) => {
    hook(Patcher, Titles, "getSettingTitle", "title");

    Patcher.after(Titles, "getSettingTitles", (_, __, res) => {
        const titles = Object.keys(data)
            .map(key => ({ [data[key].upper]: data[key].title }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {});

        return {
            ...res,
            ...titles
        };
    });
};
