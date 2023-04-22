import { getIDByName } from "enmity/api/assets";
import { Ancestors, Breadcrumbs, Data, Icons, Routes, Screens, Titles, Uppers } from "../def";

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
    general: ["Enmity"],
    plugins: ["Enmity"],
    themes: ["Enmity"],
    page: []
};

export const ancestors: Ancestors = Object.entries(routes)
    .map(([key, value]) => ({
        [key]: {
            breadcrumbs: breadcrumbs[key],
            route: value
        }
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {}) as unknown as Ancestors;

export const screens: Screens = Object.entries(routes)
    .map(([key, value]) => ({
        [key]: {
            route: value,
            getComponent: () => {}
        }
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {}) as unknown as Screens;

export const data: Data = Object.entries(routes)
    .map(([key, value]) => ({
        [key]: {
            upper: uppers[key],
            route: value,
            title: titles[key],
            icon: icons[key],
            ancestor: ancestors[key],
            screen: screens[key]
        }
    }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {}) as unknown as Data;