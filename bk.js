


var quiz = document.getElementById("quiz");
var qDWrap = document.getElementById("quiz-dynamic-wrap");
var quizQuestion = document.getElementById("quiz-question");
var radios = document.getElementById("radios");
var buttons = document.getElementById("buttons");
var start = document.getElementById("start");
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var restart = document.getElementById("reset");
var submit = document.getElementById("submit");

var ans = document.createElement('radio');

var currentQ = -1;
var isChecked;

//storage
var usrAns = [];
var numCorrect = 0;
var wrongAns = [];
var quizAns = [];



//////////////// click events ////////////////////////////

//// Utility Functions ///////////////////////////////////
function create (name, props) {
   var el = document.createElement(name);
   for (var p in props)
      el[p] = props[p];
    return el;
}

function inheritPrototype(subType, superType) {
  var superCopy = Object.create(superType.prototype);
  superCopy.constructor = subType;
  subType.prototype = superCopy;
}
//////////////////////////////////////////////////////////

//// MODEL: 
///Questions will hold all of the data //////////////////////////
function Question (theQuestion, theChoices, theAnswer) {
  this.question = theQuestion;
  this.choices = theChoices;
  this.Answer = theAnswer;
  this.usrAns = "";

  var newDate = new Date();
  quizCreation = newDate.toLocaleDateString();

  this.getQuizDate = function () {
    return quizCreation;
  }

  console.log('Quiz created on ' + this.getQuizDate());
}

Question.prototype.getCorrectAns = function() {
  return this.Answer;
}

Question.prototype.getUsrAns = function() {
  return this.usrAns;
}

Question.prototype.createQuestion = function() {
  console.log('jsdjfsjdf')
}

///////////////////////////////////////
///
///QUIZ is a collection of question objects
///it gets the questions and keeps track of what the user
///has gotten right ////////////
///
///

function Quiz() {
  this.questions = []
}



function QuizApp(data) {
  this.data = data
  this.introView = new IntroView();

  this.introView.addEvents();

}

function IntroView(){
  this.start = start
}

IntroView.prototype.addEvents = function() {
  start.addEventListener('click', function(e) {
    e.preventDefault();
    start.style.display = 'none';
    next.style.display = 'block';
  })
}
// var u = new IntroView();
// u.addEvents();
//Views Handle Presentation ///////////////

QuizApp();

function MultipleChoiceQ(theQuestion, theChoices, theAnswer) {
  Question.call(this, theQuestion, theChoices, theAnswer)
}

inheritPrototype(MultipleChoiceQ, Question);






var qArray = [
  new MultipleChoiceQ('what is my name', ['evan', 'doug', 'peter'], 0),
  new MultipleChoiceQ('what color is the sky?', ['orange', 'yellow', 'blue'], 2),
  new MultipleChoiceQ('what is 2+2?', ['2', '3', '4', '5'], 2)
];