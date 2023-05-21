import { getByProps } from "enmity/metro";
import { data, relationships } from "../common/data";

import { Configurations } from "@you/modules";

const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");

export default () => {
    Object.assign(
        Configurations.SETTING_RELATIONSHIPS, 
        Object.keys(relationships)
            .map(relationshipKey => ({ [data[relationshipKey].upper]: data[relationshipKey].relationship }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
    );
};
