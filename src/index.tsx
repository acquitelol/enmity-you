import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher'; 
import { getByProps } from 'enmity/metro';
import { Users } from 'enmity/metro/common';

import manifest from '../manifest.json';
import { patchScreens, patchTitles, patchMisc, patchRender } from './patches';

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
      patchMisc(Patcher);
      patchRender(Patcher);

      // Patch Screens which requires a valid current user
      if (Users.getCurrentUser()) {
         patchScreens();
      } else {
         function event() {
            FluxDispatcher.unsubscribe("CONNECTION_OPEN", event);
            patchScreens();
         };

         FluxDispatcher.subscribe("CONNECTION_OPEN", event);
      }
   }, 
   
   onStop() { 
      Patcher.unpatchAll(); 
   }
}; 

registerPlugin(EnmityYou);
