import { Patcher } from 'enmity/patcher';

import patchScreens from "./screens";
import patchTitles from "./titles";
import patchMisc from "./misc";
import patchRender from "./render";
import patchSearch from "./search";

const patchDependent = (Patcher: Patcher) => (patchScreens(), patchSearch(Patcher));

export { patchTitles, patchMisc, patchRender, patchDependent };
