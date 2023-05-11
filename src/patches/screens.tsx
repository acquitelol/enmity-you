import { React, Users } from 'enmity/metro/common';
import { getByProps, getByName } from 'enmity/metro';
import { View } from 'enmity/components';
import { data } from '../common/data';

import { Configurations } from '@you/props';
import { Scenes } from '@you/config';
import { GetScreens } from '@you/functions';

const getScreens: GetScreens = getByName("getScreens");
const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");

export default () => {
    const { Enmity, EnmityPlugins, EnmityThemes }: Scenes = getScreens(Users.getCurrentUser());
    const [ Plugins, Themes ] = [ EnmityPlugins, EnmityThemes ]
        .map(Screen => ({ navigation, route }) => {
            React.useEffect(() => {
                if (!route?.hasSetHeaderRight) {
                    route.hasSetHeaderRight = true;

                    navigation.setOptions({ 
                        headerRight: () => Screen.headerRight 
                            ? (
                                <View style={{ left: 12 }}>
                                    <Screen.headerRight />
                                </View>
                            )
                            : null
                    })
                }
            }, []);

            return <Screen.render />;
        });

    Object.assign(Configurations.SETTING_RENDERER_CONFIGS, Object.entries({
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
    .reduce((acc, obj) => ({ ...acc, ...obj }), {}));
};
