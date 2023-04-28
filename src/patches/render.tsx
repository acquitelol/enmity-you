import { Constants, Locale, React, StyleSheet } from 'enmity/metro/common';
import { getByName, getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { FormDivider, FormSection } from 'enmity/components';
import { Patcher } from 'enmity/patcher';
import { data } from '../common/data';

import { SettingsOverviewScreen, SettingsRenderables } from '@you/modules';

const SettingsOverviewScreen: SettingsOverviewScreen = getByName("SettingsOverviewScreen", { default: false });
const { renderSetting }: SettingsRenderables = getByProps("renderSetting");
const styles = StyleSheet.createThemedStyleSheet({
   section: {
      backgroundColor: Constants.ThemeColorMap.BACKGROUND_PRIMARY,
      borderRadius: 16,
      overflow: "hidden"
   },
   title: {
      paddingTop: 24
   }
});

export default (Patcher: Patcher) => {
   Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
      const { children: [ _SettingsSearch, SettingsRows ] } = findInReactTree(res, r => r.children[0].type === getByName("SettingsSearch"));
      const index = SettingsRows?.findIndex((child: Record<string, any>) => child.props.title === Locale.Messages.PREMIUM_SETTINGS_GENERIC);

      const [ Enmity, Plugins, Themes ] = Object.keys(data)
         .filter(k => k.toLowerCase() !== "page")
         .map(k => renderSetting({ type: "route", id: data[k].upper }))

      SettingsRows?.splice(Math.abs(index), 0, (
         <FormSection
            key={data.general.route}
            accessibilityLabel={data.general.route}
            title={data.general.route}
            sectionBodyStyle={styles.section}
            titleStyleType={"no_border"}
            titleViewStyle={styles.title}
            uppercaseTitle={false}
            inset>
            {Enmity}
            <FormDivider />
            {Plugins}
            <FormDivider />
            {Themes}
         </FormSection>
      ));
   });
};
