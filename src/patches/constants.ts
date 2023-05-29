import { data } from "../data";
import { Patch } from "@you/functions";

export default ({ Configurations }: Patch) => {
    Object.assign(
        Configurations.SETTING_RENDERER_CONFIGS, 
        Object.values(data)
            .map(({ upper, icon, screen }) => ({ [upper]: { type: "route", icon, screen } }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
    );

    Object.assign(
        Configurations.SETTING_RELATIONSHIPS,
        Object.values(data)
            .map(({ upper, relationship }) => ({ [upper]: relationship }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
   );
};
