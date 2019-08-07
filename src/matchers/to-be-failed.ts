import { Observable } from 'rxjs';

import { failedObservable } from '../lib/asymmetric-matchers';

export type ToBeFailed<T> = (actual?: Observable<T>) => boolean;

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBeFailed: T extends Observable<infer U> ? ToBeFailed<U> : never;
        }
    }

    namespace jest {
        interface Matchers<R> {
            toBeFailed: R extends Observable<infer U> ? ToBeFailed<U> : never;
        }
    }
}

export const toBeFailed: ToBeFailed<unknown> = <T>(actual?: Observable<T>) => {
    return failedObservable().asymmetricMatch(actual);
};
