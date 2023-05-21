import { getByProps } from "enmity/metro";
import { Patcher } from "enmity/patcher";
import { data } from "../common/data";

import { Configurations } from "@you/modules";

const Titles: Configurations = getByProps("getSettingTitleConfig");

export default (Patcher: Patcher) => {
    Patcher.after(Titles, "getSettingTitleConfig", (_, __, res) => {
        const titles = Object.keys(data)
            .map(key => ({ [data[key].upper]: data[key].title }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {});

        return {
            ...res,
            ...titles
        };
    });
};
