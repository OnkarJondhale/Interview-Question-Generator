import { useState } from 'react';
import './App.css';

import Input from './Components/Input';
import Output from "./Components/Output"

function App() {

  const [data,setData] = useState('');

  function getData(response)
  {
    setData(response);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Interview Question Generator
        </h1>
        <Input getData={getData}/>
      </div>
      <Output data={data}/>
    </div>
  );
}

export default App;