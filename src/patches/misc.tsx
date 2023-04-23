import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import hook from '../common/hook';

import { IconsHook, AncestorMetadataHook } from '@you/hooks';

const Icons: IconsHook = getByProps("useSettingIcon");
const AncestorMetadata: AncestorMetadataHook = getByProps("useSettingAncestorMetadata");

export default (Patcher: Patcher) => {
    hook(Patcher, Icons, "useSettingIcon", "icon");
    hook(Patcher, AncestorMetadata, "useSettingAncestorMetadata", "ancestor");
};
