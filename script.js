let fabrics = {};

fetch('fabrics.json')
  .then(response => response.json())
  .then(data => {
    fabrics = data;
    loadQuestion(); // Start the quiz by loading the first question
  })
  .catch(error => console.error('An error occurred while fetching the fabrics data:', error));

let currentQuestionIndex = 0;
const userAnswers = {};


const questions = [
  {
    question: 'Which season?',
    options: ['Cold', 'Warm', 'Any Season']
  },
  {
    question: 'Is it supposed to be breathable?',
    options: ['yes', 'no']
  },
  {
    question: 'Can it cause irritation for people with sensitive skin?',
    options: ['yes', 'no']
  },
  {
    question: 'Cost bracket?',
    options: ['$', '$$', '$$$']
  },
  {
    question: 'Is it sustainable?',
    options: ['yes', 'no']
  }
];

// Function to load a question
function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
      <h2>${questionData.question}</h2>
      ${questionData.options.map(option => `<button onclick="selectAnswer('${option}');">${option}</button>`).join('')}
    `;
  } else {
    calculateResults();
  }
}

// Function to handle the selection of an answer
function selectAnswer(answer) {
  const key = Object.keys(fabrics["Wool"])[currentQuestionIndex]; // Using "Wool" as a representative fabric for structure
  userAnswers[key] = answer;
  currentQuestionIndex++;
  loadQuestion();
}

// Function to calculate and display the results
function calculateResults() {
  const container = document.getElementById('result-container');
  const scores = Object.keys(fabrics).map(fabric => {
    return {
      name: fabric,
      score: Object.keys(userAnswers).reduce((score, key) => {
        if (fabrics[fabric][key] === userAnswers[key]) {
          return score + 1;
        }
        return score;
      }, 0)
    };
  });
  scores.sort((a, b) => b.score - a.score);
  const topResults = scores.slice(0, 3);
  container.innerHTML = `<h2>Top Fabrics:</h2><ul>${topResults.map(result => `<li>${result.name} (${result.score} points of correlation)</li>`).join('')}</ul>`;
}

// Start the quiz by loading the first question
loadQuestion();
