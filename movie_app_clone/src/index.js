import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';        // App 컴포넌트 임포트하여 사용

// App.js에서 작성한 코드(컴포넌트)를 index.html의 아이디가 root인 엘리먼트에 넣어줌
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
