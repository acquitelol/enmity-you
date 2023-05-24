import { getIDByName } from "enmity/api/assets";
import { getByName } from "enmity/metro";
import { React } from "enmity/metro/common";
import { View } from "enmity/components";

import { FunctionalComponent } from '@you/functions';
import { Screen } from "@you/config";
import { Upper, Route, Title, Icon, Relationship, Breadcrumbs } from "@you/data";
import { Set } from "@you/utilities";

export const uppers: Set<Upper> = {
    general: "ENMITY",
    plugins: "ENMITY_PLUGINS",
    themes: "ENMITY_THEMES",
    page: "ENMITY_PAGE"
};

export const routes: Set<Route> = {
    general: "Enmity",
    plugins: "EnmityPlugins",
    themes: "EnmityThemes",
    page: "EnmityCustomPage"
};

export const titles: Set<Title> = {
    general: "General",
    plugins: "Plugins",
    themes: "Themes",
    page: "Page"
};

export const icons: Set<Icon> = {
    general: { uri: 'https://files.enmity.app/icon-64.png' },
    plugins: getIDByName("ic_activity_24px"),
    themes: getIDByName("img_nitro_star"),
    page: null
};

export const breadcrumbs: Set<Breadcrumbs> = {
    general: [routes.general],
    plugins: [routes.general],
    themes: [routes.general],
    page: []
};

export const relationships: Set<Relationship> = {
    general: null,
    plugins: uppers.general,
    themes: uppers.general,
    page: null
};

const { Enmity, EnmityPlugins, EnmityThemes } = getByName("getScreens")({});
const [ Plugins, Themes ] = [ EnmityPlugins, EnmityThemes ].map(
    (Screen) => ({ navigation, route }) => {
        React.useEffect(() => {
            if (!route?.hasSetHeaderRight) {
                route.hasSetHeaderRight = true;
                
                navigation.setOptions({
                    headerRight: () => (
                        <View style={{ left: 12 }}>
                            <Screen.headerRight />
                        </View>
                    ),
                });
            }
        }, []);

        return <Screen.render />;
    }
);

export const screens: Set<Screen> = {
    general: {
        route: routes.general,
        getComponent: () => Enmity.render,
    },
    plugins: {
        route: routes.plugins,
        getComponent: () => Plugins as FunctionalComponent,
    },
    themes: {
        route: routes.themes,
        getComponent: () => Themes as FunctionalComponent,
    },
    page: {
        route: routes.page,
        getComponent: () => (({ navigation, route: { params } }) => {
            const Component = params.pagePanel ?? View;

            React.useEffect(() => {
                if (params.pageName && !params.hasSetTitle) {
                    params.hasSetTitle = true;
                    navigation.setOptions({ title: params.pageName });
                }
            }, []);

            return <Component />;
        }) as FunctionalComponent,
    }
}

export const data = Object.keys(routes)
    .map(key => ({
        [key]: {
            upper: uppers[key] as Upper,
            route: routes[key] as Route,
            title: titles[key] as Title,
            icon: icons[key] as Icon,
            relationship: relationships[key] as Relationship,
            breadcrumbs: breadcrumbs[key] as Breadcrumbs,
            screen: screens[key] as Screen
        }
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});
