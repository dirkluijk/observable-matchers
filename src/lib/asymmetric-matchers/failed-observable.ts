import { Observable } from 'rxjs';

import { AsymmetricObservableMatcher } from '../asymmetric-observable-matcher';
import { collect } from '../internals/collect';
import { isErrorEvent } from '../observable-events';

export function failedObservable<T>(): AsymmetricObservableMatcher<T> {
    return {
        asymmetricMatch(actual: Observable<T>): boolean {
            return collect(actual).some((e) => isErrorEvent(e));
        }
    };
}
