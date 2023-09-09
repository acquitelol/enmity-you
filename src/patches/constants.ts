import { data } from "../data";
import { Patch } from "@you/functions";

export default ({ Configurations }: Patch) => {
    Object.assign(
        Configurations.SETTING_RENDERER_CONFIG,
        Object.values(data)
            .map(({ upper, icon, screen, title }) => ({
                [upper]: {
                    type: 'route',
                    title,
                    parent: null,
                    screen,
                    icon
                }
            }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
    );
};
