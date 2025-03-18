import React from 'react';


const CalculatorButtons = ({ num, setNum, oldnum, setOldnum, operator, setOperator, calculate, clear }) => {
    const inputNum = (value) => {
        setNum(num === "0" ? value : num + value);
    };

    const operatorHandler = (e) => {
        setOperator(e.target.value);
        setOldnum(num);
        setNum("0");
    };

    return (
        <div>
            <button className='calc-btn-w' onClick={clear}>AC</button>
            <button className='calc-btn-w' onClick={() => setNum((parseFloat(num) * -1).toString())}>+/-</button>
            <button className='calc-btn-w' onClick={() => setNum((parseFloat(num) / 100).toString())}>%</button>
            <button className='btn-operator' onClick={operatorHandler} value="/">/</button>

            <button className='calc-btn-gray' onClick={() => inputNum("7")}>7</button>
            <button className='calc-btn-gray' onClick={() => inputNum("8")}>8</button>
            <button className='calc-btn-gray' onClick={() => inputNum("9")}>9</button>
            <button className='btn-operator' onClick={operatorHandler} value="X">X</button>

            <button className='calc-btn-gray' onClick={() => inputNum("4")}>4</button>
            <button className='calc-btn-gray' onClick={() => inputNum("5")}>5</button>
            <button className='calc-btn-gray' onClick={() => inputNum("6")}>6</button>
            <button className='btn-operator' onClick={operatorHandler} value="-">-</button>

            <button className='calc-btn-gray' onClick={() => inputNum("1")}>1</button>
            <button className='calc-btn-gray' onClick={() => inputNum("2")}>2</button>
            <button className='calc-btn-gray' onClick={() => inputNum("3")}>3</button>
            <button className='btn-operator' onClick={operatorHandler} value="+">+</button>

            <button className='calc-btn-gray' onClick={() => inputNum("0")}>0</button>
            <button className='calc-btn-gray' onClick={() => inputNum(".")}>.</button>
            <button className='calc-btn-gray' style={{ visibility: "hidden" }}>.</button>
            <button className='btn-operator' onClick={calculate}>=</button>
        </div>
    );
};

export default CalculatorButtons;
