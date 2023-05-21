import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher"; 

import manifest from "../manifest.json";
import { patchTitles, patchMisc, patchRender, patchScreens, patchSearch } from "./patches";

const Patcher = create(manifest.name);
const unfreeze = (...props: string[]) => props.forEach(prop => getByProps(prop)[prop] = { ...getByProps(prop)[prop] });

const EnmityYou: Plugin = { 
   ...manifest, 
   
   onStart() {
      unfreeze("SETTING_RENDERER_CONFIGS", "SETTING_RELATIONSHIPS");

      patchTitles(Patcher);
      patchRender(Patcher);
      patchSearch(Patcher);
      patchScreens();
      patchMisc();
   }, 
   
   onStop() { 
      Patcher.unpatchAll(); 
   }
}; 

registerPlugin(EnmityYou);
