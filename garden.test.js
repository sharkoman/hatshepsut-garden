const draw = require('./draw');
const testData = require('./test_data.json');

describe('test garden pixel_array', function() {
	testData.forEach(test => {
		const paramsArray = test.input.split(',');

		it(`params ${paramsArray}`, function() {
			const pixelArray = draw(+paramsArray[0], +paramsArray[1], +paramsArray[2]);
			const parsed = JSON.stringify(pixelArray);
			expect(parsed).toEqual(test.pixelArrayJson);
		});
	});
});

// test('test garden pixel_array', () => {
//     // const paramsArray = testData[0].input.split(',');
//     // const pixelArray = draw(+paramsArray[0], +paramsArray[1], +paramsArray[2]);
//     // const parsed = JSON.stringify(pixelArray);
//     // expect(parsed).toEqual(testData[0].pixelArrayJson);

//     testData.forEach(test => {
//         const paramsArray = test.input.split(',');
//         const pixelArray = draw(+paramsArray[0], +paramsArray[1], +paramsArray[2]);
//         const parsed = JSON.stringify(pixelArray);
//         expect(parsed).toEqual(test.pixelArrayJson);
//     });
// });
