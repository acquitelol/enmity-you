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
};
