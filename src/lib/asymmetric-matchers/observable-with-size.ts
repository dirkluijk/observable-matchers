import { Observable } from 'rxjs';

import { AsymmetricObservableMatcher } from '../asymmetric-observable-matcher';
import { collect } from '../internals/collect';
import { isNextEvent } from '../observable-events';

export function observableWithSize<T>(size: number): AsymmetricObservableMatcher<T> {
    return {
        asymmetricMatch(actual: Observable<T>): boolean {
            return collect(actual).filter((e) => isNextEvent(e)).length === size;
        }
    };
}
