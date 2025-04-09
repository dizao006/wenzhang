// 轻量级的深度比较函数
function fastEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;

	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);

	if (aKeys.length !== bKeys.length) return false;

	for (const key of aKeys) {
		if (!fastEqual(a[key], b[key])) return false;
	}

	return true;
}

self.onmessage = function(e) {
	const {
		userCode,
		hiddenTestCode,
		testCases,
		variableName
	} = e.data;

	try {
		const fullCode = `
      ${userCode}
      ${hiddenTestCode}
      const testResults = [];
      
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        try {
          const input = JSON.parse(JSON.stringify(testCase.input));
          const actual = ${variableName}(JSON.parse(JSON.stringify(input)));
          const passed = fastEqual(actual !== undefined ? actual : input, testCase.output);
          testResults.push({
            input: testCase.input,
            expected: testCase.output,
            actual: actual !== undefined ? actual : input,
            passed: passed
          });
        } catch (error) {
          testResults.push({
            input: testCase.input,
            expected: testCase.output,
            actual: error.message,
            passed: false
          });
        }
      }
      
      const isSolutionCorrect = validateSolution(${variableName});
      return { testResults, isSolutionCorrect };
    `;

		const {
			testResults,
			isSolutionCorrect
		} = new Function('testCases', 'fastEqual', fullCode)(testCases, fastEqual);
		self.postMessage({
			testResults,
			isSolutionCorrect
		});
	} catch (error) {
		self.postMessage({
			error: error.message
		});
	}
};