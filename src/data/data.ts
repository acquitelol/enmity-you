import { getIDByName } from "enmity/api/assets";
import { Ancestors, Breadcrumbs, Data, Icons, Routes, Screens, Titles, Uppers } from "../def";

import { getEnabledPlugins, getDisabledPlugins } from "enmity/managers/plugins";
import { listThemes, getTheme } from "enmity/managers/themes";
import { generateBreadcrumbs, generateIcons, generateRoutes, generateTitles, generateUppers } from "./generate";

const createGenerator = (generator: Function) => ({
    ...generator(getEnabledPlugins()),
    ...generator(getDisabledPlugins()),
    ...generator(listThemes().map(theme => theme.name))
})

export const states = ["Enabled", "Disabled"]
export const base: string[] = ["general", "plugins", "themes", "page"];

export const uppers: Uppers = {
    general: "ENMITY",
    plugins: "ENMITY_PLUGINS",
    themes: "ENMITY_THEMES",
    page: "ENMITY_PAGE",
    // ...createGenerator(generateUppers)
};

export const routes: Routes = {
    general: "Enmity",
    plugins: "EnmityPlugins",
    themes: "EnmityThemes",
    page: "EnmityCustomPage",
    // ...createGenerator(generateRoutes)
};

export const titles: Titles = {
    general: "General",
    plugins: "Plugins",
    themes: "Themes",
    page: "Page",
    // ...createGenerator(generateTitles)
};

export const icons: Icons = {
    general: { uri: 'https://files.enmity.app/icon-64.png' },
    plugins: getIDByName("ic_activity_24px"),
    themes: getIDByName("img_nitro_star"),
    page: null,
    // ...createGenerator(generateIcons)
};

export const breadcrumbs: Breadcrumbs = {
    general: ["Enmity"],
    plugins: ["Enmity"],
    themes: ["Enmity"],
    page: [],
    // ...generateBreadcrumbs(getEnabledPlugins(), "Plugins", () => states[0]),
    // ...generateBreadcrumbs(getDisabledPlugins(), "Plugins", () => states[1]),
    // ...generateBreadcrumbs(listThemes().map(theme => theme.name), "Themes", (theme) => states[theme === getTheme() ? 0 : 1])
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