declare module "@you" {
    export * as hooks from "@you/hooks";
    export * as functions from "@you/functions";
    export * as modules from "@you/modules";
    export * as data from "@you/data";
    export * as settings from "@you/settings";
    export * as utilities from "@you/utilities";

    export * as default from "@you";
}

declare module "@you/hooks" {
    import { AssignProperties } from "@you/utilities";
    import { Icon, Ancestor, Route, Title } from "@you/data";

    export type IconsHook = AssignProperties<"useSettingIcon", (setting: string) => Icon>;
    export type AncestorMetadataHook = AssignProperties<"useSettingAncestorMetadata", (setting: string) => Ancestor>;
    export type ScreensHook = AssignProperties<"useSettingScreen", (setting: string) => Screen> 
        & AssignProperties<"useSettingScreens", () => ({ [key: string]: Screen })>;
    export type TitlesHook = AssignProperties<"useSettingTitle", (setting: string) => Title>
        & AssignProperties<"useSettingTitles", () => { [key: Route]: Title }>
        & AssignProperties<"useSettingTitlePairs", Array<[Title, Route]>>;

    export * as default from "@you/hooks";
}

declare module "@you/functions" {
    import { Scenes } from "@you/data";

    export type SettingTypes = "route" | "toggle" | "pressable" | "static" | "custom";
    export type RenderSetting = (
        {}: { type: Omit<SettingTypes, "custom">; id: string; } 
        | { type: "custom", id: string, getComponent: () => any }
    ) => any;
    export type GetScreens = (UserID: string) => Scenes;
   

    export * as default from "@you/functions";
}

declare module "@you/modules" {
    import { RenderSetting } from "@you/functions";

    export type SettingsOverviewScreen = { default: (self: typeof globalThis, args: any[]) => any };
    export type SettingsRenderables = {
        SettingIcon: () => any;
        SettingTrailingArrow: () => any;
        SettingTrailingValue: () => any;
        renderSetting: RenderSetting;
    }

    export * as default from "@you/modules";
}

declare module "@you/data" {
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
        getComponent: () => any
    };
    export type Route = string;
    export type Title = string | null;
    export type Icon = { uri: string } | number | null;
    export type oBreadcrumbs = Array<string | undefined>;
    export type Ancestor =  ({ breadcrumbs: oBreadcrumbs, route: Route }) | null;
    
    export * as default from "@you/data";
}

declare module "@you/settings" {
    import { ExtractSetT } from "@you/utilities";
    import { Screen, Title, Icon, oBreadcrumbs, Ancestor } from "@you/data";

    export type Set<T> = {
        general: T;
        plugins: T;
        themes: T;
        page: T;
    };

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

    export * as default from "@you/settings";
}

declare module "@you/utilities" {
    import { Set } from "@you/settings";

    export type AssignProperties<T extends string | symbol, U> = Record<T, U>;
    export type ExtractSetT<U extends Set<any>> = U extends Set<infer T> ? T : unknown;

    export * as default from "@you/utilities";
}
