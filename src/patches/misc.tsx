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
        const relationships = Object.keys(data)
            .map(key => ({ [data[key].upper]: data.general.upper }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {});

        return {
            ...res,
            ...relationships
        }
    });
};
