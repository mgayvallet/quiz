fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));