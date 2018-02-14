import React, { Component } from 'react';
import './Game.css';
import {Board} from './Components/Board';

function Square(props){
  //console.log(props);
  return(    
    <button className="square" onClick= {props.onClick}>
      {props.value}
    </button>
    
  );
}

class Game  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log('slice:' + squares);

    if(calculateWinner(squares) || squares[i]){
      console.log('value of squares[i]:' + squares[i]);
      return;
    }
    squares[i] = this.state.xIsNext ? 'X': 'O';
    this.setState({
      history : history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
    var stepmove = step;
    
    console.log('stepNumber is:'+ step);
    return stepmove;
  }

  render() {
    const history= this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    console.log(winner);
    

    const moves = history.map((step,move) => {
      const desc = move ? 'Go to move #'+ move : 'Go to game start';
      return(
        <li key={move}>
          <button onClick ={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner of the game is: ' + winner[0];
      var winLine= winner[1];
      //console.log('winline is:'+ winLine);
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className= "game">
        <div className= "board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            isHighlight= {winLine}
          />
        </div>
        <div className= "game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
  const lines= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i=0; i<lines.length; i++){
    const [a,b,c]= lines[i];
    var rt = [];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      rt = [squares[a], lines[i]];
      return rt;
    }
  }
  return null;
}

export default Game;
