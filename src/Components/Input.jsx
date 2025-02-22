import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SendHorizontal, Hash, Briefcase, FileText, Brain, ListTodo, StickyNote } from 'lucide-react';

function Input(props)
{
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [topics, setTopics] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  const onSubmit = (data) => {
    props.getData(data,topics,jobTypes);
  };

  const handleTopicsChange = (e) => {
    const value = e.target.value;
    if (value.endsWith(' ') || value.endsWith(',')) {
      const topicsArray = value.trim().split(/[\s,]+/);
      setTopics([...topics, ...topicsArray]);
      e.target.value = '';
    }
  };

  const handleJobTypesChange = (e) => {
    const value = e.target.value;
    if (value.endsWith(' ') || value.endsWith(',')) {
      const jobTypesArray = value.trim().split(/[\s,]+/);
      setJobTypes([...jobTypes, ...jobTypesArray]);
      e.target.value = '';
    }
  };

  const removeTopic = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const removeJobType = (index) => {
    setJobTypes(jobTypes.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto backdrop-blur-xl rounded-xl shadow-2xl relative overflow-hidden border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30" />
      
      <div className="relative p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Job Information
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            Fill in the details to generate job-specific questions
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-medium">
              <Hash className="w-4 h-4 text-blue-400" />
              Number of Questions
            </label>
            <input
              type="number"
              {...register("numberOfQuestions", { min: 1 })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white text-sm sm:text-base placeholder-gray-400"
              placeholder="Enter number of questions..."
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-medium">
              <Briefcase className="w-4 h-4 text-purple-400" />
              Job Role
            </label>
            <input
              {...register("jobRoles")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white text-sm sm:text-base placeholder-gray-400"
              placeholder="Enter job role..."
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-medium">
              <FileText className="w-4 h-4 text-pink-400" />
              Job Description
            </label>
            <textarea
              {...register("jobDescription")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all text-white min-h-24 sm:min-h-32 resize-y text-sm sm:text-base placeholder-gray-400"
              placeholder="Describe the job requirements..."
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-medium">
              <Brain className="w-4 h-4 text-cyan-400" />
              Topics
            </label>
            <input
              {...register("topics")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-white text-sm sm:text-base placeholder-gray-400"
              onChange={handleTopicsChange}
              placeholder="Type topics and press space or comma to add..."
            />
            <div className="flex flex-wrap gap-2 mt-2">
              <AnimatePresence>
                {topics.map((topic, index) => (
                  <motion.div
                    key={`${topic}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-3 py-1.5 text-sm flex items-center gap-2 text-white shadow-lg shadow-cyan-500/20"
                  >
                    {topic}
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="hover:bg-white/10 rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-medium">
              <Brain className="w-4 h-4 text-indigo-400" />
              Difficulty Level
            </label>
            <select
              {...register("difficulty")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white text-sm sm:text-base"
            >
              <option value="easy" className="bg-gray-800">Easy</option>
              <option value="medium" className="bg-gray-800">Medium</option>
              <option value="hard" className="bg-gray-800">Hard</option>
            </select>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-medium">
              <ListTodo className="w-4 h-4 text-emerald-400" />
              Question Types
            </label>
            <input
              {...register("typeOfJob")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white text-sm sm:text-base placeholder-gray-400"
              onChange={handleJobTypesChange}
              placeholder="Type question types and press space or comma to add..."
            />
            <div className="flex flex-wrap gap-2 mt-2">
              <AnimatePresence>
                {jobTypes.map((type, index) => (
                  <motion.div
                    key={`${type}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full px-3 py-1.5 text-sm flex items-center gap-2 text-white shadow-lg shadow-emerald-500/20"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => removeJobType(index)}
                      className="hover:bg-white/10 rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-medium">
              <StickyNote className="w-4 h-4 text-violet-400" />
              Additional Notes
            </label>
            <textarea
              {...register("additionalNotes")}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-white min-h-20 sm:min-h-24 resize-y text-sm sm:text-base placeholder-gray-400"
              placeholder="Any additional requirements or notes..."
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base font-semibold shadow-lg shadow-purple-500/30"
          >
            Generate Questions
            <SendHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Input;