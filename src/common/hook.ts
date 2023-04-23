import { Patcher } from 'enmity/patcher';
import { findInTree } from 'enmity/utilities';
import { data } from './data';

export default <T>(Patcher: Patcher, mdl: { [key: string]: T }, func: string, type: string) => {
    Patcher.instead(mdl, func as string, (self, args, orig) => {
        const predicate = findInTree(
            data, node => node.upper === args[0], 
            { walkable: Object.keys(data) }
        );

        if (!predicate) return orig.apply(self, args);
        return predicate[type];
    });
};
