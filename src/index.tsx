import { FormArrow, FormDivider, FormRow, FormSection, View } from 'enmity/components'; 
import { React, StyleSheet, ColorMap, Users, Locale } from 'enmity/metro/common'; 
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
   Icon,
   getScreens,
] = bulk(
   filters.byName("SettingsOverviewScreen", false),
   filters.byProps("useSettingScreen"),
   filters.byProps("useSettingTitle"),
   filters.byName("Icon"),
   filters.byName("getScreens")
)

const styles = StyleSheet.createThemedStyleSheet({
   form: {
      width: "100%",
      borderRadius: 16,
      backgroundColor: ColorMap.colors.BACKGROUND_PRIMARY
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
         const { Enmity, EnmityPlugins, EnmityThemes } = getScreens(Users.getCurrentUser());
         res = { ...res }

         const generateAddonComponent = (Component: typeof EnmityPlugins | typeof EnmityThemes) => {
            return ({ navigation, route: { params } }) => {
               React.useEffect(() => {
                  if (!params?.hasSetHeaderRight) {
                     params.hasSetHeaderRight = true;
                     navigation.setOptions({ 
                        headerRight: () => (
                           <View style={{ left: 13 }}>
                              <Component.headerRight /> 
                           </View>
                        )
                     })
                  }
               }, [])

               return <Component.render />
            }
         }
         
         Object.assign(res, { 
            ENMITY: {
               route: "Enmity",
               getComponent: () => Enmity.render
            },
            ENMITY_PLUGINS: {
               route: "EnmityPlugins",
               getComponent: () => generateAddonComponent(EnmityPlugins),
            },
            ENMITY_THEMES: {
               route: "EnmityThemes",
               getComponent: () => generateAddonComponent(EnmityThemes),
            },
            ENMITY_PAGE: {
               route: "EnmityCustomPage",
               getComponent: () => ({ navigation, route: { params } }) => {
                  const Component = params.pagePanel ?? View;
                  
                  React.useEffect(() => {
                     if (params.pageName && !params?.hasSetTitle) {
                        params.hasSetTitle = true;
                        navigation.setOptions({ title: params.pageName })
                     }
                  }, [])

                  return <Component />;
               },
            }
         })

         return res
      })

      Patcher.after(Titles, "useSettingTitles", (_, __, res) => {res = { ...res }
         Object.assign(res, { 
            ENMITY: "General",
            ENMITY_PLUGINS: "Plugins",
            ENMITY_THEMES: "Themes",
            ENMITY_PAGE: "Page"
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
                     onPress={() => void navigation.push(PLUGINS.route, { placeholder: ENMITY_PLUGINS })}
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
                     onPress={() => void navigation.push(THEMES.route, { placeholder: ENMITY_THEMES })}
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