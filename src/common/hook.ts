import { Patcher } from 'enmity/patcher';
import { findInTree } from 'enmity/utilities';
import { data } from './data';

import { ExtractSetT } from '@you/utilities';
import { Data } from '@you/settings';

export default <T>(Patcher: Patcher, mdl: T, func: keyof T, type: keyof ExtractSetT<Data>) => {
    Patcher.instead(mdl, func as string, (self, args, orig) => {
        const predicate = findInTree(
            data, node => node.upper === args[0], 
            { walkable: Object.keys(data) }
        );

        if (!predicate) return orig.apply(self, args);
        return predicate[type];
    });
};
