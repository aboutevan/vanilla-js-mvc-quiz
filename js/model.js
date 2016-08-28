(function(window){

	'use strict';

	// Question is a single question, properties reflect the data

	function Question (data) {
		this.question = data.question;
		this.choices = data.choices;
		this.answer = data.answer;

		// This could be used if multiple quizzes, not relevant now
		// var newDate = new Date();
		// var quizCreatedOn = newDate.toLocaleString();

		// this.getQuizDate = function () {
		// 	return quizCreatedOn;
		// };
	}

	// allow callback on each choice within a question
	Question.prototype.eachChoice = function (callback, context) {
		this.choices.forEach(callback, context);
	};

	// Model is a collection of Question Objects.  Creates Questions from
	// data, stores the answers, and updates the current question

	function Model (data) {
		this.numCorrect = 0;
		this.incorrectAnswers = [];
		this.currentQuestion = 0;
		this.questions = [];
		this.userAnswers = [];

		this.addQuestions(data);
		this.getCorrectAnswers();
	}

	Model.prototype.addQuestions = function (data) {
		for (var i = 0; i < data.length; i++) {
			this.questions.push(new Question(data[i]));
		}
	};

	Model.prototype.getCorrectAnswers = function () {
		this.correctAnswers = [];

		this.questions.forEach(function (index) {
			this.correctAnswers.push(index.answer);
		}, this);
	};

	Model.prototype.moveForward = function (val) {
		this.currentQuestion++
		this.userAnswers.push(val);
		return this.questions[this.currentQuestion]
	};

	Model.prototype.moveBackward = function () {
		this.currentQuestion--;
		this.userAnswers.pop();
	};

	// Export to window
	window.app = window.app || {};
	window.app.Model = Model;

})(window);