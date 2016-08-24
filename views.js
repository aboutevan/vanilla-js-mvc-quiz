(function (window) {

	// VIEWS - presentation
	// handles all manipulation of the DOM, and also handles events triggered on the DOM.

	// The BaseViewConstructor is a constructor that sets some properties and methods useful for all views.
	function BaseViewConstructor (quizCtrl) {
		this.quizCtrl = quizCtrl;
		console.log(quizCtrl)
	}

	BaseViewConstructor.prototype.addEvents = function (el, event) {
		var self = this;
		el.addEventListener('click', function (e) {
			e.preventDefault();
			event(self);
		});
	};

	//---------------------------------------------------------

	function StartView (quizCtrl) {
		var start = utils.getId('start');
		BaseViewConstructor.call(this, quizCtrl);
		this.addEvents(start, this._buttonEvent);
	}

	utils.inheritPrototype(StartView, BaseViewConstructor);

	StartView.prototype._buttonEvent = function (self) {
		self.quizCtrl.startQuiz();
	};
	//--------------------------------------------------------
	// Handles interaction with the next button.  WHen clicked, it wwill
	// check for checked radio, and then run controller function
	function NextView (quizCtrl) {
		var next = utils.getId('next')

		BaseViewConstructor.call(this, quizCtrl);
		this.addEvents(next, this._buttonEvent);

		this.updateText = function (text) {
			next.innerHTML = text
		}
	}

	utils.inheritPrototype(NextView, BaseViewConstructor);

	NextView.prototype._buttonEvent = function (self) {
		var radios = document.getElementsByClassName('question-radio');
		var error = utils.getId('error-message')

		self.checkedInput = null;

		for (var i = radios.length - 1; i >= 0; i--) {
			if (radios[i].checked) {
				self.checkedInput = i;
			}
		}

		if (self.checkedInput !== null) {
			self.quizCtrl.nextQuestion(self.checkedInput);
			error.style.display = 'none'
		} else {
			error.style.display = 'block'
		}
	};

	//---------------------------------------------------------
	function PrevView (quizCtrl) {
		var prev = utils.getId('prev')

		BaseViewConstructor.call(this, quizCtrl);
		this.addEvents(prev, this._buttonEvent);
	}

	utils.inheritPrototype(PrevView, BaseViewConstructor);

	PrevView.prototype._buttonEvent = function (self) {
		var error = utils.getId('error-message');
		error.style.display = 'none';
		self.quizCtrl.prevQuestion();
	};

	//---------------------------------------------------------

	//---------------------------------------------------------
	function DisplayQuestionView (quizCtrl) {
		BaseViewConstructor.call(this, quizCtrl);
		this.questionSet = this.quizCtrl.quizData.questions;
	}

	DisplayQuestionView.prototype.generateQuestion = function (currentQuestion) {
		var radiosContainer = utils.getId('radios')
		var quizQuestion = utils.getId('quiz-question')
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
				utils.createEl('li')
	    )
	    .appendChild(
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

	function View (quizCtrl) {
		this.startView = new StartView(quizCtrl);
		this.nextView = new NextView(quizCtrl);
		this.prevView = new PrevView(quizCtrl);
		this.displayQuestionView = new DisplayQuestionView(quizCtrl);
	}

	utils.inheritPrototype(View, BaseViewConstructor);
	// create views for each display, hide , then trigger those  in the controller, not the way you are currently doing it

	
	
	//export to window
	window.app = window.app || {};
	window.app.View = View;

})(window);
