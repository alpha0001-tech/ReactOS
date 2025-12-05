import React, { useState } from 'react';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [newNum, setNewNum] = useState(true);

  const handleNum = (num: string) => {
    if (newNum) {
      setDisplay(num);
      setNewNum(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (operator: string) => {
    const current = parseFloat(display);
    
    if (prev !== null && op) {
        let res = prev;
        if (op === '+') res += current;
        if (op === '-') res -= current;
        if (op === '×') res *= current;
        if (op === '÷') res /= current;
        setPrev(res);
        setDisplay(String(res));
    } else {
        setPrev(current);
    }
    
    setOp(operator);
    setNewNum(true);
  };

  const handleEqual = () => {
    if (prev === null || !op) return;
    const current = parseFloat(display);
    let res = prev;
    if (op === '+') res += current;
    if (op === '-') res -= current;
    if (op === '×') res *= current;
    if (op === '÷') res /= current;
    
    setDisplay(String(res));
    setPrev(null);
    setOp(null);
    setNewNum(true);
  };

  const handleClear = () => {
      setDisplay('0');
      setPrev(null);
      setOp(null);
      setNewNum(true);
  };

  const btnClass = "h-12 w-12 rounded-full flex items-center justify-center text-lg font-medium transition-colors active:scale-95";
  const grayBtn = "bg-gray-300 text-black hover:bg-gray-200";
  const orangeBtn = "bg-orange-400 text-white hover:bg-orange-300";
  const darkBtn = "bg-gray-700 text-white hover:bg-gray-600";

  return (
    <div className="h-full bg-gray-900 text-white p-4 flex flex-col">
        <div className="flex-1 flex items-end justify-end text-5xl font-light mb-4 px-2 break-all">
            {display}
        </div>
        <div className="grid grid-cols-4 gap-3">
            <button onClick={handleClear} className={grayBtn}>AC</button>
            <button className={grayBtn}>+/-</button>
            <button className={grayBtn}>%</button>
            <button onClick={() => handleOp('÷')} className={orangeBtn}>÷</button>

            <button onClick={() => handleNum('7')} className={darkBtn}>7</button>
            <button onClick={() => handleNum('8')} className={darkBtn}>8</button>
            <button onClick={() => handleNum('9')} className={darkBtn}>9</button>
            <button onClick={() => handleOp('×')} className={orangeBtn}>×</button>

            <button onClick={() => handleNum('4')} className={darkBtn}>4</button>
            <button onClick={() => handleNum('5')} className={darkBtn}>5</button>
            <button onClick={() => handleNum('6')} className={darkBtn}>6</button>
            <button onClick={() => handleOp('-')} className={orangeBtn}>-</button>

            <button onClick={() => handleNum('1')} className={darkBtn}>1</button>
            <button onClick={() => handleNum('2')} className={darkBtn}>2</button>
            <button onClick={() => handleNum('3')} className={darkBtn}>3</button>
            <button onClick={() => handleOp('+')} className={orangeBtn}>+</button>

            <button onClick={() => handleNum('0')} className={`${darkBtn} col-span-2 w-auto !justify-start pl-5`}>0</button>
            <button onClick={() => handleNum('.')} className={darkBtn}>.</button>
            <button onClick={handleEqual} className={orangeBtn}>=</button>
        </div>
    </div>
  );
};

export default CalculatorApp;