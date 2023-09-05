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
        const questionText = questionElement.textContent.replace(/\s*\([^)]*\)$/, '').trim()
        const answersForEachOne = []
        let correct = []

        const optionElements = document.evaluate('.//following-sibling::ul//li', questionElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        for(let j = 0; j < optionElements.snapshotLength; j++){
            const singleAnswer = optionElements.snapshotItem(j)
            let singleAnswerText = singleAnswer.textContent.trim();
            if (singleAnswerText.endsWith('(Correcto)')) {
                correct.push(correctAnswerLetters[j])              
            }
            answersForEachOne.push(singleAnswerText)
        }

        correct.forEach(c => {

            var obj = {
                question: questionText,
                options: answersForEachOne,
                answer: c,
                explanation: "",
                messages: [],
                areOptionsTooLarge: areOptionsTooLarge(answersForEachOne)
            } 
            
            if (questionText.length > 300){
                pushIfNotExist(obj.messages, questionText)
                obj.question = "SELECCIONE UNA OPCIÓN:"
            }

            if (areOptionsTooLarge(answersForEachOne)){
                pushIfNotExist(obj.messages, questionText)
                obj.messages.push(getOptionsAsMessage(answersForEachOne))
                obj.question = "SELECCIONE UNA OPCIÓN:"
                obj.options = getOptionsAsLetters(answersForEachOne)
            }

            questionsAndAnswers.push(obj)
        })        
    }
  }

  function areOptionsTooLarge(options){
    for(let i =0; i < options.length; i++){
        if(options[i].length >= 100){
            return true
        }
    }
    return false
  }

  function getOptionsAsMessage(options) {
    let result = "";
  
    for (let i = 0; i < options.length; i++) {
      const letter = String.fromCharCode(97 + i);
  
      result += `${letter}) ${options[i]}\n`;
    }
  
    return result;
  }

  function getOptionsAsLetters(options) {
    let result = [];
  
    for (let i = 0; i < options.length; i++) {
      const letter = String.fromCharCode(97 + i);
      result[i] = letter
    }
  
    return result;
  }

  function pushIfNotExist(arr, value1){
    if (!arr.includes(value1)) {
        arr.push(value1);
      }
  }


clear()
createObject()
copy(questionsAndAnswers)
console.log(questionsAndAnswers)