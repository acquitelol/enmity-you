import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher'; 

import manifest from '../manifest.json';
import { patchTitles, patchMisc, patchRender, patchScreens, patchSearch } from './patches';

const Patcher = create(manifest.name);
const unfreeze = (...props: string[]) => {
   const setProperty = (prop: string, callback: (obj: Record<string, any>) => any) => 
      getByProps(prop)[prop] = callback(getByProps(prop)[prop]);

   props.forEach(prop => setProperty(prop, (obj) => ({ ...obj })));
   return () => props.forEach(prop => setProperty(prop, (obj) => Object.freeze(obj)));
};

const EnmityYou: Plugin = { 
   ...manifest, 
   
   onStart() {
      const refreeze = unfreeze("SETTING_RENDERER_CONFIGS", "SETTING_RELATIONSHIPS");

      patchTitles(Patcher);
      patchRender(Patcher);
      patchSearch(Patcher);
      patchScreens();
      patchMisc();

      refreeze();
   }, 
   
   onStop() { 
      Patcher.unpatchAll(); 
   }
}; 

registerPlugin(EnmityYou);
