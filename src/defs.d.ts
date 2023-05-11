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
    import { Callback, AssignProperty } from "@you/utilities";
    import { Title, Upper } from "@you/data";
    import { Configuration } from "@you/config";
    import { useSettingsOverviewScreenLayout } from "@you/functions";

    export type SettingsOverviewScreenLayout = AssignProperty<"useSettingsOverviewScreenLayout", useSettingsOverviewScreenLayout>
    export type Configurations = {
        SETTING_RELATIONSHIPS: Record<Upper, Upper| null>;
        SETTING_RENDERER_CONFIGS: Record<Upper, Configuration>;
        getSettingTitleConfig: Callback<Record<Upper, Title>>;
    };

    export * as default from "@you/props";
}

declare module "@you/functions" {
    import { Scenes } from "@you/config";
    import { Callback } from "@you/utilities";
    import { Route, Title } from "@you/data";
    import { ReactElement } from "react";

    export type GetScreens = (UserID: string) => Scenes;
    export type useSettingsOverviewScreenLayout = Callback<({ title: Title, settings: Route[] })[]>
    export type FunctionalComponent = Callback<ReactElement>;

    export * as default from "@you/functions";
}

declare module "@you/config" {
    import { Icon } from "@you/data";
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
    }

    export * as default from "@you/config";
}

declare module "@you/data" {
    export type Upper = string;
    export type Route = string;
    export type Title = string | null;
    export type Icon = { uri: string } | number | null;
    export type Breadcrumbs = (string | undefined)[];
    
    export * as default from "@you/data";
}

declare module "@you/settings" {
    import { ExtractSetT } from "@you/utilities";
    import { Route, Title, Icon, Breadcrumbs as Breadcrumb, Upper } from "@you/data";

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

    export type Data = Set<{
        upper: ExtractSetT<Uppers>;
        route: ExtractSetT<Routes>;
        title: ExtractSetT<Titles>;
        icon: ExtractSetT<Icons>;
        relationship: ExtractSetT<Relationships>,
        breadcrumbs: ExtractSetT<Breadcrumbs>
    }>;

    export * as default from "@you/settings";
}

declare module "@you/utilities" {
    import { Set } from "@you/settings";

    export type AssignProperty<T extends string | symbol, U> = Record<T, U>;
    export type ExtractSetT<U extends Set<any>> = U extends Set<infer T> ? T : unknown;
    export type Callback<T> = () => T;

    export * as default from "@you/utilities";
}
