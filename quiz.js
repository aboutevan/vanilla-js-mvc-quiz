(function() {
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

  var qArray = [
    {
      question: "who am I?",
      options: ["bob", "nathan", "r2d2"],
      correctAnswer: 0
    },
    {
      question: "what color is the sky?",
      options: ["orange", "yellow", "blue"],
      correctAnswer: 2
    },
    {
      question: "what is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1
    }
  ]

  getQuizAns;
  startQuiz();
  nextQuestion();
  prevQuestion();
  submitQuiz();
  resetQuiz();
  // create elements easily
  function create (name, props) {
     var el = document.createElement(name);
     for (var p in props)
        el[p] = props[p];
      return el;
  }

  function createQuestion () {
    radios.innerHTML = '';
    quizQuestion.innerHTML = '';
    for (var i = 0, ln = qArray.length; i < ln; i++) {
      if (currentQ === i) {
        quizQuestion.appendChild(
          create("h1", {
            innerHTML: qArray[i].question
          }));
        // answers
        for (var j = 0, jln = qArray[i].options.length; j < jln; j++) {
          qArray[i].options[j]
          radios.appendChild(
            create("label", {
              id: "label--opt" + j,
              className: "question-radio-label",
              htmlFor: "opt--" + j,
              innerHTML: qArray[i].options[j]
            })
          )
          .appendChild(
            create("input", {
              id: "opt--" + j,
              type: "radio",
              className: "question-radio",
              name: "q",
              value: qArray[i].options[j]
            }));
        }
      }
    }
  }

  function getQuizAns() {
    qArray.forEach(function(item){
      quizAns.push(item.correctAnswer);
    })
    console.log(quizAns)
  }
  getQuizAns();

  function getUsrAns(index) {
    index = currentQ;
    var qRadio = document.getElementsByClassName("question-radio")
    console.log("index is: " + index)
    console.log("correct answe is: " + qArray[index].correctAnswer)
    for (var i = 0; i < qRadio.length; i++) {
      if (qRadio[i].checked) {
        usrAns.push(i);
        console.log(usrAns);
        isChecked = true;
      }
    }
  }


  function startQuiz() {
    start.addEventListener("click", function(e) {
      e.preventDefault();
      currentQ++;
      createQuestion();
      // start button
      start.style.display = 'none';
      next.style.display = 'block';
    })
  }


  function nextQuestion() {
      next.addEventListener("click", function(e) {
      e.preventDefault();
      getUsrAns();

      if (!isChecked) {
        alert('please make a selection')
      } else {
        if(currentQ == 0) {
          reset.style.display = 'block';
          prev.style.display = 'block';
        }
        // last time next button will appear
        if(currentQ === qArray.length - 2){
          console.log('last-question')
          next.style.display="none";
          submit.style.display="block";
        }
        currentQ++;
        createQuestion();
        isChecked = false;
        console.log(isChecked)
      }

    })
  }

  function prevQuestion() {
      prev.addEventListener("click", function(e) {
        e.preventDefault();

        if (currentQ === qArray.length - 1) {
          next.style.display = "block";
          submit.style.display ="none";
        }
        usrAns.pop();
        console.log(usrAns);
        currentQ--;
        createQuestion();
      })
  }

  function submitQuiz() {
    submit.addEventListener("click", function(e) {
      e.preventDefault();
      getUsrAns();
      if (!isChecked) {
        alert('please make a selection')
      } else {
        console.log(usrAns)
        radios.innerHTML = '';
        quizQuestion.innerHTML = '';
        prev.style.display="none";
        submit.style.display="none";
        getScore(usrAns, quizAns);
      }
    })
  }

  function resetQuiz() {
    reset.addEventListener('click', function(e) {
      e.preventDefault();
      currentQ = 0;
      createQuestion();
      usrAns =[];
      next.style.display = "block";
      prev.style.display = "none";
      submit.style.display = "none";
      reset.style.display = "none";
      numCorrect =0;
    })
  }


  function getScore(a, b) {
    for (var i=0; i < a.length; i++) {
      for (var j=0; j < b.length; j++) {
        if(a[i]!==b[j] &&  i === j) {
          wrongAns.push(a[i]);
        } else if(a[i] === b[j] && i === j){
          numCorrect++;
        }
      }
    }
    console.log("You scored " + Math.round((numCorrect / b.length) * 100)  + "%")
  }
})()