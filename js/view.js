(function (window) {

	'use strict';

	// VIEW - handles all manipulation of DOM, including events triggered and templating.

	function View () {
		this.$error = _.getId('error-message');
		this.$introWrap = _.getId('intro-wrap');
		this.$next = _.getId('next');
		this.$outroWrap = _.getId('outro-wrap');
		this.$prev = _.getId('prev');
		this.$quizWrap = _.getId('quiz-wrap');
		this.$start = _.getId('start');
		this.$userScore = _.getId('user-score');
	}

	View.prototype.setController = function (ctrl) {
		this.ctrl = ctrl;
	}

	View.prototype.startButton = function () {
		var self = this;
		_.addEvent(self.$start, 'click', self.ctrl.startQuiz.bind(self.ctrl))
	}

	View.prototype.nextButton = function () {
		var self = this;
		_.addEvent(self.$next, 'click', self._goToNextQuestion.bind(self, self.ctrl));
	};

	View.prototype.prevButton = function () {
		var self = this;
		_.addEvent(self.$prev, 'click', self._goToPreviousQuestion.bind(self, self.ctrl))
	}

	// displayQuestion templates the current question
	View.prototype.displayQuestion = function (currentQuestion) {
		var self  = this;
		self.questions = self.ctrl.model.questions;
		self.$radiosContainer = _.getId('radios');
		self.$question = _.getId('quiz-question');

		// clear question
		self.$question.innerHTML = '';
		self.$radiosContainer.innerHTML = '';

		// set the question
		self.$question.appendChild(
			_.createEl('h1', {
				innerHTML: self.questions[currentQuestion].question
			}));

		// set the choices
		self.questions[currentQuestion].eachChoice(function (choice) {
			self.$radiosContainer
			.appendChild(
				_.createEl('li'))
			.appendChild(
				_.createEl('label', {
					id: 'label--choice',
					className: 'question-radio-label',
					htmlFor: 'choice--',
					innerHTML: choice
				}))
			.appendChild(
				_.createEl('input', {
					type: 'radio',
					className: 'question-radio',
					name: 'q',
					value: choice
			}));
		});
	};

	// only proceed to next question if input is checked
	View.prototype._goToNextQuestion = function () {
		var self = this;
		self.$radios = _.getClass('question-radio');
		self.checkedInput = null;

		for (var i = self.$radios.length - 1; i >= 0; i--) {
			if (self.$radios[i].checked) {
				self.checkedInput = i;
			}
		}

		if (self.checkedInput !== null) {
			self.ctrl.nextQuestion(self.checkedInput);
			self.$error.style.display = 'none'
		} else {
			self.$error.style.display = 'block'
		}
	}

	View.prototype._goToPreviousQuestion = function () {
		var self = this;
		self.$error.style.display = 'none';
		self.ctrl.prevQuestion();
	}

	// displayResults templates the outroView once the quiz is completed
	View.prototype.displayResults = function () {
		var self = this;

		// tell user their score
		self.$userScore.innerHTML = '<h3 class="outro-wrap__results">You got <span>' + self.ctrl.model.numCorrect + '/' + theQuestions.length + ' </span>questions correct, that\'s <span>' + (Math.round(self.ctrl.model.numCorrect / theQuestions.length * 100)) + '%</span></h3>'

		// if user answered any questions incorrectly, show them with their correct answers
		if (self.ctrl.model.incorrectAnswers.length > 0) {
			self.$userScore.appendChild(
	  		_.createEl('h3', {
	  			className: 'outro-wrap__missed-title',
	  			innerHTML: 'Bummer bro, you wiped out on some of those questions:'
	  	}));
			self.$userScore.appendChild(
	  		_.createEl('iframe', {
	  			className: 'outro-wrap__gif',
	  			frameBorder: '0',
	  			src: 'http://giphy.com/embed/E7CyDEcbgSziE'
	  	}));
			self.ctrl.model.incorrectAnswers.forEach(function (index) {
	  		self.$userScore.appendChild(
	  			_.createEl('div', {
	  				className: 'outro-wrap__question-missed',
			  		innerHTML: '<p>' + self.ctrl.model.questions[index].question + '</p> <p> Correct answer: ' + self.ctrl.model.questions[index].choices[self.ctrl.model.questions[index].answer] + '</p>'
		  	}));
			}, self.ctrl);
		// else give them a pat on the back
		} else {
			self.$userScore.appendChild(
	  		_.createEl('h3', {
	  			className: 'outro-wrap__100-title',
	  			innerHTML: 'Wow dude, you shred!!'
	  	}));
			self.$userScore.appendChild(
	  		_.createEl('iframe', {
	  			className: 'outro-wrap__gif',
	  			frameBorder: '0',
	  			src: 'http://giphy.com/embed/aDYXQy3W8XFG8'
	  	}));
		}
	};

	// export to window
	window.app = window.app || {};
	window.app.View = View;

})(window);