import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    var [funcShow, setFuncShow] = useState(true);
    var [classShow, setClassShow] = useState(true);

    return (
        <div className="container">
            <h1>Hello World</h1>
            <input type="button" value="remove func" onClick={function(){
                setFuncShow(false);
            }}></input>
            <input type="button" value="remove comp" onClick={function(){
                setClassShow(false);
            }}></input>
            {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
            {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
        </div>
    );
}



var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props){
    var numberState = useState(props.initNumber);
    var number = numberState[0];
    var setNumber = numberState[1];

    // var dateState = useState((new Date()).toString());
    // var _date = dateState[0];
    // var setDate = dateState[1];
    var [_date,setDate] = useState((new Date()).toString());

    //component 최초로 생성될 때 딱 한 번만 실행됨
    useEffect(function(){
        console.log('%cfunc => useEffect (componentDidMount)'+(++funcId),funcStyle);
        document.title = number;

        return function(){
            console.log('%cfunc => useEffect return (componentWillUnMount)'+(++funcId),funcStyle);
        }

    },[]);

    // side effect
    // 배열 안에 있는 인자들(배열 안에 있는 원소의 상태값)가 바뀌었을 때에만 첫번째 인자인 콜백함수가 호출되도록 약속
    useEffect(function(){
        console.log('%c unc => useEffect number (componentDidMount & componentDidUpdate)'+(++funcId),funcStyle);
        document.title = number;

        return function(){          //effect with cleanup
            console.log('%c unc => useEffect number return (componentDidMount & componentDidUpdate)'+(++funcId),funcStyle);
        }

    }, [number]);

    useEffect(function(){
        console.log('%c unc => useEffect _date (componentDidMount & componentDidUpdate)'+(++funcId),funcStyle);
        document.title = _date;

        return function(){          //effect with cleanup
            console.log('%c unc => useEffect _date return (componentDidMount & componentDidUpdate)'+(++funcId),funcStyle);
        }

    }, [_date]);

    console.log('%cfunc => render'+(++funcId),funcStyle);
    return(
        <div className='container'>
            <h2>function style component</h2>
            <p>Number : {number}</p>
            <p>Date : {_date}</p>
            
            <input type="button" value="random" onClick={
                function(){
                    setNumber(Math.random());
                }
            }></input>
            <input type="button" value="date" onClick={
                function(){
                    setDate((new Date()).toString());
                }
            }></input>
        </div>
    );
}




var classStyle = 'color:red';
class ClassComp extends React.Component{
    state = {
        number: this.props.initNumber,
        date:(new Date()).toString()
    }

    componentWillMount(){
        console.log('%cclass => componentWillMount',classStyle);
    }

    componentDidMount(){
        console.log('%cclass => componentDidMount',classStyle);
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('%cclass => shouldComponentUpdate',classStyle);
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        console.log('%cclass => componentWillUpdate',classStyle);
    }

    componentDidUpdate(nextProps, nextState){
        console.log('%cclass => componentDidUpdate',classStyle);
    }

    componentWillUnmount(){
        console.log('%cclass => componentWillUnmount',classStyle);
    }
    
    render(){
        console.log('%cclass => render',classStyle);
        return(
            <div className='container'>
                <h2>class style component</h2>
                <p>Number : {this.state.number}</p>
                <p>Date : {this.state.date}</p>
                
                <input type="button" value="random" onClick={
                    function(){
                        this.setState({number:Math.random()})
                    }.bind(this)
                }></input>

                <input type="button" value="date" onClick={
                    function(){
                        this.setState({date:(new Date()).toString()})
                    }.bind(this)
                }></input>
            </div>
        )
    }
}

export default App;
