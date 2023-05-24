import { screens, data } from "../data";
import { Patch } from "@you/functions";

export default ({ Configurations }: Patch) => {
    Object.assign(
        Configurations.SETTING_RENDERER_CONFIGS, 
        Object.entries(screens)
            .map(([key, screen]) => ({
                [data[key].upper]: {
                    type: "route",
                    icon: data[key].icon,
                    screen
                }
            }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
    );
};
