document.addEventListener('DOMContentLoaded', function() {
  const html = document.getElementById('html');
  const mainContent = document.getElementById('main-content');
  const app = document.getElementById('app');
  const progressContainer = document.querySelector(".progress-container")

  let currentQuestion = 1;
  const totalQuestions = 10;
  let questionCounter;
  let progressBarFill;
  let correctAnswersCount = 0; 
  html.addEventListener('click', function() {
    fetchAndDisplayQuestion();
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
      })
      .catch(error => console.error('Error fetching questions:', error));
  }

  function displayQuestion(question) {
    mainContent.style.display = 'none'; 
    app.innerHTML = ''; 

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = question.question.text;

    const answersList = document.createElement('ul');
    const answers = question.incorrectAnswers.concat(question.correctAnswer).sort(); 
    answers.forEach(answer => {
      const answerItem = document.createElement('li');
      answerItem.textContent = answer;
      answersList.appendChild(answerItem);
      answerItem.addEventListener('click', function() {
        answersList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
        answerItem.classList.add('selected');
      });
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Answer';
    submitButton.addEventListener('click', function() {
      const selectedAnswer = answersList.querySelector('.selected');
      if (selectedAnswer) {
        answersList.querySelectorAll('li').forEach(li => {
          if (li.textContent === question.correctAnswer) {
            li.style.backgroundColor = 'green';
            li.style.color = 'white';
          } else if (li === selectedAnswer) {
            li.style.backgroundColor = 'red';
            li.style.color = 'white';
          } else {
            li.style.backgroundColor = '';
            li.style.color = '';
          }
        });

        if (selectedAnswer.textContent === question.correctAnswer) {
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
    progressContainer.style.display = 'none'

    const finalScoreDiv = document.createElement('div');
    finalScoreDiv.classList.add('final-score');

    const scoreText = document.createElement("section")
    scoreText.innerHTML = `
    <span class="correct">${correctAnswersCount} </span>
    <p class="incorrect">out of ${totalQuestions}</p> 
    `;

    finalScoreDiv.appendChild(scoreText);
    app.appendChild(finalScoreDiv);
  }
});
