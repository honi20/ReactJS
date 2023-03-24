// 개발자 소개 화면
import React from "react";
import './About.css';

function About(props) {
    // Route 컴포넌트가 그려줄 컴포넌트에는 항상 이 props가 전달됨. 이 props에 우리 마음대로 데이터 담아 보내줄 수 있음
    // console.log(props);     
    return (
        <div className="about__container">
            <span>
                "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows."
            </span>
            <span>- George Orwell, 1984 -</span>
        </div>
    );
}

export default About;