import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import hook from '../common/hook';

import { AncestorMetadataHook, Configurations } from '@you/props';
import { data, relationships } from '../common/data';

const AncestorMetadata: AncestorMetadataHook = getByProps("useSettingAncestorMetadata");
const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");

export default (Patcher: Patcher) => {
    hook(Patcher, AncestorMetadata, "useSettingAncestorMetadata", "ancestor");

    Object.assign(
        Configurations.SETTING_RELATIONSHIPS, 
        Object.keys(relationships)
            .map(relationshipKey => ({ [data[relationshipKey].upper]: data[relationshipKey].relationship }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
    );
};
