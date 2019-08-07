import { Observable } from 'rxjs';

import { completed, error, next, ObservableEvent } from '../observable-events';

export function collect<T>(input$?: Observable<T>): ObservableEvent<T>[] {
    if (!input$) {
        return [];
    }

    const collected: ObservableEvent<T>[] = [];

    const subscription = input$.subscribe({
        next: (x) => collected.push(next(x)),
        error: (e) => collected.push(error(e)),
        complete: () => collected.push(completed())
    });

    subscription.unsubscribe();

    return collected;
}
