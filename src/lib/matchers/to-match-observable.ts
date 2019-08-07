import { Observable } from 'rxjs';

import { collect } from '../internals/collect';
import { equals } from '../internals/equals';
import { ObservableEvent } from '../observable-events';

export type ToMatchObservable<T> = (
    expected: ObservableEvent<Partial<T> | jasmine.Any>[],
    actual?: Observable<T>
) => boolean;

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toMatchObservable: T extends Observable<infer U> ? ToMatchObservable<U> : never;
        }
    }

    // not supported yet
    // namespace jest {
    //     interface Matchers<R> {
    //         toMatchObservable: R extends Observable<infer U> ? ToMatchObservable<U> : never;
    //     }
    // }
}

export const toMatchObservable: ToMatchObservable<unknown> = <T>(expected: ObservableEvent<Partial<T>>[], actual?: Observable<T>) => {
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

            if (!equals(collectedEvent.value, jasmine.objectContaining(expectedEvent.value))) {
                return true;
            }
        } else if (!equals(collectedEvent, expectedEvent)) {
            return true;
        }

        return false;
    });
};
