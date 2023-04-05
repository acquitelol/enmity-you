import { FormArrow, FormDivider, FormRow, FormSection, View } from 'enmity/components'; 
import { React, StyleSheet, Constants } from 'enmity/metro/common'; 
import { findInReactTree } from 'enmity/utilities';
import { getIDByName } from 'enmity/api/assets';
import { bulk, filters } from 'enmity/metro';
import { Plugin, registerPlugin } from 'enmity/managers/plugins'; 
import { create } from 'enmity/patcher'; 
import manifest from '../manifest.json'; 

const Patcher = create(manifest.name);

const [
   SettingsOverviewScreen,
   Screens,
   Titles,
   UserStore,
   Locale,
   Icon,
   getScreens,
] = bulk(
   filters.byName("SettingsOverviewScreen", false),
   filters.byProps("useSettingScreen"),
   filters.byProps("useSettingTitle"),
   filters.byProps("getCurrentUser", "getUser"),
   filters.byProps("Messages"),
   filters.byName("Icon"),
   filters.byName("getScreens")
)

const styles = StyleSheet.createThemedStyleSheet({
   form: {
      width: "100%",
      borderRadius: 16,
      backgroundColor: Constants.ThemeColorMap.BACKGROUND_PRIMARY
   },
   icon: {
      width: 16,
      height: 16,
      tintColor: "#fff",
      margin: 8
   }
})

const EnmityYou: Plugin = { 
   ...manifest, 
   onStart() {
      Patcher.after(Screens, "useSettingScreens", (_, __, res) => {
         const { Enmity, EnmityPlugins, EnmityThemes } = getScreens(UserStore.getCurrentUser());
         res = { ...res }
         
         Object.assign(res, { 
            ENMITY: {
               route: "Enmity",
               getComponent: () => Enmity.render
            },
            ENMITY_PLUGINS: {
               route: "Plugins",
               getComponent: () => EnmityPlugins.render
            },
            ENMITY_THEMES: {
               route: "Themes",
               getComponent: () => EnmityThemes.render
            },
            ENMITY_PAGE: {
               route: "EnmityCustomPage",
               getComponent: () => ({ route: { params: { pagePanel } } }) => {
                  const Component = pagePanel ?? View;
                  return <Component />;
               },
            }
         })

         return res
      })

      Patcher.after(Titles, "useSettingTitles", (_, __, res) => {
         res = { ...res }
         
         Object.assign(res, { 
            ENMITY: "General",
            ENMITY_PLUGINS: "Plugins",
            ENMITY_THEMES: "Themes",
            ENMITY_PAGE: "Subpage"
         })

         return res
      })

      Patcher.after(SettingsOverviewScreen, "default", (_, [{ navigation }], { props: { children: res }}) => {
         const { children } = findInReactTree(res, r => r.children[1].type === FormSection);
         const index = children.findIndex(c => c.props.title === Locale.Messages.PREMIUM_SETTINGS_GENERIC);
         const { ENMITY: GENERAL, ENMITY_PLUGINS: PLUGINS, ENMITY_THEMES: THEMES } = Screens.useSettingScreens();
         const { ENMITY, ENMITY_PLUGINS, ENMITY_THEMES } = Titles.useSettingTitles();

         children.splice(index === -1 ? 1 : index, 0, (
            <FormSection 
               key='Enmity' 
               title='Enmity' 
               inset
            >
               <View style={styles.form}>
                  <FormRow
                     label={ENMITY}
                     leading={() => (
                        <Icon 
                           source={{ uri: 'https://files.enmity.app/icon-64.png' }}
                           style={styles.icon} 
                        />
                     )}
                     trailing={<FormArrow />}
                     onPress={() => void navigation.push(GENERAL.route)}
                  />
                  <FormDivider />
                  <FormRow
                     label={ENMITY_PLUGINS}
                     leading={() => (
                        <Icon 
                           source={getIDByName("ic_activity_24px")} 
                           style={styles.icon}
                        />
                     )}
                     trailing={<FormArrow />}
                     onPress={() => void navigation.push(PLUGINS.route)}
                  />
                  <FormDivider />
                  <FormRow
                     label={ENMITY_THEMES}
                     leading={() => (
                        <Icon 
                           source={getIDByName("img_nitro_star")} 
                           style={styles.icon}
                        />
                     )}
                     trailing={<FormArrow />}
                     onPress={() => void navigation.push(THEMES.route)}
                  />
               </View>
            </FormSection>
         ));
      })
   }, 
   
   onStop() { 
      Patcher.unpatchAll(); 
   }, 
}; 

registerPlugin(EnmityYou);