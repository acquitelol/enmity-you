import { Patcher } from 'enmity/patcher';
import { findInTree } from 'enmity/utilities';
import { data } from './data/data';

export default (Patcher: Patcher, object: any, func: string, type: string) => {
    Patcher.instead(object, func, (self, args, orig) => {
        const predicate = findInTree(
            data, node => node.upper === args[0], 
            { walkable: Object.keys(data) }
        );

        console.log({ data, predicate, type });
        if (!predicate) return orig.apply(self, args);
        return predicate[type];
    });
};