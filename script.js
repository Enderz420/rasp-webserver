// declare variables and arrays
let questions = [];
const ques = document.getElementById("ques");
let currentQuestion = 0;
let score = 0;

async function fetchQuestions() {
    try {
        const response =
          await // bare henter 10 tilfeldige spørsmål om film fra en api
          fetch(
            "https://opentdb.com/api.php?amount=10&category=11&type=multiple"
          );
        const data = await response.json();
        questions = data.results;
    }
    catch (error) {
        console.log(error);
        ques.innerHTML = "error";
    }
}
console.log(fetchQuestions());

if (questions.length === 0) {
    ques.innerHTML = "Loading questions";
}

function loadQuestion() {
    const opt = document.getElementById('opt');
    if (opt === null) {
        console.log("opt id is null");
        return;
    }
    let currentQuestions = questions[currentQuestion].question;
    if (currentQuestions === undefined) {
        console.log("currentQuestions is undefined");
        return;
    }
    if (currentQuestions.indexOf('&quot;')) {
        currentQuestions = currentQuestions.replace(/&quot;/g, '"');
    }
    if (currentQuestions.indexOf("&#039;")) {
        currentQuestions = currentQuestions.replace(/&#039;/g, "'");
    }
    if (currentQuestions.indexOf("&amp;")) {
        currentQuestions = currentQuestions.replace(/&amp;/g, "&");
    }
    if (currentQuestions.indexOf("&ldquo") > -1) {
        currentQuestions = currentQuestions.replace(/&ldquo;/g, "“");
    }
    if (currentQuestions.indexOf("&rdquo") > -1) {
      currentQuestions = currentQuestions.replace(/&rdquo;/g, "”");
    }
    if (currentQuestions.indexOf("&rsquo;") > -1) {
      currentQuestions = currentQuestions.replace(/&rsquo;/g, "’");
    }
    ques.innerText = currentQuestions;
    opt.innerHTML = "";
    const correctAnswer = questions[currentQuestion].correct_answer;
    const incorrectAnswers = questions[currentQuestion].incorrect_answers;
    const answers = [correctAnswer, ...incorrectAnswers];
    answers.sort(() => Math.random() - 0.5);

    const options = [correctAnswer, ...incorrectAnswers];
    options.sort(() => Math.random() - 0.5);    
    options.forEach(option => {
        if (option === null || option === undefined) {
            console.log("option is either undefined or null");
            return;
        }
        if (option.indexOf('&quot;') > -1) {
            option = option.replace(/&quot;/g, '"');
        }           
        if (option.indexOf("&#039;") > -1) {
            option = option.replace(/&#039;/g, "'");
        }
        if (option.indexOf("&aacute;") > -1) {
            option = option.replace(/&aacute;/g, "á");
        }
        if (option.indexOf("&ntilde;") > -1) {
            option = option.replace(/&ntilde;/g, "ñ");
        }
        if (option.indexOf("&egrave;") > -1) {
            option = option.replace(/&egrave;/g, "è");
        }
        if (option.indexOf("&eacute;") > -1) {
            option = option.replace(/&eacute;/g, "é");
        }
        if (option.indexOf("&amp;") > -1) {
            option = option.replace(/&amp;/g, "&");
        }
        const choiceDiv = document.createElement("div");
        const choice = document.createElement("input");
        const labelChoice = document.createElement("label");
        choice.type = "radio";
        choice.name = "answer";
        choice.value = option;
        labelChoice.textContent = option;
        choiceDiv.appendChild(choice);
        choiceDiv.appendChild(labelChoice);
        if (opt === null) {
            console.log("opt is null");
            return;
        }
        opt.appendChild(choiceDiv);
    });
}

setTimeout(() => {
    loadQuestion();
    if (questions.length === 0) {
        ques.innerHTML = "No questions";
    }
}, 2000);

function checkAns() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;

    if (selectedAnswer === questions[currentQuestion].correct_answer) {
        score++;
        console.log(score);
        nextQuestion();
    } else {
        nextQuestion();
        console.log(score);
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        console.log(score);
        loadQuestion();
    } else {
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        loadScore();
    }
}


function loadScore() {
    const totalScore = document.getElementById('score');
    totalScore.innerHTML = `Du fikk ${score} av ${questions.length} riktig!`;
}