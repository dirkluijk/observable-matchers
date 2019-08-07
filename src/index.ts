import { Observable } from 'rxjs';

import { AsymmetricObservableMatcher } from './lib/asymmetric-observable-matcher';

export * from './lib/observable-events';

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toEqual(expected: T extends Observable<infer U> ? AsymmetricObservableMatcher<U> : any, expectationFailOutput?: any): boolean;
        }
    }

    namespace jest {
        interface Matchers<R> {
            toEqual(expected: R extends Observable<infer U> ? AsymmetricObservableMatcher<U> : any, expectationFailOutput?: any): boolean;
        }
    }
}

export * from './lib/asymmetric-matchers';
