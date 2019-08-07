export interface ObservableNextEvent<T> {
    value: T;
    completed: false;
    failed: false;
}

export interface ObservableErrorEvent<E> {
    error: E;
    completed: false;
    failed: true;
}

export interface ObservableCompletedEvent {
    completed: true;
    failed: false;
}

export type ObservableEvent<T, E = any> = ObservableNextEvent<T> | ObservableErrorEvent<E> | ObservableCompletedEvent;

export function next<T>(value: T): ObservableNextEvent<T> {
    return {
        value,
        completed: false,
        failed: false
    };
}

export function error<E>(e: E): ObservableErrorEvent<E> {
    return {
        error: e,
        completed: false,
        failed: true
    };
}

export function completed(): ObservableCompletedEvent {
    return {
        completed: true,
        failed: false
    };
}

export function isNextEvent<T>(event: ObservableEvent<T>): event is ObservableNextEvent<T> {
    return !event.completed && !event.failed;
}

export function isErrorEvent<E>(event: ObservableEvent<unknown, E>): event is ObservableErrorEvent<E> {
    return event.failed;
}

export function isCompletedEvent(event: ObservableEvent<unknown>): event is ObservableCompletedEvent {
    return event.completed;
}
