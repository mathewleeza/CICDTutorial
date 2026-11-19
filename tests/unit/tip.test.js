// Unit tests for the tip math. Run with: npm test
// Uses Node's built-in test runner, so no packages are needed.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculateTip } = require('../../app/tip.js');

test('10% of $100.00 is $10.00, total $110.00', () => {
  assert.deepEqual(calculateTip(100, 10), { tip: 10, total: 110 });
});

test('15% of $48.60 is $7.29, total $55.89', () => {
  assert.deepEqual(calculateTip(48.6, 15), { tip: 7.29, total: 55.89 });
});

test('20% of $250.00 is $50.00, total $300.00', () => {
  assert.deepEqual(calculateTip(250, 20), { tip: 50, total: 300 });
});

test('accepts the bill as text, the way the input field gives it', () => {
  assert.deepEqual(calculateTip('48.60', 15), { tip: 7.29, total: 55.89 });
});

test('rounds the tip down to the nearest cent', () => {
  // 15% of 12.34 is 1.851, which rounds to 1.85
  assert.deepEqual(calculateTip(12.34, 15), { tip: 1.85, total: 14.19 });
});

test('rounds the tip up to the nearest cent', () => {
  // 20% of 10.03 is 2.006, which rounds to 2.01
  assert.deepEqual(calculateTip(10.03, 20), { tip: 2.01, total: 12.04 });
});

test('a $0 bill gives $0 tip', () => {
  assert.deepEqual(calculateTip(0, 20), { tip: 0, total: 0 });
});

test('an empty bill gives $0', () => {
  assert.deepEqual(calculateTip('', 15), { tip: 0, total: 0 });
});

test('text that is not a number gives $0', () => {
  assert.deepEqual(calculateTip('abc', 15), { tip: 0, total: 0 });
});

test('a negative bill gives $0', () => {
  assert.deepEqual(calculateTip(-20, 15), { tip: 0, total: 0 });
});
