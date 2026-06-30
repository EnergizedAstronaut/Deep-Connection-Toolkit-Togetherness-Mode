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
    const p2Categories = {};

    person1Items.forEach(item => {
      p1Categories[item.category] = (p1Categories[item.category] || 0) + 1;
    });

    person2Items.forEach(item => {
      p2Categories[item.category] = (p2Categories[item.category] || 0) + 1;
    });

    const allCategories = new Set([...Object.keys(p1Categories), ...Object.keys(p2Categories)]);
    const commonCategories = Array.from(allCategories).filter(c => p1Categories[c] && p2Categories[c]);

    const baseScore = allCategories.size > 0 ? (commonCategories.length / allCategories.size) * 100 : 0;

    const commonItems = person1Items.filter(item1 => 
      person2Items.some(item2 => item2.id === item1.id)
    ).length;
    const itemBonus = Math.min(commonItems * 8, 30);

    const finalScore = Math.min(Math.round(baseScore + itemBonus), 100);

    const shared = commonCategories.map(cat => ({
      name: cat,
      person1Count: p1Categories[cat],
      person2Count: p2Categories[cat],
      total: p1Categories[cat] + p2Categories[cat]
    })).sort((a, b) => b.total - a.total);

    const generatedInsights = generateInsights(finalScore, shared, commonItems);

    return {
      score: finalScore,
      shared,
      insights: generatedInsights,
      commonItems
    };
  };

  const generateInsights = (score, shared, commonCount) => {
    const newInsights = [];

    if (score >= 80) {
      newInsights.push({ icon: '🎉', text: 'Exceptional connection! You have remarkably similar preferences.' });
    } else if (score >= 60) {
      newInsights.push({ icon: '✨', text: 'Strong compatibility! You share many core interests.' });
    } else if (score >= 40) {
      newInsights.push({ icon: '🎯', text: 'Moderate alignment with healthy diversity.' });
    } else {
      newInsights.push({ icon: '🌈', text: 'Beautifully diverse! You bring different perspectives.' });
    }

    if (commonCount > 0) {
      newInsights.push({ 
        icon: '💫', 
        text: `You both selected ${commonCount} of the same ${activeCategory}!` 
      });
    }

    if (shared.length > 0) {
      const top = shared[0];
      newInsights.push({ 
        icon: '❤️', 
        text: `Strong shared passion for ${top.name}` 
      });
    }

    if (shared.length >= 3) {
      newInsights.push({ 
        icon: '🔗', 
        text: `You connect on ${shared.length} different categories` 
      });
    }

    return newInsights;
  };

  useEffect(() => {
    const result = calculateCompatibility();
    setCompatibilityScore(result.score);
    setSharedCategories(result.shared);
    setInsights(result.insights);
  }, [person1Items, person2Items]);

  const addItem = (item, personNum) => {
    if (personNum === 1) {
      if (!person1Items.some(i => i.id === item.id)) {
        setPerson1Items([...person1Items, item]);
      }
    } else {
      if (!person2Items.some(i => i.id === item.id)) {
        setPerson2Items([...person2Items, item]);
      }
    }
  };

  const removeItem = (itemId, personNum) => {
    if (personNum === 1) {
      setPerson1Items(person1Items.filter(i => i.id !== itemId));
    } else {
      setPerson2Items(person2Items.filter(i => i.id !== itemId));
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: 'from-purple-600 to-pink-600',
      blue: 'from-blue-600 to-cyan-600',
      green: 'from-green-600 to-emerald-600',
      orange: 'from-orange-600 to-red-600',
      pink: 'from-pink-600 to-rose-600',
      indigo: 'from-indigo-600 to-purple-600'
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-pink-400 fill-pink-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Deep Connection Toolkit
            </h1>
            <Brain className="w-12 h-12 text-cyan-400" />
          </div>
          <p className="text-xl text-gray-300 mb-2">
            Discover how deeply you connect with someone special
          </p>
          <p className="text-sm text-gray-400">
            Analyze compatibility across movies, music, values, and more
          </p>
        </div>

        {/* Compatibility Score Card */}
        {(person1Items.length > 0 || person2Items.length > 0) && (
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 mb-8 border border-purple-500/30 backdrop-blur">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 text-center">
                <p className="text-gray-300 text-sm mb-2">Connection Score</p>
                <div className="text-7xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  {compatibilityScore}%
                </div>
                <div className="w-full bg-slate-800 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-pink-600 to-cyan-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${compatibilityScore}%` }}
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-xl font-bold">Key Insights</h3>
                </div>
                <div className="space-y-3">
                  {insights.map((insight, idx) => (
                    <div key={idx} className="bg-slate-800/50 rounded-lg p-4 flex items-start gap-3">
                      <span className="text-2xl">{insight.icon}</span>
                      <p className="text-gray-200 flex-1">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Names */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            value={person1Name}
            onChange={(e) => setPerson1Name(e.target.value)}
            placeholder="First person's name"
            className="bg-slate-800/80 border border-slate-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 backdrop-blur"
          />
          <input
            type="text"
            value={person2Name}
            onChange={(e) => setPerson2Name(e.target.value)}
            placeholder="Second person's name"
            className="bg-slate-800/80 border border-slate-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeCategory === key
                  ? `bg-gradient-to-r ${getColorClasses(cat.color)} text-white shadow-lg`
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Available Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" />
            Select {categories[activeCategory].name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleData[activeCategory].items.map(item => (
              <div
                key={item.id}
                className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700 hover:border-pink-500 transition-all"
              >
                <h3 className="font-semibold text-white mb-2">{item.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded">{item.category}</span>
                  {item.rating && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      {item.rating}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addItem(item, 1)}
                    disabled={person1Items.some(i => i.id === item.id)}
                    className="flex-1 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-700 disabled:text-gray-500 text-white text-xs py-2 rounded-lg transition-colors"
                  >
                    {person1Name}
                  </button>
                  <button
                    onClick={() => addItem(item, 2)}
                    disabled={person2Items.some(i => i.id === item.id)}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-gray-500 text-white text-xs py-2 rounded-lg transition-colors"
                  >
                    {person2Name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Items */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/30 backdrop-blur rounded-2xl p-6 border border-pink-500/30">
            <h2 className="text-xl font-bold mb-4 text-pink-400 flex items-center gap-2">
              <Users className="w-5 h-5" />
              {person1Name}'s Picks ({person1Items.length})
            </h2>
            {person1Items.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No selections yet</p>
            ) : (
              <div className="space-y-2">
                {person1Items.map(item => (
                  <div
                    key={item.id}
                    className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, 1)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-800/30 backdrop-blur rounded-2xl p-6 border border-cyan-500/30">
            <h2 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
              <Users className="w-5 h-5" />
              {person2Name}'s Picks ({person2Items.length})
            </h2>
            {person2Items.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No selections yet</p>
            ) : (
              <div className="space-y-2">
                {person2Items.map(item => (
                  <div
                    key={item.id}
                    className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, 2)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Shared Categories */}
        {sharedCategories.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-pink-900/30 to-cyan-900/30 backdrop-blur rounded-2xl p-6 border border-pink-500/30">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
              Shared Passions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sharedCategories.map((cat, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-pink-400">{cat.person1Count}</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-cyan-400">{cat.person2Count}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-pink-600 to-cyan-600 h-3 rounded-full"
                      style={{ 
                        width: `${Math.min((cat.total / Math.max(person1Items.length, person2Items.length)) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepConnectionToolkit;
