import { Locale } from 'enmity/metro/common';
import { getByName } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { Patcher } from 'enmity/patcher';

import { SettingsOverviewScreen } from '@you/props';
import { data } from '../common/data';

const SettingsOverviewScreen: SettingsOverviewScreen = getByName("SettingsOverviewScreen", { default: false });

export default (Patcher: Patcher) => {
   Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
      const { sections } = findInReactTree(res, r => r.sections);
      const index = sections.findIndex((item: Record<string, any>) => item?.settings.find((setting: string) => setting === "ACCOUNT"))

      // Add Enmity Section
      !sections.find((section: Record<string, string>) => section.title === data.general.route) && 
         sections?.splice(index === -1 ? 1 : index + 1, 0, {
            title: data.general.route,
            settings: [data.general.upper, data.plugins.upper, data.themes.upper]
         });

      // Get rid of Upload Debug Logs
      const supportIndex = sections.findIndex(layoutItem => layoutItem.title === Locale.Messages.SUPPORT)
      sections[supportIndex].settings = sections[supportIndex].settings.filter(setting => setting !== "UPLOAD_DEBUG_LOGS")
   });
};
