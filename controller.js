// CONTROLLER - handling business logic
// which is start quiz, next question, prev question, and submit quiz
// this is coordinating model and ButtonsView

// Quiz controller funcc

function QuizCtrl (data) {
	this.data = data;

	this.quizData = new QuizData(this.data);
	this.startView = new StartView(this);
	this.nextView = new NextView(this);
	this.prevView = new PrevView(this);
	this.submitView = new SubmitView(this);
	this.displayQuestionView = new DisplayQuestionView(this);
}

QuizCtrl.prototype.getQuizData = function () {
};

QuizCtrl.prototype.startQuiz = function () {
	this.displayQuestionView.generateQuestion(0);
	utils.toggleVisibility(introWrap, false);
	utils.toggleVisibility(quizWrap, true);
};

// takes care of evertyhing when the question moves forward
QuizCtrl.prototype.nextQuestion = function (userAnswer) {
	var nextQuestion = this.quizData.moveForward(userAnswer);
	utils.toggleVisibility(prev, true);

	if (this.quizData.currentQuestion === this.quizData.questions.length - 1) {
		this.nextView.updateText('submit')
	} else {
		this.nextView.updateText('Next')
	}

	if (nextQuestion) {
		this.displayQuestionView.generateQuestion(this.quizData.currentQuestion);
	} else {
		this.endQuiz();
	}
};

QuizCtrl.prototype.prevQuestion = function () {
	this.quizData.moveBackward();
	this.displayQuestionView.generateQuestion(this.quizData.currentQuestion);
	this.nextView.updateText('Next')

	if (this.quizData.currentQuestion === 0) {
		utils.toggleVisibility(prev, false);
	}
};

QuizCtrl.prototype.endQuiz = function () {
	// var checkedValue = this.submitView.checkedInput;
	utils.toggleVisibility(quizWrap, false);
	utils.toggleVisibility(outroWrap, true);
	// this.quizData.storeUserAnswers(checkedValue);

	// for (var i = this.quizData.correctAnswers.length - 1; i >= 0; i--) {
	for (var i = 0; i < this.quizData.correctAnswers.length; i++) {
		if (this.quizData.userAnswers[i] === this.quizData.correctAnswers[i]) {
			this.quizData.numCorrect++;
		} else {
			this.quizData.incorrectAnswers.push(i);
		}
	}
	userScore.innerHTML = '<h3>You got ' + this.quizData.numCorrect + '/' + theQuestions.length + ' questions correct, that\'s ' + (Math.round(this.quizData.numCorrect / theQuestions.length * 100)) + '%</h3>'
  //
  if (this.quizData.incorrectAnswers.length > 0) {
  	userScore.appendChild(
  		utils.createEl('h3', {
  			innerHTML: 'Questions you missed:'
  	}));
  	this.quizData.incorrectAnswers.forEach(function (index) {
  		userScore.appendChild(
  			utils.createEl('div', {
	  		innerHTML: '<p>' + this.quizData.questions[index].question + '</p> <p> Correct answer: ' + this.quizData.questions[index].choices[this.quizData.questions[index].answer] + '</p>'
	  	}));
  	}, this);
  }

};

var q = function (data) {
	return new QuizCtrl(data);
};
q(theQuestions);
// create views for each display, hide , then trigger those  in the controller, not the way you are currently doing it