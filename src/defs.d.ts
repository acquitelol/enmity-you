/// <reference types="react" />

declare module "@you" {
    export * as modules from "@you/modules";
    export * as functions from "@you/functions";
    export * as config from "@you/config";
    export * as data from "@you/data";
    export * as utilities from "@you/utilities";

    export * as default from "@you";
}

declare module "@you/modules" {
    import { Title, Upper } from "@you/data";
    import { Configuration, Screen, UseSettingSearchResults, GetSearchListItemResult } from "@you/config";
    import { ReactElement } from "react";
    import { FormDivider } from "enmity/components";

    export type SettingsOverviewScreen = { default: (self: typeof globalThis, args: any[]) => ReactElement };
    export type Configurations = {
        SETTING_RELATIONSHIPS: Record<Upper, Upper| null>;
        SETTING_RENDERER_CONFIGS: Record<Upper, Configuration>;
        getSettingTitleConfig(): Record<Upper, Title>;
    };
    export type Search = {
        useSettingSearch(): UseSettingSearchResults;
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

    export * as default from "@you/modules";
}

declare module "@you/functions" {
    import { Scenes } from "@you/config";
    import { ReactElement } from "react";

    export type GetScreens = (object: { [key: string]: any }) => Scenes;
    export type FunctionalComponent = () => ReactElement;

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
        type: "setting_search_result";
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

declare module "@you/utilities" {
    export type Set<T> = {
        general: T;
        plugins: T;
        themes: T;
        page: T;
    };

    export * as default from "@you/utilities";
}
