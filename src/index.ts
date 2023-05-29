import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher";

import manifest from "../manifest.json";

import constants from "./patches/constants";
import titles from "./patches/titles";
import render from "./patches/sections";
import search from "./patches/search";

const Patcher = create(manifest.name);
const unfreeze = (...groups: (string[])[]) => groups.forEach(props => {
    const module = getByProps(...props);
    Object.keys(module).forEach(key => typeof(module[key]) === "object" 
        && Object.isFrozen(module[key])
        && (module[key] = { ...module[key] }))
});

const EnmityYou: Plugin = {
    ...manifest,

    onStart() {
        unfreeze(["SETTING_RENDERER_CONFIGS", "SETTING_RELATIONSHIPS"]);

        const Configurations = getByProps("SETTING_RENDERER_CONFIGS");
        Object.entries({ constants, titles, render, search })
            .forEach(([patch, callback]) => {
                try {
                    callback({ Patcher, Configurations })
                } catch (e) {
                    console.error(`Error when patching ${patch}: ${e.message ?? e}`)
                }
            });
    },

    onStop() {
        Patcher.unpatchAll();
    }
};

registerPlugin(EnmityYou);
