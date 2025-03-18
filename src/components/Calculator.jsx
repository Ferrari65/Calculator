import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu'; 
import Dialog from '@mui/material/Dialog';  
import DialogActions from '@mui/material/DialogActions';  
import DialogContent from '@mui/material/DialogContent';  
import DialogTitle from '@mui/material/DialogTitle';  
import './Calculator.css';
import History from './History';
import CalculatorButtons from './CalculatorButtons';
import CalculatorDisplay from './CalculatorDisplay';

export default function Calculator() {
    const [num, setNum] = useState("0");
    const [oldnum, setOldnum] = useState(0);
    const [operator, setOperator] = useState('');
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);  

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        setHistory(storedHistory);
    }, []);

    useEffect(() => {
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;

            if (!isNaN(key)) {
                setNum((prevNum) => (prevNum === "0" ? key : prevNum + key));
            } else if (key === "+" || key === "-" || key === "*" || key === "/") {
                setOldnum(num);
                setOperator(key === "*" ? "X" : key);
                setNum("0");
            } else if (key === "Enter") {
                calculate();
            } else if (key === "Escape") {
                clear();
            } else if (key === "Backspace") {
                setNum((prevNum) => (prevNum.slice(0, -1) || "0"));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [num, operator, oldnum]);

    const addToHistory = (operation, result) => {
        const newHistory = [...history, { operation, result }];
        setHistory(newHistory);
    };

    function inputNum(value) {
        setNum(num === "0" ? value : num.toString() + value);
    }

    function clear() {
        setNum("0");
        setOldnum(0);
        setOperator('');
    }

    function porcentagem() {
        setNum((parseFloat(num) / 100).toString());
    }

    function changeSign() {
        setNum((parseFloat(num) * -1).toString());
    }

    function operatorHandler(e) {
        setOperator(e.target.value);
        setOldnum(num);
        setNum("0");
    }

    function calculate() {
        let result;
        const num1 = parseFloat(oldnum);
        const num2 = parseFloat(num);

        switch (operator) {
            case "/":
                result = num1 / num2;
                break;
            case "X":
                result = num1 * num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "+":
                result = num1 + num2;
                break;
            default:
                return;
        }

        setNum(result.toString());
        addToHistory(`${oldnum} ${operator} ${num}`, result);
    }

    return (
        <div>
            <Container maxWidth="xs" style={{ position: 'relative' }}>
                <div className='Wrapper'>
                    <Box m={12} />
                    <div className="history-icon" onClick={() => setShowHistory(true)}>  
                        <MenuIcon fontSize="large" />
                    </div>
                    <CalculatorDisplay num={num} />
                    <CalculatorButtons
                        num={num}
                        setNum={setNum}
                        oldnum={oldnum}
                        setOldnum={setOldnum}
                        operator={operator}
                        setOperator={setOperator}
                        calculate={calculate}
                        clear={() => setNum("0")}
                    />
                    <Dialog
                        className="config"
                        open={showHistory}
                        onClose={() => setShowHistory(false)}  
                        maxWidth="xs"
                    >
                        <DialogTitle className="modal-marg">Histórico</DialogTitle>
                        <DialogContent className="modal-config">
                            <History history={history} />
                        </DialogContent>
                        <DialogActions className="modal-but-close">
                            <button className='Button-close' onClick={() => setShowHistory(false)}>Fechar</button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        </div>
    );
}
