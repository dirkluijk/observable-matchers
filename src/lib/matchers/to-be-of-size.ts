import { Observable } from 'rxjs';

import { collect } from '../internals/collect';
import { isNextEvent } from '../observable-events';

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
    return collect(actual).filter((e) => isNextEvent(e)).length === size;
};
