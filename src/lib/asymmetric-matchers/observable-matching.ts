import { Observable } from 'rxjs';

import { AsymmetricObservableMatcher } from '../asymmetric-observable-matcher';
import { collect } from '../internals/collect';
import { equals } from '../internals/equals';
import { format } from '../internals/format';
import { ObservableEvent } from '../observable-events';

export function observableMatching<T, E extends Partial<T>>(...expected: ObservableEvent<E>[]): AsymmetricObservableMatcher<T> {
    return {
        asymmetricMatch(actual: Observable<T>): boolean {
            const collected = collect(actual);

            return !expected.some((expectedEvent, i) => {
                const collectedEvent = collected[i];

                if (!expectedEvent.completed && !expectedEvent.failed) {
                    if (collectedEvent.failed) {
                        return true;
                    }

                    if (collectedEvent.completed) {
                        return true;
                    }

                    const value = expectedEvent.value;

                    if (!equals(collectedEvent.value, jasmine.objectContaining(value))) {
                        return true;
                    }
                } else if (!equals(collectedEvent, expectedEvent)) {
                    return true;
                }

                return false;
            });
        },
        jasmineToString(): string {
            return format(expected);
        }
    };
}
