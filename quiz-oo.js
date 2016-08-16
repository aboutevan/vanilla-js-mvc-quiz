var theQuestions = [
	{
		question: 'who am I?',
		choices: ['bob', 'nathan', 'r2d2'],
		answer: 0
	},
	{
		question: 'what color is the sky?',
		choices: ['orange', 'yellow', 'blue'],
		answer: 2
	},
	{
		question: 'what is 2 + 2?',
		choices: ['3', '4', '5', '6'],
		answer: 1
	}
];

// var quiz = document.getElementById('quiz');
var quizWrap = document.getElementById('quiz-wrap');
var introWrap = document.getElementById('intro-wrap');
// var outroWrap = document.getElementById('outro-wrap');
// var generatedQuizContent = document.getElementById('generated-quiz-content');
// var buttons = document.getElementById('buttons');
var start = document.getElementById('start');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
// var restart = document.getElementById('reset');
var submit = document.getElementById('submit');
// var ans = document.createElement('radio');
var quizQuestion = document.getElementById('quiz-question');
var radiosContainer = document.getElementById('radios');

// Utility Functions ///////////////////////////////////

var utils = {
	inheritPrototype: function (child, parent) {
		var parentCopy = Object.create(parent.prototype);
		parentCopy.constructor = child;
		child.prototype = parentCopy;
	},
	createEl: function (name, props) {
		var el = document.createElement(name);
		for (var p in props) {
			if ({}.hasOwnProperty.call(props, p)) {
				el[p] = props[p];
			}
		}
		return el;
	},
	toggleVisibility: function (el, hide) {
		// this might need refactor
		el.style.display = 'block';

		if (!hide) {
			el.style.display = 'none';
		}
	}
};

// MODEL

// ///////////// Question - single question - props reflect data and has set of methods to interact with the data
function Question (data) {
	this.question = data.question;
	this.choices = data.choices;
	this.answer = data.answer;

	var newDate = new Date();
	var quizCreation = newDate.toLocaleString();

	this.getQuizDate = function () {
		return quizCreation;
	};
}

Question.prototype.eachChoice = function (callback, context) {
	this.choices.forEach(callback, context);
};

// Quiz - collection of question objects.
// creates question from data,
// stores questions,
// checks which question you are on and
// how many questions right
function QuizData (data) {
	this.numCorrect = 0;
	this.incorrectAnswers = [];
	this.currentQuestion = 0;
	this.questions = [];
	this.userAnswers = [];

	this.addQuestions(data);

	this.getCorrectAnswers();
}

QuizData.prototype.getCorrectAnswers = function () {
	this.correctAnswers = [];

	this.questions.forEach(function (index) {
		this.correctAnswers.push(index.answer);
	}, this);
};

QuizData.prototype.storeUserAnswers = function (val) {
	this.userAnswers.push(val);
};

QuizData.prototype.moveForward = function () {
	if (this.currentQuestion < this.questions.length - 1) {
		this.currentQuestion++;
	}
};

QuizData.prototype.moveBackward = function () {
	if (this.currentQuestion > 0) {
		this.currentQuestion--;
		this.userAnswers.pop();
	}
};

QuizData.prototype.addQuestions = function (data) {
	for (var i = 0; i < data.length; i++) {
		this.questions.push(new Question(data[i]));
	}
};

// new Quiz(theQuestions);

// CONTROLLER - handling business logic
// which is start quiz, next question, prev question, and submit quiz
// this is coordinating model and ButtonsView

// Quiz controller funcc

function QuizCtrl (data) {
	this.data = data;

	// this.view.test()
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
	this.displayQuestionView.generateQuestion(this.quizData.currentQuestion);
	utils.toggleVisibility(introWrap, false);
	utils.toggleVisibility(quizWrap, true);
};

// takes care of evertyhing when the question moves forward
QuizCtrl.prototype.nextQuestion = function () {
	var checkedValue = this.nextView.checkedInput;
	this.quizData.storeUserAnswers(checkedValue);
	this.quizData.moveForward();
	this.displayQuestionView.generateQuestion(this.quizData.currentQuestion);

	if (this.quizData.currentQuestion > 0) {
		utils.toggleVisibility(prev, true);
	}

	if (this.quizData.currentQuestion === this.quizData.questions.length - 1) {
		utils.toggleVisibility(next, false);
		utils.toggleVisibility(submit, true);
	}
};

QuizCtrl.prototype.prevQuestion = function () {
	this.quizData.moveBackward();
	this.displayQuestionView.generateQuestion(this.quizData.currentQuestion);
	console.log(this.quizData.currentQuestion);

	if (this.quizData.currentQuestion === this.quizData.questions.length - 2) {
		utils.toggleVisibility(next, true);
		utils.toggleVisibility(submit, false);
	}

	if (this.quizData.currentQuestion === 0) {
		utils.toggleVisibility(prev, false);
	}
	console.log(this.quizData.userAnswers);
};

QuizCtrl.prototype.endQuiz = function () {
	var checkedValue = this.nextView.checkedInput;
	utils.toggleVisibility(quizWrap, false);
	this.quizData.storeUserAnswers(checkedValue);
	console.log(this.quizData.correctAnswers);
	console.log(this.quizData.userAnswers);
	for (var i = this.quizData.correctAnswers.length - 1; i >= 0; i--) {
		if (this.quizData.userAnswers.indexOf(i) === this.quizData.correctAnswers.indexOf(i)) {
			this.quizData.numCorrect++;
		} else {
			this.quizData.incorrectAnswers.push(i);
		}
	}
	console.log('you got correct ' + this.quizData.numCorrect + ' questions');
  //
	this.quizData.incorrectAnswers.forEach(function (index) {
		console.log(this.quizData.questions[index].question);
	}, this);
};
// VIEWS - presentation
// handles all manipulation of the DOM, and also handles events triggered on the DOM.  Make a ButtonsView for each section of the application

// The ButtonsView is a constructor that sets some properties and methods useful for all views. Excplicitylly passing quizCtrl in the QuizCtrl constructor, but ButtonsView never called in QuizCtrl, only child objects

function ButtonsView (quizCtrl) {
	this.quizCtrl = quizCtrl;
}

ButtonsView.prototype.addEvents = function (el, event) {
	var self = this;
	el.addEventListener('click', function (e) {
		e.preventDefault();
		event(self);
	});
};

ButtonsView.prototype.toggleVisibility = function (el, hide) {
	el.style.display = 'block';
	if (!hide) {
		el.style.display = 'none';
	}
};

//---------------------------------------------------------

function StartView (quizCtrl) {
	ButtonsView.call(this, quizCtrl);
	this.addEvents(start, this._buttonEvent);
}

utils.inheritPrototype(StartView, ButtonsView);

StartView.prototype._buttonEvent = function (self) {
	self.quizCtrl.startQuiz();
};
//--------------------------------------------------------
// Handles interaction with the next button.  WHen clicked, it wwill
// check for checked radio, and then run controller function
function NextView (quizCtrl) {
	ButtonsView.call(this, quizCtrl);
	this.addEvents(next, this._buttonEvent);
}

utils.inheritPrototype(NextView, ButtonsView);

NextView.prototype._buttonEvent = function (self) {
	var radios = document.getElementsByClassName('question-radio');
	var isChecked = null;

	for (var i = radios.length - 1; i >= 0; i--) {
		if (radios[i].checked) {
			isChecked = true;
			self.checkedInput = i;
		}
	}
	if (isChecked) {
		self.quizCtrl.nextQuestion();
	} else {
		console.log('Pleae make a selection');
	}
};

//---------------------------------------------------------
function PrevView (quizCtrl) {
	ButtonsView.call(this, quizCtrl);
	this.addEvents(prev, this._buttonEvent);
}

utils.inheritPrototype(PrevView, ButtonsView);

PrevView.prototype._buttonEvent = function (self) {
	self.quizCtrl.prevQuestion();
};

//---------------------------------------------------------

function SubmitView (quizCtrl) {
	ButtonsView.call(this, quizCtrl);
	this.addEvents(submit, this._buttonEvent);
}

utils.inheritPrototype(SubmitView, ButtonsView);

SubmitView.prototype._buttonEvent = function (self) {
	self.quizCtrl.endQuiz();
};

// function OutroView (quizCtrl) {
// 	ButtonsView.call(this, quizCtrl);
// }
//---------------------------------------------------------
function DisplayQuestionView (quizCtrl) {
	ButtonsView.call(this, quizCtrl);
	this.questionSet = this.quizCtrl.quizData.questions;
}

DisplayQuestionView.prototype.generateQuestion = function (currentQuestion) {
	// question
	radiosContainer.innerHTML = '';
	quizQuestion.innerHTML = '';
	quizQuestion.appendChild(
		utils.createEl('h1', {
			innerHTML: this.questionSet[currentQuestion].question
		}));
	// answers
	this.questionSet[currentQuestion].eachChoice(function (choice) {
		radiosContainer.appendChild(
			utils.createEl('label', {
				id: 'label--choice',
				className: 'question-radio-label',
				htmlFor: 'choice--',
				innerHTML: choice
			})
    )
    .appendChild(
			utils.createEl('input', {
				type: 'radio',
				className: 'question-radio',
				name: 'q',
				value: choice
			}));
	});
};

var q = function (data) {
	return new QuizCtrl(data);
};
q(theQuestions);
// create views for each display, hide , then trigger those  in the controller, not the way you are currently doing it
