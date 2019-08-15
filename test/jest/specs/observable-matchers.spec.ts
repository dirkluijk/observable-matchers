import {
    completed, completedObservable,
    emptyObservable,
    error, failedObservable,
    next,
    observable,
    observableMatching, observableWithSize, record
} from '@dirkluijk/observable-matchers';
// tslint:disable:no-import-side-effect
import '@dirkluijk/observable-matchers/matchers';
import { concat, of, throwError, EMPTY, NEVER, Subject } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

interface Foo {
    value: string;
}

interface Bar {
    value: string;
    otherValue: string;
}

describe('Observable Matchers', () => {
    describe('Matchers', () => {
        it('should support empty streams', () => {
            const empty$ = EMPTY;

            expect(empty$).toBeObservable([completed()]);
            expect(empty$).toBeEmpty();
            expect(empty$).toBeCompleted();
            expect(empty$).not.toBeFailed();
            expect(empty$).toBeOfSize(0);
        });

        it('should support simple streams', () => {
            const completed$ = of(10, 20);
            const uncompleted$ = NEVER.pipe(startWith(10, 20));

            expect(completed$).toBeObservable([next(10), next(20), completed()]);
            expect(completed$).not.toBeEmpty();
            expect(completed$).toBeCompleted();
            expect(completed$).not.toBeFailed();
            expect(completed$).toBeOfSize(2);

            expect(uncompleted$).toBeObservable([next(10), next(20)]);
            expect(uncompleted$).not.toBeEmpty();
            expect(uncompleted$).not.toBeCompleted();
            expect(uncompleted$).not.toBeFailed();
            expect(uncompleted$).toBeOfSize(2);
        });

        it('should support partial matching', () => {
            const stream$ = of('aap', 'noot');

            expect(stream$).toBeObservable([
                next(expect.stringMatching('aap')),
                next(expect.anything()),
                completed()
            ]);

            expect(stream$).not.toBeEmpty();
            expect(stream$).toBeCompleted();
            expect(stream$).not.toBeFailed();
            expect(stream$).toBeOfSize(2);
        });

        it('should support error streams', () => {
            const error$ = concat(of(10, 20), throwError(new Error('x')));

            expect(error$).toBeObservable([
                next(10),
                next(20),
                error(new Error('x'))
            ]);

            expect(error$).not.toBeEmpty();
            expect(error$).not.toBeCompleted();
            expect(error$).toBeFailed();
            expect(error$).toBeOfSize(2);
        });

        it('should support complex streams', () => {
            const foo$ = of<Foo>(
                {value: 'aa'},
                {value: 'bb'}
            );

            expect(foo$).toBeObservable([
                next({value: 'aa'}),
                next({value: 'bb'}),
                completed(),
            ]);

            expect(foo$).not.toBeEmpty();
            expect(foo$).toBeCompleted();
            expect(foo$).not.toBeFailed();
            expect(foo$).toBeOfSize(2);
        });

        it('should support matching streams', () => {
            const bar$ = of<Bar>(
                {value: 'aa', otherValue: 'cc'},
                {value: 'bb', otherValue: 'dd'}
            );

            expect(bar$).toMatchObservable([
                next({value: 'aa'}),
                next({value: 'bb'}),
                completed(),
            ]);

            expect(bar$).toMatchObservable([
                next({otherValue: 'cc'}),
                next({otherValue: 'dd'}),
                completed(),
            ]);

            expect(bar$).not.toMatchObservable([
                next({value: 'cc'}),
                next({value: 'bb'}),
                completed(),
            ]);

            expect(bar$).not.toBeEmpty();
            expect(bar$).toBeCompleted();
            expect(bar$).not.toBeFailed();
            expect(bar$).toBeOfSize(2);
        });

        it('should not support async streams', () => {
            const completed$ = of(10, 20).pipe(delay(1000));

            expect(completed$).toBeEmpty();
            expect(completed$).not.toBeCompleted();
            expect(completed$).not.toBeFailed();
        });

        it('should support record and playback', () => {
            const subject = new Subject<string>();
            const recorded$ = record(subject);

            subject.next('foo');
            subject.next('bar');
            subject.next('baz');

            expect(subject).toBeEmpty();

            expect(recorded$).not.toBeEmpty();
            expect(recorded$).not.toBeCompleted();

            expect(recorded$).toBeObservable([
                next('foo'),
                next('bar'),
                next('baz')
            ]);

            subject.complete();

            expect(recorded$).toBeCompleted();
        });
    });

    describe('Asymmetric matchers', () => {
        it('should support empty streams', () => {
            const empty$ = EMPTY;

            expect(empty$).toEqual(observable(completed()));
            expect(empty$).toEqual(emptyObservable());
            expect(empty$).toEqual(completedObservable());
            expect(empty$).not.toEqual(failedObservable());
            expect(empty$).toEqual(observableWithSize(0));
        });

        it('should support simple streams', () => {
            const completed$ = of(10, 20);
            const uncompleted$ = NEVER.pipe(startWith(10, 20));

            expect(completed$).toEqual(observable(next(10), next(20), completed()));
            expect(completed$).not.toEqual(emptyObservable());
            expect(completed$).toEqual(completedObservable());
            expect(completed$).not.toEqual(failedObservable());
            expect(completed$).toEqual(observableWithSize(2));

            expect(uncompleted$).toEqual(observable(next(10), next(20)));
            expect(uncompleted$).not.toEqual(emptyObservable());
            expect(uncompleted$).not.toEqual(completedObservable());
            expect(uncompleted$).not.toEqual(failedObservable());
            expect(uncompleted$).toEqual(observableWithSize(2));
        });

        it('should support partial matching', () => {
            const stream$ = of('aap', 'noot');

            expect(stream$).toEqual(observable(
                next(expect.stringMatching('aap')),
                next(expect.anything()),
                completed()
            ));

            expect(stream$).not.toEqual(emptyObservable());
            expect(stream$).toEqual(completedObservable());
            expect(stream$).not.toEqual(failedObservable());
            expect(stream$).toEqual(observableWithSize(2));
        });

        it('should support error streams', () => {
            const error$ = concat(of(10, 20), throwError(new Error('x')));

            expect(error$).toEqual(observable(
                next(10),
                next(20),
                error(new Error('x'))
            ));

            expect(error$).not.toEqual(emptyObservable());
            expect(error$).not.toEqual(completedObservable());
            expect(error$).toEqual(failedObservable());
            expect(error$).toEqual(observableWithSize(2));
        });

        it('should support complex streams', () => {
            const foo$ = of<Foo>(
                {value: 'aa'},
                {value: 'bb'}
            );

            expect(foo$).toEqual(observable(
                next({value: 'aa'}),
                next({value: 'bb'}),
                completed(),
            ));

            expect(foo$).not.toEqual(emptyObservable());
            expect(foo$).toEqual(completedObservable());
            expect(foo$).not.toEqual(failedObservable());
            expect(foo$).toEqual(observableWithSize(2));
        });

        it('should support matching streams', () => {
            const bar$ = of<Bar>(
                {value: 'aa', otherValue: 'cc'},
                {value: 'bb', otherValue: 'dd'}
            );

            expect(bar$).toEqual(observableMatching(
                next({value: 'aa'}),
                next({value: 'bb'}),
                completed()
            ));

            expect(bar$).toEqual(observableMatching(
                next({otherValue: 'cc'}),
                next({otherValue: 'dd'}),
                completed(),
            ));

            expect(bar$).toEqual(observable(
                next({value: expect.stringMatching('a'), otherValue: expect.stringMatching('c')}),
                next({value: expect.stringMatching('b'), otherValue: expect.stringMatching('d')}),
                completed(),
            ));

            expect(bar$).not.toEqual(observableMatching(
                next({value: 'cc'}),
                next({value: 'bb'}),
                completed(),
            ));

            expect(bar$).not.toEqual(emptyObservable());
            expect(bar$).toEqual(completedObservable());
            expect(bar$).not.toEqual(failedObservable());
            expect(bar$).toEqual(observableWithSize(2));
        });

        it('should not support async streams', () => {
            const completed$ = of(10, 20).pipe(delay(1000));

            expect(completed$).toEqual(emptyObservable());
            expect(completed$).not.toEqual(completedObservable());
            expect(completed$).not.toEqual(failedObservable());
        });

        it('should support record and playback', () => {
            const subject = new Subject<string>();
            const recorded$ = record(subject);

            subject.next('foo');
            subject.next('bar');
            subject.next('baz');

            expect(subject).toEqual(emptyObservable());

            expect(recorded$).not.toEqual(emptyObservable());
            expect(recorded$).not.toEqual(completedObservable());

            expect(recorded$).toEqual(observable(
                next('foo'),
                next('bar'),
                next('baz')
            ));

            subject.complete();

            expect(recorded$).toEqual(completedObservable());
        });
    });
});
