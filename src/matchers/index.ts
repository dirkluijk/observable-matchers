import { addMatchers } from 'add-matchers';

import * as matchersByName from './matchers-by-name';

addMatchers(matchersByName);

export default matchersByName;
