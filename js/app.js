(function () {
'use strict';

	function Quiz(questions) {
		this.model = new app.Model(questions);
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view)
	}

var myQuiz = new Quiz(theQuestions);

})();