'use client';

import React, { useState } from 'react';
import QUESTIONS from './questionBank';

const LEVEL_ORDER = ['first-date', 'third-date', 'deep-bond'];

const SESSION_LIMITS = {
  'first-date': 8,
  'third-date': 8,
  'deep-bond': 6,
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ConnectionToolkit() {
  const [screen, setScreen] = useState('start'); // start | levels | questions
  const [activeLevel, setActiveLevel] = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  function selectMode() {
    setScreen('levels');
  }

  function startLevel(levelKey) {
    const all = QUESTIONS[levelKey].questions;
    const limit = SESSION_LIMITS[levelKey];
    setSessionQuestions(shuffle(all).slice(0, Math.min(limit, all.length)));
    setActiveLevel(levelKey);
    setIndex(0);
    setScreen('questions');
  }

  function next() {
    if (index < sessionQuestions.length - 1) {
      setIndex(index + 1);
    } else {
      setScreen('done');
    }
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  function restart() {
    setScreen('start');
    setActiveLevel(null);
    setSessionQuestions([]);
    setIndex(0);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="bg-white rounded-[20px] shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-700 text-white text-center px-10 py-10">
          <h1 className="text-3xl font-bold">💭 Connection Toolkit</h1>
          <p className="mt-2 text-white/90">Intentional questions for deeper relationships</p>
        </div>

        {screen === 'start' && (
          <div className="grid sm:grid-cols-1 gap-4 p-8 bg-slate-50">
            <button
              onClick={selectMode}
              className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-500 hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-2">💑</div>
              <div className="font-semibold text-slate-800">Dating Mode</div>
              <p className="text-sm text-slate-500 mt-1">
                Three levels, from casual to vulnerable
              </p>
            </button>
          </div>
        )}

        {screen === 'levels' && (
          <div className="grid sm:grid-cols-3 gap-4 p-8 bg-slate-50">
            {LEVEL_ORDER.map((key) => {
              const lvl = QUESTIONS[key];
              return (
                <button
                  key={key}
                  onClick={() => startLevel(key)}
                  className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-500 hover:-translate-y-1 transition-all"
                >
                  <div className="text-3xl mb-2">{lvl.icon}</div>
                  <div className="font-semibold text-slate-800">{lvl.category}</div>
                  <p className="text-xs text-slate-400 mt-1">{lvl.questions.length} questions available</p>
                </button>
              );
            })}
          </div>
        )}

        {screen === 'questions' && sessionQuestions.length > 0 && (
          <div>
            <div className="h-1.5 bg-slate-200 mx-10 mt-6 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-700 transition-all duration-300"
                style={{ width: `${((index + 1) / sessionQuestions.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-center p-10">
              <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-slate-100">
                <span className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  {sessionQuestions[index].theme}
                </span>
                <p className="text-sm text-indigo-500 mb-2">
                  Question {index + 1} of {sessionQuestions.length} · Take your time
                </p>
                <p className="text-xl text-slate-800 mb-8">{sessionQuestions[index].text}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={prev}
                    disabled={index === 0}
                    className="px-6 py-3 rounded-xl font-semibold border-2 border-indigo-500 text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={next}
                    className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-700"
                  >
                    {index === sessionQuestions.length - 1 ? 'Finish' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'done' && (
          <div className="text-center p-12">
            <div className="text-5xl mb-4">💛</div>
            <p className="text-xl font-semibold text-slate-800 mb-6">Session complete</p>
            <button
              onClick={restart}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-700"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
