import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';

import { data } from '../common/data';
import { SettingsOverviewScreenLayout } from '@you/props';

const SettingsOverviewScreenLayout: SettingsOverviewScreenLayout = getByProps("useSettingsOverviewScreenLayout");

export default (Patcher: Patcher) => {
   Patcher.after(SettingsOverviewScreenLayout, "useSettingsOverviewScreenLayout", (_, __, res) => {
      const index = res.findIndex((item: Record<string, any>) => item?.settings.find((setting: string) => setting === "ACCOUNT"))

      !res.find((section: Record<string, string>) => section.title === data.general.route) && 
         res?.splice(index === -1 ? 1 : index + 1, 0, {
            title: data.general.route,
            settings: [data.general.upper, data.plugins.upper, data.themes.upper]
         });
   });
};
