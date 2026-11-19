const questions = [
    {
        question: "1. Qual é a atitude mais segura ao criar uma senha?",
        answers: [
            "Usar a mesma senha em todos os sites.",
            "Usar uma senha forte e exclusiva para cada conta.",
            "Utilizar apenas a data de nascimento.",
            "Compartilhar a senha com amigos."
        ],
        correct: 1,
        explanation: "Senhas fortes e exclusivas dificultam invasões e reduzem os riscos caso uma conta seja comprometida."
    },
    {
        question: "2. Você recebeu um link dizendo que ganhou um prêmio. O que fazer?",
        answers: [
            "Clicar imediatamente.",
            "Enviar o link para todos os contatos.",
            "Verificar a origem e desconfiar de mensagens suspeitas.",
            "Informar seus dados para receber o prêmio."
        ],
        correct: 2,
        explanation: "Mensagens com prêmios inesperados podem ser utilizadas em golpes de phishing."
    },
    {
        question: "3. O que pode indicar que uma loja virtual é suspeita?",
        answers: [
            "Informações claras sobre a empresa.",
            "Política de troca acessível.",
            "Preços muito abaixo do mercado e ausência de informações confiáveis.",
            "Atendimento transparente."
        ],
        correct: 2,
        explanation: "Preços irreais, falta de identificação e ausência de informações são sinais de alerta."
    },
    {
        question: "4. O que é phishing?",
        answers: [
            "Uma técnica para melhorar a internet.",
            "Uma tentativa de enganar pessoas para obter informações.",
            "Um programa de edição de fotos.",
            "Uma ferramenta de proteção de senhas."
        ],
        correct: 1,
        explanation: "Phishing utiliza mensagens e páginas falsas para tentar obter informações pessoais."
    },
    {
        question: "5. O que fazer se descobrir que sua senha foi exposta?",
        answers: [
            "Ignorar o aviso.",
            "Continuar usando a mesma senha.",
            "Trocar a senha por uma nova e exclusiva e verificar a segurança da conta.",
            "Publicar a senha para pedir ajuda."
        ],
        correct: 2,
        explanation: "Trocar a senha comprometida e revisar a segurança da conta são medidas importantes."
    }
];
 
const startScreen = document.getElementById("quiz-start");
const gameScreen = document.getElementById("quiz-game");
const resultScreen = document.getElementById("quiz-result");
 
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
 
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
 
const questionCount = document.getElementById("question-count");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
 
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
 
let currentQuestion = 0;
let score = 0;
let answered = false;
 
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
 
    startScreen.hidden = true;
    resultScreen.hidden = true;
    gameScreen.hidden = false;
 
    showQuestion();
}
 
function showQuestion() {
    answered = false;
 
    const current = questions[currentQuestion];
 
    questionElement.textContent = current.question;
 
    questionCount.textContent =
        `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;
 
    scoreElement.textContent = `PONTOS: ${score}`;
 
    progressElement.style.width =
        `${(currentQuestion / questions.length) * 100}%`;
 
    feedbackElement.textContent = "";
    nextButton.hidden = true;
 
    answersElement.replaceChildren();
 
    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
 
        button.type = "button";
        button.className = "answer-btn";
        button.textContent = answer;
 
        button.addEventListener("click", () => {
            selectAnswer(index);
        });
 
        answersElement.appendChild(button);
    });
}
 
function selectAnswer(selectedIndex) {
    if (answered) return;
 
    answered = true;
 
    const current = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");
 
    buttons.forEach((button, index) => {
        button.disabled = true;
 
        if (index === current.correct) {
            button.classList.add("correct");
        }
 
        if (index === selectedIndex && selectedIndex !== current.correct) {
            button.classList.add("wrong");
        }
    });
 
    if (selectedIndex === current.correct) {
        score++;
        feedbackElement.textContent = "✓ Resposta correta! " + current.explanation;
    } else {
        feedbackElement.textContent = "✗ Não foi dessa vez. " + current.explanation;
    }
 
    scoreElement.textContent = `PONTOS: ${score}`;
 
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "VER RESULTADO →"
            : "PRÓXIMA PERGUNTA →";
 
    nextButton.hidden = false;
}
 
function nextQuestion() {
    if (!answered) return;
 
    currentQuestion++;
 
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}
 
function showResult() {
    gameScreen.hidden = true;
    resultScreen.hidden = false;
 
    progressElement.style.width = "100%";
 
    finalScore.textContent = `${score}/${questions.length} PONTOS`;
 
    if (score === 5) {
        resultMessage.textContent =
            "Excelente! Você demonstrou um ótimo conhecimento sobre segurança digital. Você está preparado para identificar diversos riscos!";
    } else if (score >= 3) {
        resultMessage.textContent =
            "Muito bem! Você já conhece vários cuidados importantes. Continue aprendendo para navegar com mais segurança!";
    } else {
        resultMessage.textContent =
            "Você concluiu o desafio! Aproveite para conhecer as extensões do Guardian Shield e aprender mais sobre proteção digital.";
    }
}
 
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startQuiz);
