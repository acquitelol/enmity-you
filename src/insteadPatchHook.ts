import { Patcher } from 'enmity/patcher';
import { findInTree } from 'enmity/utilities';
import { data } from './data';

export default (Patcher: Patcher, object: any, func: string, type: string) => {
    Patcher.instead(object, func, (self, args, orig) => {
        const wanted = findInTree(
            data, node => node.upper === args[0], 
            { walkable: [ "base", "plugins", "themes" ] }
        );

        if (!wanted) return orig.apply(self, args);
        return wanted[type];
    });
};