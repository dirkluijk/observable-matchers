import { Observable } from 'rxjs';

import { AsymmetricObservableMatcher } from '../asymmetric-observable-matcher';
import { collect } from '../internals/collect';
import { equals } from '../internals/equals';
import { format } from '../internals/format';
import { ObservableEvent } from '../observable-events';

// copied from jasmine to make it compatible with Jest
type ExpectedRecursive<T> = T | jasmine.Any | {
    [K in keyof T]: ExpectedRecursive<T[K]> | jasmine.Any;
};

type Expected<T> = T | jasmine.Any | {
    [K in keyof T]: ExpectedRecursive<T[K]>;
};

export function observable<T, E extends T = T>(...expected: ObservableEvent<Expected<E>>[]): AsymmetricObservableMatcher<T> {
    return {
        asymmetricMatch(actual: Observable<T>): boolean {
            return equals(collect(actual), expected);
        },
        jasmineToString(): string {
            return format(expected);
        }
    };
}
