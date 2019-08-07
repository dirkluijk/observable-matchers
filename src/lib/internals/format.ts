import { isCompletedEvent, isErrorEvent, ObservableEvent } from '../observable-events';

function formatEvent(event: ObservableEvent<any | jasmine.Any>): string {
    if (isErrorEvent(event)) {
        return `X`;
    }

    if (isCompletedEvent(event)) {
        return `|`;
    }

    if (event.value.jasmineToString) {
        return `(${event.value.jasmineToString()})`;
    }

    return `(${event.value.toString()})`;
}

export function format(events: ObservableEvent<unknown>[]): string {
    return `-${events.map(formatEvent).join('-')}`;
}

export function formattable<E extends ObservableEvent<unknown>>(events: E[]): E[] & { toString(): string } {
    events.toString = () => format(events);

    return events;
}
