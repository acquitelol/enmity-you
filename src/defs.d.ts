declare module "@you" {
    export * as hooks from "@you/props";
    export * as functions from "@you/functions";
    export * as modules from "@you/modules";
    export * as data from "@you/data";
    export * as settings from "@you/settings";
    export * as utilities from "@you/utilities";

    export * as default from "@you";
}

declare module "@you/props" {
    import { AssignProperty } from "@you/utilities";
    import { Ancestor, Route, Title, Upper } from "@you/data";
    import { Configuration } from "@you/config";

    export type AncestorMetadataHook = AssignProperty<"useSettingAncestorMetadata", (setting: string) => Ancestor>;
    export type Configurations = {
        SETTING_RELATIONSHIPS: { [key: Upper]: Upper | null };
        SETTING_RENDERER_CONFIGS: { [key: Upper]: Configuration };
        getSettingTitle: (setting: string) => Title;
        getSettingTitles: () => { [key: Route]: Title };
        transformSettingTitle: (title: Title) => Title;
    }
    export type YouTab = {
        isYouTabEnabled: () => boolean;
        useIsYouTabEnabled: () => boolean;
    }

    export * as default from "@you/props";
}

declare module "@you/functions" {
    import { Scenes } from "@you/config";
    export type GetScreens = (UserID: string) => Scenes;
    export * as default from "@you/functions";
}

declare module "@you/modules" {
    export type SettingsOverviewScreen = { default: (self: typeof globalThis, args: any[]) => any };
    export * as default from "@you/modules";
}

declare module "@you/config" {
    import { Icon } from "@you/data";

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
    export type Configuration = {
        type: "route",
        icon: Icon,
        screen: Screen
    }

    export * as default from "@you/config";
}

declare module "@you/data" {
    export type Upper = string;
    export type Route = string;
    export type Title = string | null;
    export type Icon = { uri: string } | number | null;
    export type Breadcrumbs = Array<string | undefined>;
    export type Ancestor =  ({ breadcrumbs: Breadcrumbs, route: Route }) | null;
    
    export * as default from "@you/data";
}

declare module "@you/settings" {
    import { ExtractSetT } from "@you/utilities";
    import { Route, Title, Icon, Breadcrumbs as Breadcrumb, Ancestor, Upper } from "@you/data";

    export type Set<T> = {
        general: T;
        plugins: T;
        themes: T;
        page: T;
    };

    export type Uppers = Set<Upper>;
    export type Routes = Set<Route>;
    export type Titles = Set<Title>;
    export type Icons = Set<Icon>;
    export type Breadcrumbs = Set<Breadcrumb>;
    export type Relationships = Set<string | null>
    export type Ancestors = Set<Ancestor>;

    export type Data = Set<{
        upper: ExtractSetT<Uppers>;
        route: ExtractSetT<Routes>;
        title: ExtractSetT<Titles>;
        icon: ExtractSetT<Icons>;
        relationship: ExtractSetT<Relationships>,
        ancestor: ExtractSetT<Ancestors>;
    }>;

    export * as default from "@you/settings";
}

declare module "@you/utilities" {
    import { Set } from "@you/settings";

    export type AssignProperty<T extends string | symbol, U> = Record<T, U>;
    export type ExtractSetT<U extends Set<any>> = U extends Set<infer T> ? T : unknown;

    export * as default from "@you/utilities";
}
