import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { Users } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher'; 

import manifest from '../manifest.json';
import { patchTitles, patchMisc, patchRender, patchDependent } from './patches';

const Patcher = create(manifest.name);
const FluxDispatcher = getByProps("_currentDispatchActionType");
const unfreeze = (...props: string[]) => props.forEach(prop => getByProps(prop)[prop] = { ...getByProps(prop)[prop] });

const EnmityYou: Plugin = { 
   ...manifest, 
   
   onStart() {
      unfreeze("SETTING_RENDERER_CONFIGS", "SETTING_RELATIONSHIPS");

      patchTitles(Patcher);
      patchRender(Patcher);
      patchMisc();

      if (Users.getCurrentUser()) {
         patchDependent(Patcher);
      } else {
         function event() {
            FluxDispatcher.unsubscribe("CONNECTION_OPEN", event);
            patchDependent(Patcher);
         };

         FluxDispatcher.subscribe("CONNECTION_OPEN", event);
      }
   }, 
   
   onStop() { 
      Patcher.unpatchAll(); 
   }
}; 

registerPlugin(EnmityYou);
