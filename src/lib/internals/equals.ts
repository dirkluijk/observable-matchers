import isEqual from 'lodash.isequal';

export function equals(a: unknown, b: unknown): boolean {
    if ((jasmine as any).matchersUtil) {
        return (jasmine as any).matchersUtil.equals(a, b);
    }

    return isEqual(a, b);
}
