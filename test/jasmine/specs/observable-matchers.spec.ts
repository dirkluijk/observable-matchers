import { completed, error, next } from '@dirkluijk/observable-matchers';
import { concat, of, throwError, EMPTY, NEVER } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

interface Foo {
    value: string;
}

interface Bar {
    value: string;
    otherValue: string;
}

describe('Observable Matchers', () => {
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
            next(jasmine.stringMatching('aap')),
            next(jasmine.anything()),
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
            error(jasmine.any(Error))
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
});
