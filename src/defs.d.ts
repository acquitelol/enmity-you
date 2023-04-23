import { React } from 'enmity/metro/common';

export type Set<T> = {
    general: T;
    plugins: T;
    themes: T;
    page: T;
};

type PropExtractor<T> = T;
type AssignProp<T extends string | symbol, U> = Record<T, U>;

export type Scenes = { 
    [key: string]: {
        key?: string | number;
        title: string;
        render: () => any;
        headerRight?: () => any;
        headerLeft?: () => any;
    }
};
export type Screen = { 
    route: string, 
    getComponent: () => typeof React.ComponentType 
};
export type Route = string;
export type Title = string | null;
export type Icon = { uri: string } | number | null;
export type oBreadcrumbs = Array<string | undefined>;
export type Ancestor = ({ breadcrumbs: oBreadcrumbs, route: Route }) | null;

export type ExtractSetT<U extends Set<any>> = U extends Set<infer T> ? T : unknown;
export type Uppers = Set<string>;
export type Routes = Set<Screen["route"]>;
export type Titles = Set<Title>;
export type Icons = Set<Icon>;
export type Breadcrumbs = Set<oBreadcrumbs>;
export type Ancestors = Set<Ancestor>;
export type Screens = Set<Screen>;

export type Data = Set<{
    upper: ExtractSetT<Uppers>;
    route: ExtractSetT<Routes>;
    title: ExtractSetT<Titles>;
    icon: ExtractSetT<Icons>;
    ancestor: ExtractSetT<Ancestors>;
    screen: ExtractSetT<Screens>;
}>;

export type IconsHook = PropExtractor<AssignProp<"useSettingIcon", (setting: string) => Icon>>;
export type AncestorMetadataHook = PropExtractor<AssignProp<"useSettingAncestorMetadata", (setting: string) => Ancestor>>;
export type ScreensHook = PropExtractor<
    AssignProp<"useSettingScreen", (setting: string) => Screen> 
    & AssignProp<"useSettingScreens", () => ({ [key: string]: Screen })>>;
export type TitlesHook = PropExtractor<
    AssignProp<"useSettingTitle", (setting: string) => Title>
    & AssignProp<"useSettingTitles", () => { [key: string]: Title }>
    & AssignProp<"useSettingTitlePairs", Array<[Title, Route]>>>;

export type SettingTypes = "route" | "toggle" | "pressable" | "static" | "custom";
export type RenderSetting = (
    {}: { type: Omit<SettingTypes, "custom">; id: string; } 
    | { type: "custom", id: string, getComponent: () => any }
) => typeof React.ComponentType;
export type GetScreens = (UserID: string) => Scenes;