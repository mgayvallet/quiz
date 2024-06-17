const html = document.getElementById('html');
const mainContent = document.getElementById('main-content');
const app = document.getElementById('app');
const progressContainer = document.querySelector(".progress-container");
const submitButton = document.querySelector("#submitButton");
const themeToggle = document.querySelector(".theme-toggle");

let currentQuestion = 1;
const totalQuestions = 10;
let questionCounter;
let progressBarFill;
let correctAnswersCount = 0;

html.addEventListener('click', function() {
  fetchAndDisplayQuestion();
  submitButton.style.display = "block";
});

function fetchAndDisplayQuestion() {
  fetch('https://the-trivia-api.com/v2/questions')
    .then(response => response.json())
    .then(data => {
      if (currentQuestion <= totalQuestions) {
        displayQuestion(data[0]);
      } else {
        displayFinalScore();
      }
    });
}

function displayQuestion(question) {
  mainContent.style.display = 'none'; 
  app.innerHTML = ''; 

  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');

  const questionText = document.createElement('p');
  questionText.textContent = question.question.text;

  const answersList = document.createElement('ul');
  const labels = ['A', 'B', 'C', 'D'];
  const answers = question.incorrectAnswers.concat(question.correctAnswer).sort(); 

  answers.forEach((answer, index) => {
    const answerItem = document.createElement('li');
    answerItem.classList.add('answer-item'); 

    const answerContainer = document.createElement('div');
    answerContainer.classList.add('answer-container');

    const answerLabel = document.createElement('div');
    answerLabel.classList.add('answer-label');
    answerLabel.textContent = labels[index];

    const answerText = document.createElement('div');
    answerText.classList.add('answer-text');
    answerText.textContent = answer;

    answerContainer.appendChild(answerLabel);
    answerContainer.appendChild(answerText);
    answerItem.appendChild(answerContainer);

    answersList.appendChild(answerItem);

    answerItem.addEventListener('click', function() {
      answersList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
      answerItem.classList.add('selected');
    });
  });

  submitButton.addEventListener('click', function() {
    const selectedAnswer = answersList.querySelector('.selected');
    if (selectedAnswer) {
      const selectedText = selectedAnswer.querySelector('.answer-text').textContent;
      const correctAnswerText = question.correctAnswer;

      answersList.querySelectorAll('li').forEach(li => {
        const answerLabelDiv = li.querySelector('.answer-label');
        if (li.querySelector('.answer-text').textContent === correctAnswerText) {
          const correctIcon = document.createElement('img');
          correctIcon.src = 'assets/images/icon-correct.svg';
          correctIcon.classList.add("icon");
          li.style.border = 'solid 3px #26D782';
          answerLabelDiv.style.color = "white";
          answerLabelDiv.style.backgroundColor = '#26D782';
          li.appendChild(correctIcon);
        } else if (li === selectedAnswer) {
          const incorrectIcon = document.createElement('img');
          incorrectIcon.src = 'assets/images/icon-error.svg';
          incorrectIcon.classList.add("icon");
          li.style.border = 'solid 3px #EE5454';
          answerLabelDiv.style.color = "white";
          answerLabelDiv.style.backgroundColor = '#EE5454';
          li.appendChild(incorrectIcon);
        } else {
          li.style.border = '';
          answerLabelDiv.style.color = "";
          answerLabelDiv.style.backgroundColor = ''; 
        }
      });

      if (selectedText === correctAnswerText) {
        correctAnswersCount++;
      }

      selectedAnswer.classList.remove('selected');

      setTimeout(fetchAndDisplayQuestion, 1000);
      currentQuestion++;
      updateQuestionCounter();
    }
  });

  questionDiv.appendChild(questionText);
  questionDiv.appendChild(answersList);
  questionDiv.appendChild(submitButton);
  app.appendChild(questionDiv);

  if (!questionCounter) {
    questionCounter = document.createElement('span');
    questionCounter.id = 'question-counter';
    document.querySelector('.progress-container').prepend(questionCounter);
  }
  if (!progressBarFill) {
    progressBarFill = document.createElement('div');
    progressBarFill.classList.add('progress-fill');
    document.querySelector('.progress-bar').appendChild(progressBarFill);
  }

  updateQuestionCounter();
}

function updateQuestionCounter() {
  if (currentQuestion <= totalQuestions) {
    questionCounter.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
  }
}

function displayFinalScore() {
  app.innerHTML = ''; 
  progressBarFill.style.display = "none"
  progressContainer.style.display = 'none';

  const finalScoreDiv = document.createElement('div');
  finalScoreDiv.classList.add('final-score-container');

  const scoreHeader = document.createElement('h2');
  scoreHeader.textContent = 'Quiz completed';
  scoreHeader.classList.add('h2Score')
  finalScoreDiv.appendChild(scoreHeader);

  const scoreSubHeader = document.createElement('p');
  scoreSubHeader.textContent = 'You scored...';
  scoreSubHeader.classList.add('pScore')
  finalScoreDiv.appendChild(scoreSubHeader);

  const scoreCard = document.createElement('div');
  scoreCard.classList.add('score-card');

  const divHtml = document.createElement('div')
  divHtml.classList.add("elie")
  scoreCard.appendChild(divHtml)

  const icon = document.createElement('img');
  icon.src = 'assets/images/icon-html.svg'; 
  icon.alt = 'html Icon';
  icon.classList.add('score-icon');
  const phmtl = document.createElement("p")
  phmtl.textContent = "html"
  phmtl.classList.add("phtml")
  divHtml.appendChild(icon);
  divHtml.appendChild(phmtl)

  const score = document.createElement('span');
  score.classList.add('score');
  score.textContent = correctAnswersCount;
  scoreCard.appendChild(score);

  const totalScore = document.createElement('p');
  totalScore.classList.add('total-score');
  totalScore.textContent = `out of ${totalQuestions}`;
  scoreCard.appendChild(totalScore);

  finalScoreDiv.appendChild(scoreCard);

  const playAgainButton = document.createElement('button');
  playAgainButton.classList.add('btn', 'play-again');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.addEventListener('click', function() {
    location.reload();
  });

  finalScoreDiv.appendChild(playAgainButton);
  app.appendChild(finalScoreDiv);
}

themeToggle.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
});
