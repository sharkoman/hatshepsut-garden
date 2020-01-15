/**
 * @jest-environment jsdom
 */

const {draw} = require('./script.js');

test('test garden pixel_array', () => {
    const pixelArray = draw(20, 20, 4);
    expect(pixelArray).toBe([]);
});
