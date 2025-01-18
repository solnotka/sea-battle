import { SHIP_DIRECTION } from "../interfaces";
import { checkForOne, collectWounds, checkSpace, getCheckParams, getShipCount } from "./utils";

export const field_1 = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
];

const field_2 = [
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const field_3 = [
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const field_4 = [
    [0, -1, 1, 0, 0.5, 0, 0, 0.5, 0.5, 0.5],
    [0, 0, 0, 0, 0, 1, 0, 0.5, -2, 0.5],
    [0.5, 0.5, 0.5, 0, 0, 0.5, 0, 0.5, 0.5, 0.5],
    [0.5, -2, 0.5, 0, 0.5, 0.5, 0.5, 1, 1, 1],
    [0.5, -2, 0.5, 0, 0.5, -2, 0.5, 0, 0, 0],
    [0.5, -2, 0.5, 0, 0.5, 0.5, 0.5, 0, 0, 0],
    [0.5, -2, 0.5, 0, 0, 0, 0, 0.5, 0, 0],
    [0.5, 0.5, 0.5, 0, 1, 0.5, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0.5, 0],
    [-1, 0, 0, 0, 0.5, 0, 1, 0.5, 0, 0],
]

test('checkForOne 1', () => {
    expect(checkForOne(field_1, 3, 8)).toEqual(false);
})

test('checkForOne 2', () => {
    expect(checkForOne(field_3, 2, 4)).toEqual(true);
})

test('checkForOne 3', () => {
    expect(checkForOne(field_2, 4, 9)).toEqual(false);
})

test('checkForOne 4', () => {
    expect(checkForOne(field_3, 0, 0)).toEqual(true);
})

test('checkForOne 5', () => {
    expect(checkForOne(field_2, 9, 9)).toEqual(false);
})

test('checkSpace 1', () => {
    expect(checkSpace(field_3, 0, 6, 3, SHIP_DIRECTION.HORIZONTAL)).toEqual(true);
})

test('checkSpace 2', () => {
    expect(checkSpace(field_3, 7, 1, 2, SHIP_DIRECTION.VERTICAL)).toEqual(true);
})

test('checkSpace 3', () => {
    expect(checkSpace(field_3, 1, 7, 4, SHIP_DIRECTION.HORIZONTAL)).toEqual(false);
})

test('checkSpace 4', () => {
    expect(checkSpace(field_2, 0, 5, 3, SHIP_DIRECTION.VERTICAL)).toEqual(false);
})

test('checkSpace 5', () => {
    expect(checkSpace(field_1, 2, 2, 1, SHIP_DIRECTION.VERTICAL)).toEqual(false);
})

test('getShipCount 1', () => {
    expect(getShipCount(field_1, [1])).toEqual({ 1: 4, 2: 3, 3: 2, 4: 1, all: 10 })
})

test('getShipCount 2', () => {
    expect(getShipCount(field_2, [1])).toEqual({ 1: 3, 2: 3, 3: 4, 4: 2, all: 12 })
})

test('getShipCount 3', () => {
    expect(getShipCount(field_3, [1])).toEqual({ 1: 2, 2: 3, 3: 2, all: 7 })
})

test('getShipCount 4', () => {
    expect(getShipCount(field_4, [1, -1])).toEqual({ 1: 2, 2: 3, 3: 2, all: 7 })
})

test('getShipCount 5', () => {
    expect(getShipCount(field_4, [-2])).toEqual({ 1: 2, 4: 1, all: 3 })
})

test('checkLineForShooting 1', () => {
    expect(collectWounds(field_4, 8, 0, false, true)).toEqual([[9, 0]])
})

test('checkLineForShooting 2', () => {
    expect(collectWounds(field_4, 8, 0, false, false)).toEqual([])
})

test('checkLineForShooting 3', () => {
    expect(collectWounds(field_4, 4, 4, true, true)).toEqual([])
})

test('checkLineForShooting 4', () => {
    expect(collectWounds(field_4, 7, 7, true, true)).toEqual(null)
})

test('checkLineForShooting 5', () => {
    expect(collectWounds(field_4, 3, 7, false, false)).toEqual([])
})

test('getCheckParams 1', () => {
    expect(getCheckParams(5, 5, 5, 5)).toEqual([5, 5, 1, SHIP_DIRECTION.VERTICAL])
})

test('getCheckParams 2', () => {
    expect(getCheckParams(5, 5, 6, 6)).toEqual(false)
})

test('getCheckParams 3', () => {
    expect(getCheckParams(5, 5, 5, 7)).toEqual([5, 5, 3, SHIP_DIRECTION.HORIZONTAL])
})

test('getCheckParams 4', () => {
    expect(getCheckParams(5, 5, 7, 5)).toEqual([5, 5, 3, SHIP_DIRECTION.VERTICAL])
})

test('getCheckParams 5', () => {
    expect(getCheckParams(5, 5, 5, 4)).toEqual([5, 4, 2, SHIP_DIRECTION.HORIZONTAL])
})

test('getCheckParams 6', () => {
    expect(getCheckParams(5, 5, 1, 5)).toEqual([1, 5, 5, SHIP_DIRECTION.VERTICAL])
})