var theQuestions = [
	{
		question: 'Who am I?',
		choices: ['bob', 'nathan', 'r2d2'],
		answer: 0
	},
	{
		question: 'What color is the sky?',
		choices: ['orange', 'yellow', 'blue'],
		answer: 2
	},
	{
		question: 'What is 2 + 2?',
		choices: ['3', '4', '5', '6'],
		answer: 1
	}
];

// var quiz = document.getElementById('quiz');
var quizWrap = document.getElementById('quiz-wrap');
var introWrap = document.getElementById('intro-wrap');
var outroWrap = document.getElementById('outro-wrap');
var userScore = document.getElementById('userScore');
// var generatedQuizContent = document.getElementById('generated-quiz-content');
// var buttons = document.getElementById('buttons');
var start = document.getElementById('start');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var error = document.getElementById('error-message');
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
	toggleVisibility: function (el, shouldShow) {
		if (!el.className.match(/(?:^|\s)visible(?!\S)/)) {
			el.className += ' visible';
		}
		if (!shouldShow) {
			if (el.className.match(/(?:^|\s)visible(?!\S)/)) {
				el.className = el.className.replace( /(?:^|\s)visible(?!\S)/g , ' hidden' )
			}
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

// QuizData.prototype.storeUserAnswers = function (val) {
// 	this.userAnswers.push(val);
// };

QuizData.prototype.moveForward = function (val) {
	this.currentQuestion++
	this.userAnswers.push(val);
	return this.questions[this.currentQuestion]
};

QuizData.prototype.moveBackward = function () {
	this.currentQuestion--;
	this.userAnswers.pop();
};

QuizData.prototype.addQuestions = function (data) {
	for (var i = 0; i < data.length; i++) {
		this.questions.push(new Question(data[i]));
	}
};