import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';

import { data } from '../common/data';
import { SettingsOverviewScreenLayout } from '@you/props';
import { Locale } from 'enmity/metro/common';

const SettingsOverviewScreenLayout: SettingsOverviewScreenLayout = getByProps("useSettingsOverviewScreenLayout");

export default (Patcher: Patcher) => {
   Patcher.after(SettingsOverviewScreenLayout, "useSettingsOverviewScreenLayout", (_, __, res) => {
      const index = res.findIndex((item: Record<string, any>) => item?.settings.find((setting: string) => setting === "ACCOUNT"))

      // Add Enmity Section
      !res.find((section: Record<string, string>) => section.title === data.general.route) && 
         res?.splice(index === -1 ? 1 : index + 1, 0, {
            title: data.general.route,
            settings: [data.general.upper, data.plugins.upper, data.themes.upper]
         });

      // Get rid of Upload Debug Logs
      const supportIndex = res.findIndex(layoutItem => layoutItem.title === Locale.Messages.SUPPORT)
      res[supportIndex].settings = res[supportIndex].settings.filter(setting => setting !== "UPLOAD_DEBUG_LOGS")
   });
};
