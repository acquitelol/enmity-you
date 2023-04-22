import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher'; 
import manifest from '../manifest.json';
import patchScreens from "./patches/screens";
import patchTitles from "./patches/titles";
import patchMisc from "./patches/misc";
import patchRender from "./patches/render"

const Patcher = create(manifest.name);

const EnmityYou: Plugin = { 
   ...manifest, 
   
   onStart() {
      patchTitles(Patcher);
      patchScreens(Patcher);
      patchMisc(Patcher);
      patchRender(Patcher);
   }, 
   
   onStop() { 
      Patcher.unpatchAll(); 
   }
}; 

registerPlugin(EnmityYou);