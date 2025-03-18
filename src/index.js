import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App'; 
import './index.css'; 
const DATA = [
  { id: "todo-0", name: "吃饭", completed: true },
  { id: "todo-1", name: "睡觉", completed: false },
  { id: "todo-2", name: "学习", completed: false },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
