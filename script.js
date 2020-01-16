const pixelEnum = [' ', '-', '|'];


/*
	Calculate number of total shapes.
	Minus the (padding value + first & end lines) from the [ Total Shape Height ] till it reach 2 lines at least.
		That easely give us the total count of shapes that we can include inside the shape
*/
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

function draw(width = 6, height = 6, padding = 4) {
	const pixelArray = [];
	const totalShapes = numberOfTotalShapes(width, padding);
	const shapesIndexs = shapesStartEndIndex(height, padding, totalShapes);
	console.log('box', totalShapes, shapesIndexs);

	shapesIndexs.forEach(el => {
		createNewBox(pixelArray, width, padding, el.indent, el.start, el.end);
	});

	return pixelArray;
}


/*
 Print result by append it with <pre> tag to result html tag
*/
function printResultsOnScreen(pixelArray, showNumbers = false, target = '#result') {
	const preElement = document.querySelector(target);
	let result = '';
	preElement.innerHTML = '';

	pixelArray.forEach(row => {
		let line;
		if (!showNumbers) {
			const translatedLine = row.map(n => pixelEnum[n]);
			line = translatedLine.join('');
		} else {
			line = row.join('');
		}
		line = line + '\n';
		result += line;
	});

	preElement.innerHTML += `<pre>` + result + `</pre>`;
}

function showErrorMessage(selector, hideError) {
	const errorMessage = document.querySelector(selector);
	if (hideError) {
		errorMessage.classList.add('hide');
	} else {
		errorMessage.classList.remove('hide');
	}
}

function resetErrorMessages() {
	showErrorMessage('#width-validation', true);
	showErrorMessage('#height-validation', true);
	showErrorMessage('#padding-validation', true);
}

function showHideErrorMessages(isWidthValid, isHeightValid, isPaddingValid) {
	isWidthValid ? showErrorMessage('#width-validation', true) : showErrorMessage('#width-validation', false);
	isHeightValid ? showErrorMessage('#height-validation', true) : showErrorMessage('#height-validation', false);
	isPaddingValid ? showErrorMessage('#padding-validation', true) : showErrorMessage('#padding-validation', false);
}

function isFormValid(width, height, padding) {
	// validate each field;
	const isWidthValid = width >= 20 && width % 2 === 0 ? true : false;
	const isHeightValid = height >= 20 && height % 2 === 0 ? true : false;
	const isPaddingValid = padding >= 4 && padding % 2 === 0 ? true : false;

	// show / hide error message
	showHideErrorMessages(isWidthValid, isHeightValid, isPaddingValid);

	console.log('Is form valid => ', isWidthValid && isHeightValid && isPaddingValid);
	return isWidthValid && isHeightValid && isPaddingValid;
}

function listenToFormSubmit() {
	document.querySelector('#garden-controls').addEventListener('submit', function(e) {
		// stop redirect behavior;
		e.preventDefault();

		// collect form data as numbers;
		const width = +document.querySelector('#width').value;
		const height = +document.querySelector('#height').value;
		const padding = +document.querySelector('#padding').value;

		if (isFormValid(width, height, padding)) {
			const pixelArray = draw(width, height, padding);
			printResultsOnScreen(pixelArray, false);
			resetErrorMessages();
		}
	});
}

listenToFormSubmit();
