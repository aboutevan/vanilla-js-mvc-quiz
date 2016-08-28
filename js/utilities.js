(function (window){

	// TODO - refactor methods into a DOM manipultation library,
	// i.e. jQuery-like, i.e. domElement.method(params)

	'use strict';

	var _ = {
		getId: function (id) {
			return document.getElementById(id)
		},
		getQ: function (q) {
			return document.querySelector(q)
		},
		getClass: function (c) {
			return document.getElementsByClassName(c);
		},
		// not used in current version of quiz
		// inheritPrototype: function (child, parent) {
		// 	var parentCopy = Object.create(parent.prototype);
		// 	parentCopy.constructor = child;
		// 	child.prototype = parentCopy;
		// },
		addEvent: function (el, event, fn) {
			el.addEventListener(event, function (e) {
				e.preventDefault();
				fn(this);
			})
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
		},
		toggleClass: function (el, className) {
			if (el.classList) {
			  el.classList.toggle(className);
			} else {
			  var classes = el.className.split(' ');
			  var existingIndex = classes.indexOf(className);

			  if (existingIndex >= 0)
			    classes.splice(existingIndex, 1);
			  else
			    classes.push(className);

			  el.className = classes.join(' ');
			}
		},
		updateText: function (el, text) {
			el.innerHTML = text;
		}
	};

	window._ = _;

})(window);
