import { Observable } from 'rxjs';

import { AsymmetricObservableMatcher } from '../asymmetric-observable-matcher';
import { collect } from '../internals/collect';
import { isCompletedEvent } from '../observable-events';

export function completedObservable<T>(): AsymmetricObservableMatcher<T> {
    return {
        asymmetricMatch(actual: Observable<T>): boolean {
            return collect(actual).some((e) => isCompletedEvent(e));
        }
    };
}
