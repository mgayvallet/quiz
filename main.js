document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  const h1 = document.getElementById('h1');
  const spanH1 = document.querySelector('.span-h1');
  const pHgroup = document.querySelector('.p-hgroup');
  const articleSections = document.querySelectorAll('.article-section');
  const h2 = document.querySelectorAll('#h2');
  const mainContent = document.getElementById('main-content');
  const app = document.getElementById('app');

  let currentQuestion = 1;
  const totalQuestions = 10;
  let questionCounter;
  let progressBarFill;

  toggleSwitch.addEventListener('change', function() {
    // Logique pour changer le thème
  });

  h1.addEventListener('click', function() {
    fetchAndDisplayQuestion();
  });

  function fetchAndDisplayQuestion() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(response => response.json())
      .then(data => {
        displayQuestion(data[0]);
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
          } else {
            li.style.backgroundColor = '';
            li.style.color = '';
          }
        });
        selectedAnswer.classList.remove('selected');

        setTimeout(fetchAndDisplayQuestion, 1000);
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
          updateQuestionCounter();
        }
      }
    });

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(answersList);
    questionDiv.appendChild(submitButton);
    app.appendChild(questionDiv);

    // Création et mise à jour du compteur de questions et de la barre de progression
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

  // Fonction pour mettre à jour le compteur de questions et la barre de progression
  function updateQuestionCounter() {
    questionCounter.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
  }
});
