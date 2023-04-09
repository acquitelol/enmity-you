import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import insteadPatchHook from '../insteadPatchHook';
import { data } from '../data';

const Icons = getByProps("useSettingIcon");
const AncestorMetadata = getByProps("useSettingAncestorMetadata");
const Relationships = getByProps("useSettingRelationships");

export default (Patcher: Patcher) => {
    insteadPatchHook(Patcher, Icons, "useSettingIcon", "icon");
    insteadPatchHook(Patcher, AncestorMetadata, "useSettingAncestorMetadata", "ancestor");

    Patcher.after(Relationships, "useSettingRelationships", (_, __, res) => {
        return {
            ...res,
            [data.base.upper]: data.base.upper,
            [data.plugins.upper]: data.base.upper,
            [data.themes.upper]: data.base.upper,
            [data.page.upper]: data.base.upper
        }
    });
};
