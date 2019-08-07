import { Observable } from 'rxjs';

import { observable } from '../lib/asymmetric-matchers';
import { ObservableEvent } from '../lib/observable-events';

export type ToBeObservable<T> = (
    expected: ObservableEvent<T | jasmine.Any>[],
    actual?: Observable<T>
) => boolean;

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBeObservable: T extends Observable<infer U> ? ToBeObservable<U> : never;
        }
    }

    namespace jest {
        interface Matchers<R> {
            toBeObservable: R extends Observable<infer U> ? ToBeObservable<U> : never;
        }
    }
}

export const toBeObservable: ToBeObservable<unknown> = <T> (expected: ObservableEvent<T | jasmine.Any>[], actual?: Observable<T>) => {
    return observable(...expected).asymmetricMatch(actual);
};
