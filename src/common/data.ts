import { getIDByName } from "enmity/api/assets";

import { Set, Data } from "@you/settings";
import { Upper, Route, Title, Icon, Relationship, Breadcrumb, Keyword } from "@you/data";

const bases: (keyof Set<null>)[] = ["general", "plugins", "themes", "page"];

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

export const breadcrumbs: Set<Breadcrumb> = {
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

export const keywords: Set<Keyword> = {
    general: [routes.general, titles.general!],
    plugins: [routes.general, titles.plugins!],
    themes: [routes.general, titles.themes!],
    page: []
}

export const data = Object.keys(routes)
    .map((key) => ({
        [key]: {
            upper: uppers[key] as Upper,
            route: routes[key] as Route,
            title: titles[key] as Title,
            icon: icons[key] as Icon,
            relationship: relationships[key] as Relationship,
            breadcrumbs: breadcrumbs[key] as Breadcrumb,
            keywords: keywords[key] as Keyword
        }
    }))
    .reduce((acc, obj) => 
        ({ ...acc, ...obj }), {});