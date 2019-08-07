import { Observable } from 'rxjs';

import { collect } from '../internals/collect';
import { equals } from '../internals/equals';
import { ObservableEvent } from '../observable-events';

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
    return equals(collect(actual), expected);
};
