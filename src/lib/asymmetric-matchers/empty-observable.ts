import { Observable } from 'rxjs';

import { AsymmetricObservableMatcher } from '../asymmetric-observable-matcher';
import { collect } from '../internals/collect';
import { isNextEvent } from '../observable-events';

export function emptyObservable<T>(): AsymmetricObservableMatcher<T> {
    return {
        asymmetricMatch(actual: Observable<T>): boolean {
            return collect(actual).every((e) => !isNextEvent(e));
        }
    };
}
