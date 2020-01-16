function numberOfTotalShapes(width, padding) {
	let count = 0;
	for (let i = width; i >= 2; i = i - (padding + 2)) {
		count++;
	}
	return count;
}

/*
	Getting the index of first & last line of every shap with shape index :)
*/
function shapesStartEndIndex(height, padding, totalShapesNumber) {
	const shapesPacingInfo = [];
	for (let i = 0; i < totalShapesNumber; i++) {
		const paddingValue = (padding / 2 + (i === 0 ? 0 : 1)) * i;
		const start = paddingValue;
		const end = height - paddingValue - 1;
		shapesPacingInfo.push({ start, end, indent: i });
	}
	return shapesPacingInfo;
}

/* 
	That will return new row array indented by the shape indent level 
*/
function addRow(width, padding, indentLevel, fill) {
	const halfPaddingNum = padding / 2;

	// create the line start/end white padding...
	const paddingSpace = [];
	for (let i = 0; i < halfPaddingNum; i++) {
		paddingSpace.push(0);
	}

	const capPaddingStart = [2, ...paddingSpace];
	const capPaddingEnd = [...paddingSpace, 2];
	const widthWithoutCaps = width - (2 + (padding / 2 + 1) * 2 * indentLevel);

	const capPaddingStartRepeated = [];
	const capPaddingEndRepeated = [];
	for (let i = 0; i < indentLevel; i++) {
		capPaddingStartRepeated.push(...capPaddingStart);
		capPaddingEndRepeated.push(...capPaddingEnd);
	}

	const capDashedLine = [];
	for (let i = 0; i < widthWithoutCaps; i++) {
		capDashedLine.push(fill);
	}

	return [...capPaddingStartRepeated, 2, ...capDashedLine, 2, ...capPaddingEndRepeated];
}

function createNewBox(pixelArray, width, padding, shapeLevel, startIndex, endIndex) {
	for (let i = startIndex; i <= endIndex; i++) {
		if (i !== startIndex && i !== endIndex) {
			pixelArray[i] = addRow(width, padding, shapeLevel, 0);
		} else {
			pixelArray[i] = addRow(width, padding, shapeLevel, 1);
		}
	}
}

function draw(width, height, padding) {
	const pixelArray = [];
	const totalShapes = numberOfTotalShapes(width, padding);
	const shapesIndexs = shapesStartEndIndex(height, padding, totalShapes);

	shapesIndexs.forEach(el => {
		createNewBox(pixelArray, width, padding, el.indent, el.start, el.end);
	});

	return pixelArray;
}

exports.draw = draw;