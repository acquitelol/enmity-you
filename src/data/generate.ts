const create = (addonList: string[], callback: (addon: string) => any) => addonList
    .map((addon: string) => ({ [addon.toLowerCase()]: callback(addon) }))
    .reduce((acc: Record<string, any>, obj: Record<string, any>) => ({ ...acc, ...obj }), {});;

export const generateUppers = (addonList: string[]) => create(addonList, addon => `ENMITY_${addon.toUpperCase()}`);
export const generateRoutes = (addonList: string[]) => create(addonList, addon => `Enmity${addon}`);
export const generateTitles = (addonList: string[]) => create(addonList, addon => addon);
export const generateIcons = (addonList: string[]) => create(addonList, () => null);
export const generateBreadcrumbs = (addonList: string[], typeOfAddons: "Plugins" | "Themes", enabled: (addon: string) => "Enabled" | "Disabled" | string) => 
    create(addonList, addon => ["Enmity", typeOfAddons, addon, enabled(addon)]);
