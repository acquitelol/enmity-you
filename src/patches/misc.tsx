import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import insteadPatchHook from '../insteadPatchHook';

const Icons = getByProps("useSettingIcon");
const AncestorMetadata = getByProps("useSettingAncestorMetadata");

export default (Patcher: Patcher) => {
    insteadPatchHook(Patcher, Icons, "useSettingIcon", "icon");
    insteadPatchHook(Patcher, AncestorMetadata, "useSettingAncestorMetadata", "ancestor");
};
