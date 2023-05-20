/// <reference types="react" />

declare module "@you" {
    export * as props from "@you/props";
    export * as functions from "@you/functions";
    export * as config from "@you/config";
    export * as data from "@you/data";
    export * as settings from "@you/settings";
    export * as utilities from "@you/utilities";

    export * as default from "@you";
}

declare module "@you/props" {
    import { Callback } from "@you/utilities";
    import { Title, Upper } from "@you/data";
    import { Configuration, Screen, GetSearchListItemResult } from "@you/config";
    import { UseSettingSearch } from "@you/functions";
    import { ReactElement } from "react";
    import { FormDivider } from "enmity/components";

    export type SettingsOverviewScreen = { default: (self: typeof globalThis, args: any[]) => ReactElement };
    export type Configurations = {
        SETTING_RELATIONSHIPS: Record<Upper, Upper| null>;
        SETTING_RENDERER_CONFIGS: Record<Upper, Configuration>;
        getSettingTitleConfig: Callback<Record<Upper, Title>>;
    };
    export type Search = {
        useSettingSearch: UseSettingSearch;
    }
    export type Getters = {
        getSettingListItemSeparator(index: number, total: number): typeof FormDivider;
        getSettingListItemStyle(index: number, total: number): [false, false, Record<string, any>];
        getSettingScreens(): [Upper, Screen][];
        getSettingSearchListItems(results: Upper[]): GetSearchListItemResult[];
        getSettingTitle(upper: Upper): Title;
        getSettingTitles(): [Upper, Title][];
        onRouteSettingOnPress(parameters: { 
            navigation: Record<string, any>; 
            screen: Screen, 
            canNavigate?: boolean 
        }): undefined;
    }

    export * as default from "@you/props";
}

declare module "@you/functions" {
    import { Scenes, UseSettingSearchResults } from "@you/config";
    import { Callback } from "@you/utilities";
    import { ReactElement } from "react";

    export type GetScreens = (object: { [key: string]: any }) => Scenes;
    export type FunctionalComponent = Callback<ReactElement>;
    export type UseSettingSearch = Callback<UseSettingSearchResults>;

    export * as default from "@you/functions";
}

declare module "@you/config" {
    import { Upper, Title, Breadcrumb, Icon } from "@you/data";
    import { FunctionalComponent } from "@you/functions";

    export type Scenes = { 
        [key: string]: {
            key?: string | number;
            title: string;
            render: FunctionalComponent;
            headerRight?: FunctionalComponent;
            headerLeft?: FunctionalComponent;
        }
    };
    export type Screen = { 
        route: string;
        getComponent: FunctionalComponent;
    };
    export type Configuration = {
        type: "route";
        icon: Icon;
        screen: Screen;
    };
    export type UseSettingSearchResults = {
        onChangeText(): void;
        text: string;
        clearText(): void;
        results: Upper[];
    };
    export type GetSearchListItemResult = {
        type: 'setting_search_result';
        ancestorRendererData: Configuration;
        setting: Upper;
        title: Title;
        breadcrumbs: Breadcrumb;
        icon: Icon;
        index: number;
        total: number;
    };

    export * as default from "@you/config";
}

declare module "@you/data" {
    export type Upper = string;
    export type Route = string;
    export type Title = string | null;
    export type Icon = { uri: string } | number | null;
    export type Relationship = Upper | null;
    export type Breadcrumb = (string | undefined)[];
    export type Keyword = (string | undefined)[];
    
    export * as default from "@you/data";
}

declare module "@you/settings" {
    import { Route, Title, Icon, Relationship, Breadcrumb, Upper, Keyword } from "@you/data";

    export type Set<T> = {
        general: T;
        plugins: T;
        themes: T;
        page: T;
    };

    export type Data = Set<{
        upper: Upper;
        route: Route;
        title: Title;
        icon: Icon;
        relationship: Relationship;
        breadcrumbs: Breadcrumb;
        keywords: Keyword;
    }>;

    export * as default from "@you/settings";
}

declare module "@you/utilities" {
    import { Set } from "@you/settings";

    export type Extract<U extends Set<any>> = U extends Set<infer T> ? T : unknown;
    export type Callback<T> = () => T;

    export * as default from "@you/utilities";
}
