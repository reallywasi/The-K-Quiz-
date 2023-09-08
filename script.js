const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");


const quiz = [
  {
    question: " Q1. Who is the leader of BTS?",
    choices: ["RM", "Jin", "Suga", "J-Hope"],
    answer: "RM",
  },
  {
    question:
      " Q2. Which BTS song features the lyrics 'I'm the one I should love in this world'?",
    choices: ["DNA", "Spring Day", "Epiphany", "IDOL"],
    answer: "Epiphany",
  },
  {
    question:
      " Q3. Descendants of the Sun', which country does Captain Yoo Shi Jin belong to?",
    choices: ["South Korea", "North Korea", "United States", "Canada"],
    answer: "South Korea",
  },
  {
    question: " Q4. What is the name of BTS's fandom?",
    choices: ["ARMY", "EXO-L", "Once", "BLINK"],
    answer: "ARMY",
  },
  {
    question: "Q5. In the KDrama 'Goblin', what is the goblin's real name?",
    choices: ["Kim Shin", "Lee Yeon Seo", "Ji Eun Tak", "Woo Yeon Hwa"],
    answer: "Kim Shin",
  },
  {
    question:
      " Q6. Which BTS member is known for his exceptional dancing skills and is also a lead dancer in the group?",
    choices: ["Jimin", "Jungkook", "V", "Jin"],
    answer: "Jimin",
  },
  {
    question:
      "Q7.  Which KDrama is a romantic fantasy about a mermaid who finds love in the human world?",
    choices: [
      "Moon Lovers: Scarlet Heart Ryeo",
      "Hotel Del Luna",
      "The Legend of the Blue Sea",
      "Boys Over Flowers",
    ],
    answer: "The Legend of the Blue Sea",
  },
  {
    question:
      "Q8. BTS collaborated with which American artist for the song 'Boy With Luv'?",
    choices: ["Justin Bieber", "Ed Sheeran", "Halsey", "Ariana Grande"],
    answer: "Halsey",
  },
  {
    question:
      "Q9. In the KDrama 'Itaewon Class', what is the name of the unique pub opened by Park Sae Royi?",
    choices: ["DanBam", "Myeongdong Pub", "Cafe Midnight", "Ssangmun-dong Pub"],
    answer: "DanBam",
  },
  {
    question: "Q10. Which BTS member is the group's main rapper?",
    choices: ["RM", "J-Hope", "Suga", "V"],
    answer: "RM",
  },
  // New Questions:
  {
    question:
      "Q11.  Which KDrama stars Park Seo Joon and Kim Ji Won as childhood friends with a unique dream?",
    choices: [
      "Crash Landing on You",
      "Descendants of the Sun",
      "Fight for My Way",
      "What's Wrong with Secretary Kim",
    ],
    answer: "Fight for My Way",
  },
  {
    question:
      "Q12. Which BTS song is an anthem of self-love with the lyrics 'You've shown me I have reasons / I should love myself'?",
    choices: ["Dope", "Not Today", "Answer: Love Myself", "Fire"],
    answer: "Answer: Love Myself",
  },
  {
    question: "Q13. In the KDrama 'Vincenzo', what is Vincenzo's real name?",
    choices: ["Park Joo Hyung", "Vincenzo Cassano", "Kang Han Na", "Han Seo"],
    answer: "Vincenzo Cassano",
  },
  {
    question: "Q14. BTS made their debut in which year?",
    choices: ["2011", "2012", "2013", "2014"],
    answer: "2013",
  },
  {
    question:
      "Q15. Which KDrama revolves around a woman who can see death in people's eyes as dark shadows?",
    choices: [
      "While You Were Sleeping",
      "Doctor Stranger",
      "W: Two Worlds",
      "Hello, Monster",
    ],
    answer: "While You Were Sleeping",
  },
];







let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;





const showQuestions = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;

  choicesBox.textContent = "";
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice");
    choicesBox.appendChild(choiceDiv);



    choiceDiv.addEventListener("click", () => {
      if (choiceDiv.classList.contains("selected")) {
        choiceDiv.classList.remove("selected");
      } else {
        choiceDiv.classList.add("selected");
      }
    });
  }



  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
};





const checkAnswer = () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    // alert("Correct Answer!");
    displayAlert("Correct Answer!");
    score++;
  } else {
    // alert("Wrong answer");
    displayAlert(
      `Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`
    );
  }
  timeLeft = 15;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    stopTimer();
    showScore();
  }
};






const showScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
  displayAlert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
};






const displayAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};









const startTimer = () => {
  clearInterval(timerID); // Check for any exist timers
  timer.textContent = timeLeft;

  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      const confirmUser = confirm(
        "Time Up!!! Do you want to play the quiz again"
      );
      if (confirmUser) {
        timeLeft = 15;
        startQuiz();
      } else {
        startBtn.style.display = "block";
        container.style.display = "none";
        return;
      }
    }
  };
  timerID = setInterval(countDown, 1000);
};


const stopTimer = () => {
  clearInterval(timerID);
};





const shuffleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};





const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = "flex";
  shuffleQuestions();
};




startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});





nextBtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Next") {
    displayAlert("Select your answer");
    return;
  }
  if (quizOver) {
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});
