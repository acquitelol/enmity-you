import { FormSection, View } from 'enmity/components';
import { React, StyleSheet, ColorMap, Users, Locale } from 'enmity/metro/common';
import { findInReactTree } from 'enmity/utilities';
import { bulk, filters, getByName } from 'enmity/metro';
import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher'; 
import { data } from './data';
import manifest from '../manifest.json';

const Patcher = create(manifest.name);

const [
   SettingsOverviewScreen,
   Screens,
   Titles,
   Icons,
   getScreens,
   AncestorMetadata,
   Relationships,
   { renderSetting }
] = bulk(
   filters.byName("SettingsOverviewScreen", false),
   filters.byProps("useSettingScreen"),
   filters.byProps("useSettingTitle"),
   filters.byProps("useSettingIcon"),
   filters.byName("getScreens"),
   filters.byProps("useSettingAncestorMetadata"),
   filters.byProps("useSettingRelationships"),
   filters.byProps("renderSetting")
)

const styles = StyleSheet.createThemedStyleSheet({
   form: {
      width: "100%",
      borderRadius: 16,
      backgroundColor: ColorMap.colors.BACKGROUND_PRIMARY
   },
})


const EnmityYou: Plugin = { 
   ...manifest, 
   onStart() {
      Patcher.after(Screens, "useSettingScreens", (_, __, res) => {
         const { Enmity, EnmityPlugins, EnmityThemes } = getScreens(Users.getCurrentUser());
         res = { ...res }

         const generateAddonComponent = (Component: typeof EnmityPlugins | typeof EnmityThemes) => {
            return ({ navigation, route }) => {
               React.useEffect(() => {
                  if (!route?.hasSetHeaderRight) {
                     route.hasSetHeaderRight = true;

                     navigation.setOptions({ headerRight: () => (
                        <View style={{ left: 12 }}>
                           <Component.headerRight />
                        </View>
                     )})
                  }
               }, [])

               return <Component.render />
            }
         };

         Object.assign(res, {
            [data.base.upper]: {
               route: data.base.route,
               getComponent: () => Enmity.render
            },
            [data.plugins.upper]: {
               route: data.plugins.route,
               getComponent: () => generateAddonComponent(EnmityPlugins),
            },
            [data.themes.upper]: {
               route: data.themes.route,
               getComponent: () => generateAddonComponent(EnmityThemes),
            },
            [data.page.upper]: {
               route: data.page.route,
               getComponent: () => ({ navigation, route: { params } }) => {
                  const Component = params.pagePanel ?? View;

                  React.useEffect(() => {
                     if (params.pageName && !params.hasSetTitle) {
                        params.hasSetTitle = true;
                        navigation.setOptions({ title: params.pageName })
                     }
                  }, [])

                  return <Component />;
               },
            }
         });

         return res;
      });

      Patcher.after(Titles, "useSettingTitles", (_, __, res) => {
         Object.assign(res, {
            [data.base.upper]: data.base.title,
            [data.plugins.upper]: data.plugins.title,
            [data.themes.upper]: data.themes.title,
            [data.page.upper]: data.page.title
         });

         return res;
      })

      Patcher.after(Relationships, "useSettingRelationships", (_, __, res) => {
         res = { ...res }

         Object.assign(res, {
            [data.base.upper]: data.base.upper,
            [data.plugins.upper]: data.base.upper,
            [data.themes.upper]: data.base.upper,
            [data.page.upper]: data.base.upper
         });

         return res;
      })

      Patcher.after(Titles, "useSettingTitlePairs", (_, __, res) => {
         res.push([ data.base.upper, data.base.title ]);
         res.push([ data.plugins.upper, data.plugins.title ]);
         res.push([ data.themes.upper, data.themes.title ]);
      })

      const insteadPatchHooks = (object, func, type) => {
         Patcher.instead(object, func, (self, args, orig) => {
            switch (args[0]) {
               case data.base.upper: {
                  return data.base[type];
               }
               case data.plugins.upper: {
                  return data.plugins[type];
               }
               case data.themes.upper: {
                  return data.themes[type];
               }
               default: {
                  return orig.apply(self, args);
               }
            }
         })
      }

      insteadPatchHooks(Icons, "useSettingIcon", "icon");
      insteadPatchHooks(AncestorMetadata, "useSettingAncestorMetadata", "ancestor");
      insteadPatchHooks(Screens, "useSettingScreen", "screen");
      insteadPatchHooks(Titles, "useSettingTitle", "title");

      Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
         const { children: [ ___, FormSections ] } = findInReactTree(res, r => r.children[0].type === getByName("SettingsSearch"));
         const index = FormSections?.findIndex(c => c.props.title === Locale.Messages.PREMIUM_SETTINGS_GENERIC);

         const Enmity = renderSetting({ type: "route", id: data.base.upper })
         const Plugins = renderSetting({ type: "route", id: data.plugins.upper })
         const Themes = renderSetting({ type: "route", id: data.themes.upper })

         FormSections?.splice(index === -1 ? 1 : index, 0, (
            <FormSection 
               key={data.base.route}
               title={data.base.route}
               inset
            >
               <View style={styles.form}>
                  {Enmity}
                  {Plugins}
                  {Themes}
               </View>
            </FormSection>
         ));
      });
   }, 
   
   onStop() { 
      Patcher.unpatchAll(); 
   }, 
}; 

registerPlugin(EnmityYou);