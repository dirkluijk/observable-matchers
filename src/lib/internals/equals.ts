// Extracted out of Jest

// tslint:disable:cyclomatic-complexity
// tslint:disable:no-shadowed-variable
// tslint:disable:triple-equals

export type Tester = (a: any, b: any) => boolean | undefined;

function isAsymmetric(obj: any): boolean {
    return !!obj && isA('Function', obj.asymmetricMatch);
}

function asymmetricMatch(a: any, b: any): boolean | undefined {
    const asymmetricA = isAsymmetric(a);
    const asymmetricB = isAsymmetric(b);

    if (asymmetricA && asymmetricB) {
        return undefined;
    }

    if (asymmetricA) {
        return a.asymmetricMatch(b);
    }

    if (asymmetricB) {
        return b.asymmetricMatch(a);
    }

    return undefined;
}

function eq(
    a: any,
    b: any,
    aStack: unknown[],
    bStack: unknown[],
    customTesters: Tester[],
    hasKey: any,
): boolean {
    let result = true;

    const asymmetricResult = asymmetricMatch(a, b);
    if (asymmetricResult !== undefined) {
        return asymmetricResult;
    }

    for (const customTester of customTesters) {
        const customTesterResult = customTester(a, b);
        if (customTesterResult !== undefined) {
            return customTesterResult;
        }
    }

    if (a instanceof Error && b instanceof Error) {
        return a.message === b.message;
    }

    if (Object.is(a, b)) {
        return true;
    }
    // A strict comparison is necessary because `null == undefined`.
    if (a === null || b === null) {
        return a === b;
    }
    const className = Object.prototype.toString.call(a);
    if (className != Object.prototype.toString.call(b)) {
        return false;
    }
    switch (className) {
        // Strings, numbers, dates, and booleans are compared by value.
        case '[object String]':
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return a == String(b);
        case '[object Number]':
            return Object.is(Number(a), Number(b));
        case '[object Date]':
        case '[object Boolean]':
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a == +b;
        // RegExps are compared by their source patterns and flags.
        case '[object RegExp]':
            return (
                a.source == b.source &&
                a.global == b.global &&
                a.multiline == b.multiline &&
                a.ignoreCase == b.ignoreCase
            );
    }
    if (typeof a != 'object' || typeof b != 'object') {
        return false;
    }

    // Used to detect circular references.
    let length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        // circular references at same depth are equal
        // circular reference is not equal to non-circular one
        if (aStack[length] === a) {
            return bStack[length] === b;
        }

        if (bStack[length] === b) {
            return false;
        }
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    let size = 0;
    // Recursively compare objects and arrays.
    // Compare array lengths to determine if a deep comparison is necessary.
    if (className == '[object Array]') {
        size = a.length;
        if (size !== b.length) {
            return false;
        }

        while (size--) {
            result = eq(a[size], b[size], aStack, bStack, customTesters, hasKey);
            if (!result) {
                return false;
            }
        }
    }

    // Deep compare objects.
    const aKeys = keys(a, className == '[object Array]', hasKey);
    let key;
    size = aKeys.length;

    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (keys(b, className == '[object Array]', hasKey).length !== size) {
        return false;
    }

    while (size--) {
        key = aKeys[size];

        // Deep compare each member
        result =
            hasKey(b, key) &&
            eq(a[key], b[key], aStack, bStack, customTesters, hasKey);

        if (!result) {
            return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();

    return result;
}

function keys(
    obj: object,
    isArray: boolean,
    hasKey: (obj: object, key: string) => boolean,
): string[] {
    const allKeys = ((o) => {
        const keys = [];
        for (const key in o) {
            if (hasKey(o, key)) {
                keys.push(key);
            }
        }

        return keys.concat(
            (Object.getOwnPropertySymbols(o) as any[]).filter(
                (symbol) =>
                    (Object.getOwnPropertyDescriptor(o, symbol) as PropertyDescriptor)
                        .enumerable,
            ),
        );
    })(obj);

    if (!isArray) {
        return allKeys;
    }

    const extraKeys = [];
    if (allKeys.length === 0) {
        return allKeys;
    }

    for (const key of allKeys) {
        if (typeof key === 'symbol' || !key.match(/^[0-9]+$/)) {
            extraKeys.push(key);
        }
    }

    return extraKeys;
}

function hasKey(obj: any, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

export function isA(typeName: string, value: unknown): boolean {
    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
}

export function equals(a: unknown, b: unknown): boolean {
    if ((jasmine as any).matchersUtil) {
        return (jasmine as any).matchersUtil.equals(a, b);
    }

    return eq(a, b, [], [], [], hasKey);
}
