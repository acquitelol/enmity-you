import { ColorMap, Locale, React, StyleSheet } from 'enmity/metro/common';
import { getByName, getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { FormSection, View } from 'enmity/components';
import { Patcher } from 'enmity/patcher';
import { data } from '../data';

const SettingsOverviewScreen = getByName("SettingsOverviewScreen", { default: false });
const { renderSetting } = getByProps("renderSetting");
const styles = StyleSheet.createThemedStyleSheet({
   round: {
      width: "100%",
      borderRadius: 16,
      backgroundColor: ColorMap.colors.BACKGROUND_PRIMARY
   },
});

export default (Patcher: Patcher) => {
   Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
      const { children: [ ___, FormSections ] } = findInReactTree(res, r => r.children[0].type === getByName("SettingsSearch"));
      const index = FormSections?.findIndex(c => c.props.title === Locale.Messages.PREMIUM_SETTINGS_GENERIC);

      const [ Enmity, Plugins, Themes ] = Object.keys(data)
         .filter(k => k.toLowerCase() !== "page")
         .map(k => renderSetting({ type: "route", id: data[k].upper }));

      FormSections?.splice(index === -1 ? 1 : index, 0, (
         <FormSection key={data.general.route} title={data.general.route} inset>
            <View style={styles.round}>
               {Enmity}
               {Plugins}
               {Themes}
            </View>
         </FormSection>
      ));
   });
};
