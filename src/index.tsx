import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher'; 
import { getByProps } from 'enmity/metro';
import { Users } from 'enmity/metro/common';

import manifest from '../manifest.json';
import { patchTitles, patchMisc, patchRender, patchDependent } from './patches';

const Patcher = create(manifest.name);
const FluxDispatcher = getByProps("_currentDispatchActionType");
const unfreeze = (...props: string[]) => props.forEach(prop => getByProps(prop)[prop] = { ...getByProps(prop)[prop] });

const EnmityYou: Plugin = { 
   ...manifest, 
   
   onStart() {
      // Before all of the patches, unfreeze the constant setting objects
      unfreeze("SETTING_RENDERER_CONFIGS", "SETTING_RELATIONSHIPS");

      // Patch everything else such as UI and Titles
      patchTitles(Patcher);
      patchRender(Patcher);
      patchMisc();

      // Patch Screens which requires a valid current user
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
