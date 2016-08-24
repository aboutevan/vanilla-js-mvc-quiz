(function () {
'use strict';

function Quiz() {
	// this.model = new app.Model();
	this.controller = new app.Controller(this.model, this.view);
	this.view = new app.View(this.controller);
}

var pizza = new Quiz();

console.log(pizza)

})();