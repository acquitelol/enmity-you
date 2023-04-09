import { Users } from "enmity/metro/common";
import { getByName } from "enmity/metro";
import { getIDByName } from "enmity/api/assets";

const getScreens = getByName("getScreens");

export const uppers = {
    base: "ENMITY",
    plugins: "ENMITY_PLUGINS",
    themes: "ENMITY_THEMES",
    page: "ENMITY_PAGE"
};

export const routes = {
    base: "Enmity",
    plugins: "EnmityPlugins",
    themes: "EnmityThemes",
    page: "EnmityCustomPage"
};

export const titles = {
    base: "General",
    plugins: "Plugins",
    themes: "Themes",
    page: "Page"
};

export const icons = {
    base: { uri: 'https://files.enmity.app/icon-64.png' },
    plugins: getIDByName("ic_activity_24px"),
    themes: getIDByName("img_nitro_star"),
    page: null
};

export const breadcrumbs = {
    base: ["Enmity"],
    plugins: ["Enmity"],
    themes: ["Enmity"],
    page: []
};

export const ancestors = Object.entries(routes)
    .map(([key, value]) => {
        return {
            [key]: {
                breadcrumbs: breadcrumbs[key],
                route: value
            }
        }
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

export const screens = Object.entries(routes)
    .map(([key, value]) => {
        return {
            [key]: {
                route: value,
                getComponent: () => getScreens(Users.getCurrentUser())[value].render
            }
        }
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

export const data = Object.entries(routes)
    .map(([key, value]) => {
        return {
            [key]: {
                upper: uppers[key],
                route: value,
                title: titles[key],
                icon: icons[key],
                ancestor: ancestors[key],
                screen: screens[key]
            }
        }
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});