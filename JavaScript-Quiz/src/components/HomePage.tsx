import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, BrainCircuit } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <BrainCircuit className="w-20 h-20 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            JavaScript Quiz
          </h1>
          <p className="text-xl text-gray-600">
            Test your JavaScript expertise with our comprehensive quiz.
          </p>
        </div>

        {/* Instructions Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Instructions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Time Limit</h3>
                <p className="text-gray-600">
                  You have 15 minutes to complete the quiz. The timer will start as soon as you begin.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Questions</h3>
                <p className="text-gray-600">
                  25 multiple-choice questions covering various JavaScript concepts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Scoring</h3>
                <p className="text-gray-600">
                  Each question is worth one point. Your final score will be displayed upon completion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rules and Guidelines */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Rules & Guidelines</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              You can navigate between questions using the number grid or next/previous buttons.
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              You can review and change your answers before final submission.
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              The quiz will auto-submit when the time limit is reached.
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Ensure you have a stable internet connection before starting.
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/quiz')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;