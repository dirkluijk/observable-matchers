import { addMatchers } from 'add-matchers';

import * as asymmetricMatchersByName from './lib/asymmetric-matchers-by-name';
import * as matchersByName from './lib/matchers-by-name';

addMatchers(matchersByName);
addMatchers.asymmetric(asymmetricMatchersByName);

export * from './lib/observable-events';

export default matchersByName;
