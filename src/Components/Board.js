import React, {Component} from "react";

//import {Square} from './Square'

function Square(props){
  return(
    <button className={
      `square ${props.isHighlight===true ?'isHighlight': ''}`}  onClick= {props.onClick}>
      {props.value}
    </button>   
  );
 
}
function FindIndex(isHighlight,value){
  if (typeof isHighlight !== 'undefined' && isHighlight!== null && isHighlight.length > 0){
    for(var i= 0; i<= isHighlight.length; i++){
      if(isHighlight[i]=== value){
        //console.log("TRUE");
        return true;
      }  
    } 
  }else{
    //console.log("FALSE");
    return false;
  }
}


export class Board extends Component{
  renderSquare(i,isHighlight) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlight = {FindIndex(this.props.isHighlight,i)}
      />
    );
  }
  render(){
    return(
      <div>
        <div className = "board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className = "board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className = "board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



