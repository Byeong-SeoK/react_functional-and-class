import React, { useState, useEffect } from "react"; //{useState}를 통해 React.useState를 useState로 호출할 수 있다.
import "./App.css";

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setFuncShow(false);
        }}
      ></input>
      <input
        type="button"
        value="remove comp"
        onClick={function () {
          setClassShow(false);
        }}
      ></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funcStyle = "color:blue";
var funcId = 0;
function FuncComp(props) {
  //react에서 함수의 첫번째 인자의 값은 props의 값이다.
  //그래서 첫번째 파라미터를 통해서 props를 받을 수 있다.

  var numberState = useState(props.initNumber); //이 useState는 배열을 return한다.
  //console.log("numberState", numberState);
  //이 numberState는 길이가 2인 배열이고 0번째에 state값이 들어가고
  //1번째에 state값을 바꾸는 함수가 들어가 있다.
  //즉, 0번째 요소에는 props로 넘기는 값이 들어가고 1번째 요소에는 setState함수가 들어간다고 보면 된다.
  //이때 useState함수의 첫번째 인자가 그 props 파라미터가 되어야 한다.

  var number = numberState[0];
  var setNumber = numberState[1];

  // var dateState = useState(new Date().toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  //위 코드를 아래의 코드로 쓸 수 있다.

  var [_date, setDate] = useState(new Date().toString());
  //_date, setDate 순으로 useState의 0번째, 1번째 값을 가지게 된다.

  useEffect(function () {
    console.log(
      "%cfunc => useEffect (componentDidMount) " + ++funcId,
      funcStyle
    );
    document.title = number;

    return function () {
      console.log(
        "%cfunc => useEffect componentWillUnMount return " + ++funcId,
        funcStyle
      );
    };
    //이 return함수는 이 useEffect가 속한 컴포넌트의 부모 컴포넌트가
    //해당 컴포넌트를 없앨 때 즉, UnMount를 할 때 호출된다.
  }, []);
  //위처럼 useEffect의 두번째 파라미터에 빈 배열을 넣으면 componentDidMount가 된다.
  //왜냐하면 첫 render 때만 실행되고 더 이상 실행되지 않기 때문이다.

  //side effect
  useEffect(
    function () {
      console.log(
        "%cfunc => useEffect (componentDidMount & componentDidUpdate) A " +
          ++funcId,
        funcStyle
      );
      document.title = number;

      return function () {
        console.log("%cfunc => useEffect A return " + ++funcId, funcStyle);
      };
    },
    [number] //이 배열의 number값이 바뀔 때만 useEffect의 콜백함수가 호출된다.
    //즉 이 코드에서 random을 누를 때는 콘솔창에 저 A log가 남지만
    //date를 누르면 콜백함수가 호출되지 않아 아래의 B log만 남는다.
  );

  useEffect(
    function () {
      console.log(
        "%cfunc => useEffect (componentDidMount & componentDidUpdate) B " +
          ++funcId,
        funcStyle
      );
      document.title = _date;

      return function () {
        console.log("%cfunc => useEffect B return " + ++funcId, funcStyle);
      };
    },
    [_date]
  );

  console.log("%cfunc => render " + ++funcId, funcStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {number}</p>
      <p>Date: {_date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

var classStyle = "color:red";
class ClassComp extends React.Component {
  state = {
    //이렇게 컴포넌트 내부적으로 props의 값을 state로 넘겨준다.
    //즉, this.props.initNumber의 값을 컴포넌트 내부적으로 state 객체의
    //number로 넘겨줘서 해당 컴포넌트가 number를 통해 원하는 값을 세팅할 수 있다.
    //그 이유는 사용하는 데이터가 props가 아닌 state이기 때문이다.
    number: this.props.initNumber,
    date: new Date().toString(),
  };

  componentWillMount() {
    console.log("%cclass => componentWillMount", classStyle);
  }

  componentDidMount() {
    console.log("%cclass => componentDidlMount", classStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("%cclass => shouldComponentUpdate", classStyle);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("%cclass => componentWillUpdate", classStyle);
  }

  componentDidUpdate(nextProps, nextState) {
    console.log("%cclass => componentDidlUpdate", classStyle);
  }

  componentWillUnmount() {
    console.log("%cclass => componentWillUnMount", classStyle);
  }

  render() {
    console.log("%cclass=> render", classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        {/* <p>Number : {this.props.initNumber}</p> */}
        <p>Number : {this.state.number}</p>
        <p>Date: {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
