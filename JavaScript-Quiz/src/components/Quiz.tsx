import React, { useState, useEffect, useCallback } from 'react';
import { Timer, AlertCircle, CheckCircle2, XCircle, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const TOTAL_TIME = 15 * 60; // 15 minutes in seconds
const WARNING_TIME = 5 * 60; // 5 minutes warning
const DANGER_TIME = 60; // 1 minute warning

const questions: Question[] = [
  {
    id: 1,
    question: "What is the output of typeof null in JavaScript?",
    options: ["undefined", "object", "null", "number"],
    correctAnswer: "object"
  },
  {
    id: 2,
    question: "Which method is used to add elements at the beginning of an array?",
    options: ["unshift()", "push()", "shift()", "pop()"],
    correctAnswer: "unshift()"
  },
  {
    id: 3,
    question: "What is the purpose of the 'use strict' directive in JavaScript?",
    options: [
      "To enable strict type checking",
      "To catch common coding mistakes and prevent unsafe actions",
      "To improve code performance",
      "To enable new JavaScript features"
    ],
    correctAnswer: "To catch common coding mistakes and prevent unsafe actions"
  },
  {
    id: 4,
    question: "What is closure in JavaScript?",
    options: [
      "A way to protect variables from being modified",
      "A function that has access to variables in its outer scope",
      "A method to close browser windows",
      "A way to end JavaScript execution"
    ],
    correctAnswer: "A function that has access to variables in its outer scope"
  },
  {
    id: 5,
    question: "What is the difference between == and === operators?",
    options: [
      "No difference, they are the same",
      "== compares values, === compares values and types",
      "=== compares values, == compares types",
      "== is deprecated, === is the new standard"
    ],
    correctAnswer: "== compares values, === compares values and types"
  },
  {
    id: 6,
    question: "What is the purpose of Promise in JavaScript?",
    options: [
      "To handle synchronous operations",
      "To handle asynchronous operations",
      "To promise code will work",
      "To improve code readability"
    ],
    correctAnswer: "To handle asynchronous operations"
  },
  {
    id: 7,
    question: "What is event bubbling in JavaScript?",
    options: [
      "A way to create multiple events",
      "When an event triggers on a child element and propagates up through parents",
      "A method to prevent events",
      "A type of event listener"
    ],
    correctAnswer: "When an event triggers on a child element and propagates up through parents"
  },
  {
    id: 8,
    question: "What is the purpose of the map() method?",
    options: [
      "To create a new map object",
      "To create a new array with results of calling a function for every array element",
      "To modify the original array",
      "To filter array elements"
    ],
    correctAnswer: "To create a new array with results of calling a function for every array element"
  },
  {
    id: 9,
    question: "What is hoisting in JavaScript?",
    options: [
      "Moving all variable declarations to the top",
      "Lifting elements in the DOM",
      "A way to organize code",
      "A deprecated feature"
    ],
    correctAnswer: "Moving all variable declarations to the top"
  },
  {
    id: 10,
    question: "What is the purpose of JSON.stringify()?",
    options: [
      "To parse JSON",
      "To convert JavaScript object to JSON string",
      "To validate JSON",
      "To create JSON object"
    ],
    correctAnswer: "To convert JavaScript object to JSON string"
  },
  {
    id: 11,
    question: "What is the purpose of setTimeout()?",
    options: [
      "To pause code execution",
      "To execute a function after a specified delay",
      "To set time in JavaScript",
      "To measure code execution time"
    ],
    correctAnswer: "To execute a function after a specified delay"
  },
  {
    id: 12,
    question: "What is the difference between let and var?",
    options: [
      "No difference",
      "let has block scope, var has function scope",
      "var is newer than let",
      "let is deprecated"
    ],
    correctAnswer: "let has block scope, var has function scope"
  },
  {
    id: 13,
    question: "What is the purpose of async/await?",
    options: [
      "To make code run faster",
      "To write asynchronous code that looks synchronous",
      "To create functions",
      "To handle errors"
    ],
    correctAnswer: "To write asynchronous code that looks synchronous"
  },
  {
    id: 14,
    question: "What is the purpose of the spread operator (...)?",
    options: [
      "To spread infection",
      "To expand elements where multiple elements are expected",
      "To combine arrays",
      "To create objects"
    ],
    correctAnswer: "To expand elements where multiple elements are expected"
  },
  {
    id: 15,
    question: "What is the purpose of localStorage?",
    options: [
      "To store data in browser that persists across sessions",
      "To store data temporarily",
      "To store server data",
      "To cache JavaScript files"
    ],
    correctAnswer: "To store data in browser that persists across sessions"
  },
  {
    id: 16,
    question: "What is the purpose of Array.reduce()?",
    options: [
      "To reduce array size",
      "To accumulate array values into a single value",
      "To filter array elements",
      "To sort array elements"
    ],
    correctAnswer: "To accumulate array values into a single value"
  },
  {
    id: 17,
    question: "What is event delegation?",
    options: [
      "Assigning events to multiple elements",
      "Delegating events to other functions",
      "Attaching event to parent element to handle children events",
      "A way to remove events"
    ],
    correctAnswer: "Attaching event to parent element to handle children events"
  },
  {
    id: 18,
    question: "What is the purpose of Object.freeze()?",
    options: [
      "To make objects immutable",
      "To store objects in cold storage",
      "To pause object execution",
      "To clone objects"
    ],
    correctAnswer: "To make objects immutable"
  },
  {
    id: 19,
    question: "What is the purpose of Array.filter()?",
    options: [
      "To modify array elements",
      "To create a new array with elements that pass a test",
      "To remove array elements",
      "To sort array elements"
    ],
    correctAnswer: "To create a new array with elements that pass a test"
  },
  {
    id: 20,
    question: "What is the purpose of try...catch?",
    options: [
      "To try new features",
      "To handle errors gracefully",
      "To catch bugs",
      "To improve performance"
    ],
    correctAnswer: "To handle errors gracefully"
  },
  {
    id: 21,
    question: "What is the purpose of const?",
    options: [
      "To declare variables",
      "To declare constants that cannot be reassigned",
      "To create functions",
      "To define classes"
    ],
    correctAnswer: "To declare constants that cannot be reassigned"
  },
  {
    id: 22,
    question: "What is the purpose of Array.find()?",
    options: [
      "To find index of element",
      "To return the first element that passes a test",
      "To search multiple elements",
      "To check if element exists"
    ],
    correctAnswer: "To return the first element that passes a test"
  },
  {
    id: 23,
    question: "What is the purpose of template literals?",
    options: [
      "To create templates",
      "To write multiline strings and use string interpolation",
      "To format text",
      "To create HTML templates"
    ],
    correctAnswer: "To write multiline strings and use string interpolation"
  },
  {
    id: 24,
    question: "What is the purpose of Object.keys()?",
    options: [
      "To create object keys",
      "To return an array of object's enumerable property names",
      "To lock object properties",
      "To sort object properties"
    ],
    correctAnswer: "To return an array of object's enumerable property names"
  },
  {
    id: 25,
    question: "What is the purpose of preventDefault()?",
    options: [
      "To prevent JavaScript errors",
      "To stop event's default behavior",
      "To prevent code execution",
      "To prevent memory leaks"
    ],
    correctAnswer: "To stop event's default behavior"
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitted]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleQuestionSelect = (index: number) => {
    setVisitedQuestions(prev => new Set(prev).add(index));
    setCurrentQuestion(index);
  };

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setVisitedQuestions(prev => new Set(prev).add(currentQuestion + 1));
    }
  }, [currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  }, [currentQuestion]);

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;

    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (questions[Number(questionIndex)].correctAnswer === answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect };
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
    setShowResults(true);
  };

  const getQuestionButtonColor = (index: number) => {
    if (!isSubmitted) {
      if (answers[index] !== undefined) return 'bg-green-500';
      if (visitedQuestions.has(index)) return 'bg-red-500';
      return 'bg-gray-300';
    } else {
      if (answers[index] === questions[index].correctAnswer) return 'bg-green-500';
      if (answers[index] !== undefined) return 'bg-red-500';
      return 'bg-gray-300';
    }
  };

  const getTimerColor = () => {
    if (timeRemaining <= DANGER_TIME) return 'text-red-600 animate-pulse';
    if (timeRemaining <= WARNING_TIME) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Score Overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Quiz Completed!
              </h1>
              <div className="text-6xl font-bold text-indigo-600 mb-2">
                {Math.round((score.correct / questions.length) * 100)}%
              </div>
              <p className="text-gray-600 text-xl">
                You scored {score.correct} out of {questions.length} questions correctly!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600 mb-1">{score.correct}</div>
                <div className="text-green-800">Correct Answers</div>
              </div>
              <div className="bg-red-50 rounded-xl p-6 text-center">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-red-600 mb-1">{score.incorrect}</div>
                <div className="text-red-800">Incorrect Answers</div>
              </div>
            </div>
          </div>

          {/* Detailed Review */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Review</h2>
            
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div 
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 ${
                    !userAnswer ? 'border-gray-400 bg-gray-50' :
                    isCorrect ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {!userAnswer ? (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">{index + 1}</span>
                        </div>
                      ) : isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">
                        {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg ${
                              option === question.correctAnswer
                                ? 'bg-green-100 text-green-800'
                                : option === userAnswer && option !== question.correctAnswer
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-50 text-gray-800'
                            }`}
                          >
                            <div className="flex items-center">
                              {option === question.correctAnswer && (
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                              )}
                              {option === userAnswer && option !== question.correctAnswer && (
                                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                              )}
                              {option}
                            </div>
                          </div>
                        ))}
                      </div>
                      {!userAnswer && (
                        <div className="mt-3 text-gray-500 italic">
                          Not answered
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Timer Panel */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            JavaScript Quiz
          </h1>
          <div className={`flex items-center gap-3 ${getTimerColor()} text-3xl font-bold px-6 py-2 rounded-xl bg-white/50 backdrop-blur shadow-inner`}>
            <Timer className="w-8 h-8" />
            {formatTime(timeRemaining)}
          </div>
          <div className="text-lg font-medium bg-indigo-100 px-4 py-2 rounded-lg">
            Progress: {Object.keys(answers).length}/25
          </div>
        </div>
      </div>

      <div className="pt-24 px-6 pb-6 flex gap-6 max-w-7xl mx-auto">
        {/* Left sidebar - Question numbers */}
        <div className="w-64 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 h-fit sticky top-24">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Questions</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionSelect(index)}
                className={`aspect-square rounded-lg text-white font-medium text-lg hover:opacity-90 transition-all duration-200
                  ${getQuestionButtonColor(index)}
                  ${currentQuestion === index ? 'ring-4 ring-offset-2 ring-indigo-500 scale-110' : ''}
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowConfirmation(true)}
            disabled={Object.keys(answers).length < questions.length && timeRemaining > 0}
            className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Submit Quiz
          </button>
        </div>

        {/* Main content - Question */}
        <div className="flex-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Question {currentQuestion + 1}/25
              </h2>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300" 
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xl text-gray-800 mb-6">{questions[currentQuestion].question}</p>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <label 
                    key={index} 
                    className={`flex items-center p-4 border-2 rounded-xl transition-all duration-200 
                      ${answers[currentQuestion] === option 
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-inner' 
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50/50'} 
                      cursor-pointer backdrop-blur-sm`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() => handleAnswerSelect(option)}
                      className="w-5 h-5 text-indigo-600 mr-4"
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar - Progress */}
        <div className="w-80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 h-fit sticky top-24">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quiz Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm">
              <span className="font-medium text-gray-700">Questions Attempted</span>
              <span className="font-bold text-green-600">{Object.keys(answers).length}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm">
              <span className="font-medium text-gray-700">Questions Visited</span>
              <span className="font-bold text-blue-600">{visitedQuestions.size}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-sm">
              <span className="font-medium text-gray-700">Questions Remaining</span>
              <span className="font-bold text-purple-600">{25 - Object.keys(answers).length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
              <h3 className="text-2xl font-bold text-gray-900">Confirm Submission</h3>
            </div>
            <p className="text-lg text-gray-600 mb-8">Are you sure you want to submit your quiz?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;