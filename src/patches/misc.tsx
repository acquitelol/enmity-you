import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';
import hook from '../common/hook';

import { AncestorMetadataHook, Configurations, YouTab } from '@you/props';
import { data, relationships } from '../common/data';

const AncestorMetadata: AncestorMetadataHook = getByProps("useSettingAncestorMetadata");
const Configurations: Configurations = getByProps("SETTING_RENDERER_CONFIGS");
const YouTabHandler: YouTab = getByProps("isYouTabEnabled");

export default (Patcher: Patcher) => {
    hook(Patcher, AncestorMetadata, "useSettingAncestorMetadata", "ancestor");
    YouTabHandler && ["isYouTabEnabled", "useIsYouTabEnabled"].map(prop => Patcher.instead(YouTabHandler, prop, () => true));

    Object.assign(
        Configurations.SETTING_RELATIONSHIPS, 
        Object.keys(relationships)
            .map(relationshipKey => ({ [data[relationshipKey].upper]: data[relationshipKey].relationship }))
            .reduce((acc, obj) => ({ ...acc, ...obj }), {})
    );
};
