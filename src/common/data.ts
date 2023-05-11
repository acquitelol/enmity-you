import { getIDByName } from "enmity/api/assets";

import { 
    Relationships,
    Breadcrumbs,
    Uppers, 
    Titles,
    Routes,
    Icons,
    Data
} from "@you/settings";

export const uppers: Uppers = {
    general: "ENMITY",
    plugins: "ENMITY_PLUGINS",
    themes: "ENMITY_THEMES",
    page: "ENMITY_PAGE"
};

export const routes: Routes = {
    general: "Enmity",
    plugins: "EnmityPlugins",
    themes: "EnmityThemes",
    page: "EnmityCustomPage"
};

export const titles: Titles = {
    general: "General",
    plugins: "Plugins",
    themes: "Themes",
    page: "Page"
};

export const icons: Icons = {
    general: { uri: 'https://files.enmity.app/icon-64.png' },
    plugins: getIDByName("ic_activity_24px"),
    themes: getIDByName("img_nitro_star"),
    page: null
};

export const breadcrumbs: Breadcrumbs = {
    general: [routes.general],
    plugins: [routes.general],
    themes: [routes.general],
    page: []
};

export const relationships: Relationships = {
    general: null,
    plugins: uppers.general,
    themes: uppers.general,
    page: null
};

export const data: Data = Object.keys(routes)
    .map(key => ({
        [key]: {
            upper: uppers[key],
            route: routes[key],
            title: titles[key],
            icon: icons[key],
            relationship: relationships[key],
            breadcrumbs: breadcrumbs[key]
        }
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {}) as unknown as Data;
