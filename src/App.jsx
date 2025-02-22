import { useState } from 'react';
import Groq from "groq-sdk";
import './App.css';

import Input from './Components/Input';
import Output from "./Components/Output"

function App() {

  const [llmOutput,setLlmOutput] = useState('');

  function formPrompt(val, topics, jobTypes) {
    const { numberOfQuestions, jobRoles, jobDescription, difficulty, additionalNotes } = val;
    const topics_str = Array.isArray(topics) ? topics.join(", ") : "";
    const jobTypes_str = Array.isArray(jobTypes) ? jobTypes.join(", ") : "";
    const prompt = `Generate ${numberOfQuestions} ${jobTypes_str} interview questions for the job role '${jobRoles}' with the job description '${jobDescription}' on the topics '${topics_str}' with a difficulty level of ${difficulty}. ${additionalNotes} and Number each question.`;
    return prompt;
  }
  
  async function getData(val,topics,jobTypes)
  {
    const question = formPrompt(val,topics,jobTypes);
    console.log(question);
    const response = await getResponse(question);
    console.log(response);
    setLlmOutput(response);
  }

  async function getResponse(question)
  {
      const groq = new Groq({ apiKey: import.meta.env.VITE_API_KEY, dangerouslyAllowBrowser: true });
      const completion = await groq.chat.completions.create({
      messages: [
          {
          role: "user",
          content: question,
          },
      ],
      model: "llama-3.3-70b-versatile",
      });

      const res = completion.choices[0].message.content;
      const response_lines = res.split('\n');

      const filtered_lines = response_lines.filter(line => {
        const trimmedLine = line.trim();
        return trimmedLine && !isNaN(trimmedLine.split('.')[0]);
      });

      return filtered_lines;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Interview Question Generator
        </h1>
        <Input getData={getData}/>
      </div>
      <Output llmOutput={llmOutput}/>
    </div>
  );
}

export default App;