import React from 'react';
import './History.css';

const History = ({ history }) => {
    return (
        <div className="history-list">
            <ul>
                {history.length === 0 ? (
                    <p>Nenhum cálculo realizado ainda.</p>
                ) : (
                    history.map((item, index) => (
                        <p key={index}>
                            {item.operation} = {item.result}
                        </p>
                    ))
                )}
            </ul>
        </div>
    );
};

export default History;
