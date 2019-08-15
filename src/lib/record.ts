import { Observable, ReplaySubject } from 'rxjs';

export function record<T>(obs: Observable<T>): Observable<T> {
    const subject = new ReplaySubject<T>();

    obs.subscribe(subject);

    return subject.asObservable();
}
