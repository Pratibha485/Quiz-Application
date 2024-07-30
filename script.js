const questions=[
    {
        question: "What is the correct syntax to write an HTML comment?",
        answers:[
            {text:"<!--comment-->",correct:true},
            {text:"//comment",correct:false},
            {text:"<--comment-->",correct:false},
            {text:"/*comment&/",correct:false},
        ]
    },
    {
        question: " Which of the following tag is used for inserting the largest heading in HTML?",
        answers:[
            {text:"<h3>",correct:false},
            {text:"<h2>",correct:false},
            {text:"<h4>",correct:false},
            {text:"<h1>",correct:true},
        ]
    },
    {
        question: " Which of the following tag is used to make the underlined text?",
        answers:[
            {text:"<i>",correct:false},
            {text:"<ul>",correct:false},
            {text:"<u>",correct:true},
            {text:"<pre>",correct:false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
        ]
    },
    {
        question: "What is the name of the Indian Prime Minister",
        answers:[
            {text:"Mr. Narendra Modi",correct:true},
            {text:"Dr. Rajendra Prasad",correct:false},
            {text:"Mrs. Indira Gandhi",correct:false},
            {text:"Mr.Yogi Adityanath",correct:false},
        ]
    },
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-button");

let currentQuestionIndex =0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + "."+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
        
    }
}

function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
