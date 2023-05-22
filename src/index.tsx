import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher";

import manifest from "../manifest.json";

import patchMisc from "./patches/misc";
import patchTitles from "./patches/titles";
import patchRender from "./patches/render";
import patchScreens from "./patches/screens";
import patchSearch from "./patches/search";

const Patcher = create(manifest.name);
const Configurations = getByProps("SETTING_RENDERER_CONFIGS");
const unfreeze = (...props: string[]) => props.forEach(prop => getByProps(prop)[prop] = { ...getByProps(prop)[prop] });

const EnmityYou: Plugin = {
    ...manifest,

    onStart() {
        unfreeze("SETTING_RENDERER_CONFIGS", "SETTING_RELATIONSHIPS");

        [patchMisc, patchTitles, patchRender, patchScreens, patchSearch]
            .forEach(callback => callback({ Patcher, Configurations }));
    },

    onStop() {
        Patcher.unpatchAll();
    }
};

registerPlugin(EnmityYou);
