import { data } from "../data";
import { Patch } from "@you/functions";

export default ({ Patcher, Configurations }: Patch) => {
    Patcher.after(Configurations, "getSettingTitleConfig", (_, __, res) => {
        const titles = Object.keys(data)
            .map(key => ({ [data[key].upper]: data[key].title }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {});

        return {
            ...res,
            ...titles
        };
    });
};
