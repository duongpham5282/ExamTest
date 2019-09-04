import { BundleProcessing } from "../dist/problem2/bundleProcessing";

let answer1, answer2, answer3, answer4, selectedBundle1, selectedBundle2;

beforeAll(() => {
    answer1 = {
        age: 16,
        student: true,
        income: 0
    };

    answer2 = {
        age: 18,
        student: false,
        income: 25000
    };

    answer3 = {
        age: 20,
        student: false,
        income: 25000
    };

    answer4 = {
        age: 20,
        student: false,
        income: 50000
    };

    selectedBundle1 = {
        id: 5,
        name: 'Gold',
        includes: [2, 5, 7],
        age: 17,
        income: 40000,
        value: 3
    };

    selectedBundle2 =   {
        id: 4,
        name: 'Classic Plus',
        includes: [1, 5, 6],
        age: 17,
        income: 12000,
        value: 2
    };
});

describe('Ensure calculateBundle return the right bundle!', () => {
    const obj = new BundleProcessing();
    expect(obj.calculateBundle(answer1).value).toEqual(0);
});

describe('Ensure calculateBundle return the right bundle!', () => {
    const obj = new BundleProcessing();
    expect(obj.calculateBundle(answer2).value).toEqual(2);
});

describe('Ensure switchBundle cannot switch from Classic Plus to Gold bundle!', () => {
    const obj = new BundleProcessing();
    const recommendedBundle = obj.calculateBundle(answer3);
    expect(obj.switchBundle(selectedBundle1, recommendedBundle, answer3).valid).toEqual(false);
    expect(obj.switchBundle(selectedBundle1, recommendedBundle, answer3).errorMsg).toEqual([ 'Income condition does not satisfy!' ]);
});

describe('Ensure switchBundle is able to switch from Gold bundle to Classic Plus!', () => {
    const obj = new BundleProcessing();
    const recommendedBundle = obj.calculateBundle(answer4);
    expect(obj.switchBundle(selectedBundle2, recommendedBundle, answer4)).toEqual(
        { valid: true, addinRules: [ 1, 6 ], unusedRules: [ 2, 7 ] }
    );
});


