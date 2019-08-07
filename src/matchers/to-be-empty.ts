import { Observable } from 'rxjs';

import { emptyObservable } from '../lib/asymmetric-matchers';

export type ToBeEmpty<T> = (actual?: Observable<T>) => boolean;

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBeEmpty: T extends Observable<infer U> ? ToBeEmpty<U> : never;
        }
    }

    namespace jest {
        interface Matchers<R> {
            toBeEmpty: R extends Observable<infer U> ? ToBeEmpty<U> : never;
        }
    }
}

export const toBeEmpty: ToBeEmpty<unknown> = <T>(actual?: Observable<T>) => {
    return emptyObservable().asymmetricMatch(actual);
};
