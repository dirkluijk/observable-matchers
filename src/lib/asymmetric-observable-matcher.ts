import { Observable } from 'rxjs';

export interface AsymmetricObservableMatcher<T> {
    asymmetricMatch(actual?: Observable<T>): boolean;
    jasmineToString?(): string;
}
