import { data, relationships } from "../data";
import { Patch } from "@you/functions";

export default ({ Configurations }: Patch) => {
    Object.assign(
        Configurations.SETTING_RELATIONSHIPS,
        Object.keys(relationships)
            .map(key => ({ [data[key].upper]: data[key].relationship }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
   );
};
