const questionsAndAnswers = []

// Replace the following array with your own XPaths
const xpaths = [
    "//div[@id='question-prompt']",
  ];

const correctAnswerLetters = ["a", "b", "c", "d", "e", "f", "h", "i"]
  
  // Loop through the XPaths and store the results
  function createObject(){

    const elements = document.evaluate("//div[@id='question-prompt']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < elements.snapshotLength; i++) {
        const questionElement = elements.snapshotItem(i);
        const questionText = questionElement.textContent.trim()
        const answersForEachOne = []
        let correct = []

        const optionElements = document.evaluate('.//following-sibling::ul//li', questionElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        for(let j = 0; j < optionElements.snapshotLength; j++){
            const singleAnswer = optionElements.snapshotItem(j)
            let singleAnswerText = singleAnswer.textContent.trim();
            if (singleAnswerText.endsWith('(Correcto)')) {
                correct.push(correctAnswerLetters[j])
                singleAnswerText = singleAnswerText.replace('(Correcto)', '')
            }
            answersForEachOne.push(singleAnswerText)
        }

        var obj = {
            question: questionText,
            answers: answersForEachOne,
            correct: correct.length > 1 ? `${correct.join(' | ')}` : correct[0]
        }

        if (questionText.length > 300){
            obj.question = "SELECCIONE UNA OPCIÓN:"
            obj.message = questionText
        }

        questionsAndAnswers.push(obj)
    }
  }

clear()
createObject()
console.log(questionsAndAnswers)