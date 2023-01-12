const question = document.querySelector("#question");
const answerBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

//perguntas que serão feitas

const questions = [
  {
    "question": "PHP foi desenvolvido para qual proposito?",
    answers: [
      {
        answer: "BACK AND",
        correct: true,
      },
      {
        answer: "FRONT AND",
        correct: false,
      },
      {
        answer: "BANCO DE DADOS",
        correct: false,
      },
      {
        answer: "LOGICA",
        correct: false,
      },
    ],
  },
  {
    "question": "Qual a idade do Saraego?",
    answers: [
      {
        answer: "22",
        correct: false,
      },
      {
        answer: "20",
        correct: false,
      },
      {
        answer: "26",
        correct: true,
      },
      {
        answer: "30",
        correct: false,
      },
    ],
  },
  {
    "question": "Qual a idade da Izabely?",
    answers: [
      {
        answer: "23",
        correct: true,
      },
      {
        answer: "20",
        correct: false,
      },
      {
        answer: "26",
        correct: false,
      },
      {
        answer: "30",
        correct: false,
      },
    ],
  },
];

function init() {
  createQuestion(0);
}

function createQuestion(i) {
  //limpa questao anterior
  const oldButtons = answerBox.querySelectorAll("button");
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  //altera o texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  //insere as alternativas
  questions[i].answers.forEach((answer, i) => {
    //criar o template do botão do quizz
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);
    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    //remove hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    //inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    //inserir evento de click no botao
    answerTemplate.addEventListener("click", function () {
      checkAnswer(this);
    });
  });

  //incrementar o numero da questao
  actualQuestion++;
}

//verificando resposta do usuario
function checkAnswer(btn) {
  //seleciona todos os botoes
  const buttons = answerBox.querySelectorAll("button");

  //verifica se a reposta esta correta e add class nos botoes

  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");

      //checa se o usuario acertou a pergunta
      if (btn === button) {
        //incremento dos pontos
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });
  //exibir proxima pergunta
  nextQuestion();
}

//exibe a proxima pergunta
function nextQuestion() {
  //time para os usuarios verem as respostas
  setTimeout(function() {
    //check verifica se ainda ha perguntas
    if (actualQuestion >= questions.length) {
      //apresenta a msg de sucesso
      showSuccesMessage()
      
    }
    createQuestion(actualQuestion);
  }, 1500);
}

function showSuccesMessage(){
    hideShowQuizz()

    //troca dados da tela de sucesso

    //calcular store
    const score = ((points / questions.length) * 100).toFixed(2)
    const displayScore = document.querySelector('#display-score span')
    displayScore.textContent = score.toString()

    //altera o numero de perguntas corretas
    const correctAnswer = document.querySelector('#correct-answers')
    correctAnswer.textContent = points

    //altera o total de perguntas
    const totalQuestions = document.querySelector("#question-qty")
    totalQuestions.textContent = questions.length
}

//mostra ou esconde o score
function hideShowQuizz(){
    quizzContainer.classList.toggle('hide')
    scoreContainer.classList.toggle('hide')
}

//reqiniciar quizz
const restartBtn = document.querySelector("#restart")
restartBtn.addEventListener('click', ()=>{
    //zera o jogo
    actualQuestion = 0
    points = 0
    hideShowQuizz()
    init()
})

//inicializar o quizz
init();
