import { Observable } from 'rxjs';

import { collect } from '../internals/collect';
import { isCompletedEvent } from '../observable-events';

export type ToBeCompleted<T> = (actual?: Observable<T>) => boolean;

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toBeCompleted: T extends Observable<infer U> ? ToBeCompleted<U> : never;
        }
    }

    namespace jest {
        interface Matchers<R> {
            toBeCompleted: R extends Observable<infer U> ? ToBeCompleted<U> : never;
        }
    }
}

export const toBeCompleted: ToBeCompleted<unknown> = <T> (actual?: Observable<T>) => {
    return collect(actual).some((e) => isCompletedEvent(e));
};
