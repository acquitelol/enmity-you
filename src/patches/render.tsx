import { getByName } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { Patcher } from 'enmity/patcher';

import { SettingsOverviewScreen } from '@you/modules';
import { data } from '../common/data';

const SettingsOverviewScreen: SettingsOverviewScreen = getByName("SettingsOverviewScreen", { default: false });

export default (Patcher: Patcher) => {
   Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
      const { props: { sections } } = findInReactTree(res, r => r?.type?.name === "SettingScreenLayout") ?? { props: { sections: [] } };
      const index = sections.findIndex((item: Record<string, any>) => item?.settings.find((setting: string) => setting === "ACCOUNT"))

      !sections.find((section: Record<string, string>) => section.title === data.general.title) && 
         sections?.splice(Math.abs(index) + 1, 0, {
            title: data.general.title,
            settings: [data.general.upper, data.plugins.upper, data.themes.upper]
         });
   });
};
