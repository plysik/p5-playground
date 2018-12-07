class Speech {
  constructor(onResultCallback) {
    this.onResultCallback = onResultCallback;
    this.speechRecognition = new webkitSpeechRecognition();
    this.speechRecognitionList = new webkitSpeechGrammarList();
    this.speechRecognitionList.grammars = this.speechRecognitionList;
    this.speechRecognition.lang = "pl-PL";
    this.speechRecognition.continuous = true;
    this.speechRecognition.interimResults = true;
    this.speechRecognition.maxAlternatives = 1;
    this.speechRecognition.onresult = this.printSpeechRecognitionResults;
    this.speechRecognition.onstart = e => {
      console.log("onstart", e);
    };
    this.speechRecognition.onerror = e => {
      console.log("onerror", e);
    };
  }

  start() {
    this.speechRecognition.start();
  }

  first_char() {
    return /\S/;
  }

  capitalize(s) {
    return s.replace(first_char, function(m) {
      return m.toUpperCase();
    });
  }

  printSpeechRecognitionResults(e) {
    console.log(e);
    let result = "";
    if (typeof e.results == "undefined") {
      return;
    }
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      result += e.results[i][0].transcript;
    }
    console.log(result);
    this.onResultCallback(this.capitalize(result));
  }
}
