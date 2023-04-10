export interface Set<T> {
    general: T;
    plugins: T;
    themes: T;
    page: T
}

export type ExtractSetT<C extends Set<any>> = C extends Set<infer T> ? T : unknown;
export type Uppers = Set<string>;
export type Routes = Set<string>;
export type Titles = Set<string>;
export type Icons = Set<{ uri: string} | number | null>;
export type Breadcrumbs = Set<Array<string | undefined>>;
export type Ancestors = Set<{ breadcrumbs: Breadcrumbs["general"], route: Routes["general"] }>;
export type Screens = Set<{ route: ExtractSetT<Routes>, getComponent: () => any }>;

export type Data = Set<{
    upper: ExtractSetT<Uppers>;
    route: ExtractSetT<Routes>;
    title: ExtractSetT<Titles>;
    icon: ExtractSetT<Icons>;
    ancestor: ExtractSetT<Ancestors>;
    screen: ExtractSetT<Screens>;
}>