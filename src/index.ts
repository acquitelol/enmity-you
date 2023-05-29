import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher";

import manifest from "../manifest.json";

import constants from "./patches/constants";
import titles from "./patches/titles";
import sections from "./patches/sections";
import search from "./patches/search";

const Patcher = create(manifest.name);
const unfrozenModule = (...props: string[]): any => {
    const module = getByProps(...props);

    Object.keys(module).forEach(prop => props.includes(prop)
        && Object.isFrozen(module[prop])
        && (module[prop] = { ...module[prop] }));

    return module;
};

const EnmityYou: Plugin = {
    ...manifest,

    onStart() {
        const Configurations = unfrozenModule("SETTING_RENDERER_CONFIGS", "SETTING_RELATIONSHIPS");

        Object.entries({ constants, titles, sections, search })
            .forEach(([patch, callback]) => {
                try {
                    callback({ Patcher, Configurations });
                } catch (e) {
                    console.error(`Error when patching ${patch}: ${e.message ?? e}`);
                }
            });
    },

    onStop() {
        Patcher.unpatchAll();
    }
};

registerPlugin(EnmityYou);
