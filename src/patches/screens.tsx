import { React } from "enmity/metro/common";
import { getByName } from "enmity/metro";
import { View } from "enmity/components";

import { data } from "../data";
import { GetScreens, Patch } from "@you/functions";
import { Scenes } from "@you/config";

const getScreens: GetScreens = getByName("getScreens");

export default ({ Configurations }: Patch) => {
    const { Enmity, EnmityPlugins, EnmityThemes }: Scenes = getScreens({});
    const [ Plugins, Themes ] = [ EnmityPlugins, EnmityThemes ]
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
            }, []);

            return <Screen.render />;
        });

    Object.assign(
        Configurations.SETTING_RENDERER_CONFIGS, 
        Object.entries({
            general: {
                route: data.general.route,
                getComponent: () => Enmity.render
            },
            plugins: {
                route: data.plugins.route,
                getComponent: () => Plugins
            },
            themes: {
                route: data.themes.route,
                getComponent: () => Themes
            },
            page: {
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
            }
        })
        .map(([key, screen]) => ({
            [data[key].upper]: {
                type: "route",
                icon: data[key].icon,
                screen
            }
        }))
        .reduce((acc, obj) => ({ ...acc, ...obj }), {})
    );
};
