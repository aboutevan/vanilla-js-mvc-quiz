(function (window) {

	// Controller - handles the business logic, which is
	// starting quiz, going to next or previous questions
	// and ending the quiz.
	// Coordinating the model and view

	function Controller (model, view) {

		var self = this;
		self.model = model;
		self.view = view;

		self.view.setController(self);
		self.view.startButton();
		self.view.nextButton();
		self.view.prevButton();
	}

	Controller.prototype.startQuiz = function(){
		var self = this;
		self.view.displayQuestion(0);
		// _.toggleClass(self.view.$introWrap, 'hidden');
		// _.toggleClass(self.view.$quizWrap, 'hidden');
		 _.toggleVisibility(self.view.$introWrap, false)
		 _.toggleVisibility(self.view.$quizWrap, true)
	};

	Controller.prototype.nextQuestion  = function (userAnswer) {
		var self = this;
		// _.toggleClass(self.view.$prev, 'hidden');
		_.toggleVisibility(self.view.$prev, true);

		if (self.model.currentQuestion === self.model.questions.length - 2) {
			_.updateText(self.view.$next, 'Submit');
		}

		if (self.model.moveForward(userAnswer)) {
			self.view.displayQuestion(self.model.currentQuestion);
		} else {
			self.endQuiz();
		}
	}

	Controller.prototype.prevQuestion = function () {
		var self = this;

		self.model.moveBackward();
		self.view.displayQuestion(self.model.currentQuestion);

		if (self.model.currentQuestion === 0) {
			// _.toggleClass(self.view.$prev, 'hidden');
			_.toggleVisibility(self.view.$prev, false);
		}

		if (self.model.currentQuestion === self.model.questions.length - 2) {
			_.updateText(self.view.$next, 'Next');
		}
	}

	Controller.prototype.endQuiz = function () {
		var self = this;
		// _.toggleClass(self.view.$outroWrap, 'hidden');
		// _.toggleClass(self.view.$quizWrap, 'hidden');
		_.toggleVisibility(self.view.$outroWrap, true);
		_.toggleVisibility(self.view.$quizWrap, false);

		for (var i = self.model.correctAnswers.length - 1; i >= 0; i--) {
			if ( self.model.userAnswers[i] === self.model.correctAnswers[i]) {
				self.model.numCorrect++;
			} else {
				self.model.incorrectAnswers.push(i);
			}
		}
		self.view.displayResults(self);
	}

	window.app = window.app || {};
	window.app.Controller = Controller;

})(window);