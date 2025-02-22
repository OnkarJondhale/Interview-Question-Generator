import React from "react";

function Output({ llmOutput }) {

  console.log(llmOutput,typeof(llmOutput));

  return (
    <div className="w-full max-w-4xl mx-auto backdrop-blur-xl rounded-xl shadow-2xl relative overflow-hidden border border-white/10 mt-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30" />
      
      <div className="relative p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Generated Questions
          </h2>
        </div>
        <ul className="space-y-2 text-sm sm:text-base text-white">
          {llmOutput.map((line, index) => (
            <li key={index} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Output;
