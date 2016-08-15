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

Utils.inheritPrototype(StartView, ButtonsView);

StartView.prototype._buttonEvent = function (self) {
	self.quizCtrl.startQuiz();
};
//--------------------------------------------------------
// Handles interaction with the next button.  WHen clicked, it wwill
// check for checked radio, and then run controller function
function NextView (quizCtrl) {
	ButtonsView.call(this, quizCtrl);
	this.addEvents(next, this._buttonEvent);
	this.updateText = function (text) {
		next.innerHTML = text
	}
}

Utils.inheritPrototype(NextView, ButtonsView);

NextView.prototype._buttonEvent = function (self) {
	var radios = document.getElementsByClassName('question-radio');

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
	ButtonsView.call(this, quizCtrl);
	this.addEvents(prev, this._buttonEvent);
}

Utils.inheritPrototype(PrevView, ButtonsView);

PrevView.prototype._buttonEvent = function (self) {
	error.style.display = 'none'
	self.quizCtrl.prevQuestion();
};

//---------------------------------------------------------

function SubmitView (quizCtrl) {
	ButtonsView.call(this, quizCtrl);
	this.addEvents(submit, this._buttonEvent);
}

Utils.inheritPrototype(SubmitView, ButtonsView);

SubmitView.prototype._buttonEvent = function (self) {
	var isChecked = null;

	for (var i = radios.length - 1; i >= 0; i--) {
		if (radios[i].checked) {
			isChecked = true;
			self.checkedInput = i;
		}
	}

	if (isChecked) {
		self.quizCtrl.nextQuestion();
		error.style.display = 'none'
	} else {
		error.style.display = 'block'
	}
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
		Utils.createEl('h1', {
			innerHTML: this.questionSet[currentQuestion].question
		}));
	// answers
	this.questionSet[currentQuestion].eachChoice(function (choice) {
		radiosContainer.appendChild(
			Utils.createEl('li')
    )
    .appendChild(
    	Utils.createEl('label', {
    		id: 'label--choice',
    		className: 'question-radio-label',
    		htmlFor: 'choice--',
    		innerHTML: choice
    	})
    )
    .appendChild(
			Utils.createEl('input', {
				type: 'radio',
				className: 'question-radio',
				name: 'q',
				value: choice
			}));
	});
};
// create views for each display, hide , then trigger those  in the controller, not the way you are currently doing it
