import { Observable } from 'rxjs';

import { observableWithSize } from '../lib/asymmetric-matchers';

export type ToBeOfSize<T> = (size: number, actual?: Observable<T>) => boolean;

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBeOfSize: T extends Observable<infer U> ? ToBeOfSize<U> : never;
        }
    }

    namespace jest {
        interface Matchers<R> {
            toBeOfSize: R extends Observable<infer U> ? ToBeOfSize<U> : never;
        }
    }
}

export const toBeOfSize: ToBeOfSize<unknown> = <T>(size: number, actual?: Observable<T>) => {
    return observableWithSize(size).asymmetricMatch(actual);
};
