import { React, Users } from 'enmity/metro/common';
import { getByProps, getByName } from 'enmity/metro';
import { View } from 'enmity/components';
import { Patcher } from 'enmity/patcher';
import { base, data, states } from '../data/data';
import insteadPatchHook from '../insteadPatchHook';
import { Screens } from '../def';

import { getPlugins } from 'enmity/managers/plugins';

const Screens = getByProps("useSettingScreen", "useSettingScreens");
const getScreens = getByName("getScreens");

export default (Patcher: Patcher) => {
    insteadPatchHook(Patcher, Screens, "useSettingScreen", "screen");

    Patcher.after(Screens, "useSettingScreens", (_, __, res) => {
        const { Enmity, EnmityPlugins, EnmityThemes } = getScreens(Users.getCurrentUser());

        const [Plugins, Themes] = [EnmityPlugins, EnmityThemes]
            .map(Screen => ({ navigation, route }) => {
                React.useEffect(() => {
                    if (!route?.hasSetHeaderRight) {
                        route.hasSetHeaderRight = true;

                        navigation.setOptions({ 
                            headerRight: () => <View style={{ left: 12 }}>
                                <Screen.headerRight />
                            </View>
                        })
                    }
                }, [])

                return <Screen.render />
            })

        return {
            ...res,
            [data.general.upper]: {
                route: data.general.route,
                getComponent: () => Enmity.render
            },
            [data.plugins.upper]: {
                route: data.plugins.route,
                getComponent: () => Plugins
            },
            [data.themes.upper]: {
                route: data.themes.route,
                getComponent: () => Themes
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
                }
            },
            ...Object.keys(data)
                .filter((k) => !base.includes(k))
                .map(k => ({
                    route: data[k]?.route,
                    getComponent: () => {
                        const [_, type, addon, state] = data[k]?.ancestor.breadcrumbs as [_: any, type: "Plugins" | "Themes", addon: string, state: typeof states[number]];
                        if (state !== "Enabled") {
                            return type === "Plugins"
                                ? Plugins
                                : Themes
                        }

                        const settingsPanel = getPlugins().find(plugin => plugin.name === addon)?.getSettingsPanel;
                        return type === "Plugins"
                            ? settingsPanel ?? Plugins
                            : Themes;
                    }
                }))
        };
    });
};
