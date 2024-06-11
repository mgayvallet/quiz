document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  const h1 = document.getElementById('h1');
  const spanH1 = document.querySelector('.span-h1');
  const pHgroup = document.querySelector('.p-hgroup');
  const articleSections = document.querySelectorAll('.article-section');
  const h2 = document.querySelectorAll('#h2')
  
  toggleSwitch.addEventListener('change', function() {
    if (toggleSwitch.checked) {
      body.style.backgroundColor = '#313E51';
      sunIcon.src = 'assets/images/icon-sun-light.svg';
      moonIcon.src = 'assets/images/icon-moon-light.svg';
      h1.style.color = 'white';
      spanH1.style.color = 'white';
      pHgroup.style.color = '#ABC1E1';
      articleSections.forEach(article => {
        article.style.backgroundColor = '#3B4D66';
      });
      h2.forEach(h2 => {
        h2.style.color = 'white';
      });
    } else {
      body.style.backgroundColor = '#f8f4fc';
      sunIcon.src = 'assets/images/icon-sun-dark.svg';
      moonIcon.src = 'assets/images/icon-moon-dark.svg';
      h1.style.color = '#313E51';
      spanH1.style.color = '#313E51';
      pHgroup.style.color = '#626C7F';
      articleSections.forEach(article => {
        article.style.backgroundColor = '';
      });
      h2.forEach(h2 => {
        h2.style.color = '';
      });
    }
  });
});