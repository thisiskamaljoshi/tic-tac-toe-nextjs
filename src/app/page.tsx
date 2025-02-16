"use client";
import { useState } from "react";

export default function Home() {

  type UserSymbol = "X" | "O" | null;

  type Cell = {
    id: number;
    row: number;
    col: number;
    isClicked: boolean;
    userSymbol: UserSymbol;
  };

  const [board, setBoard] = useState<Cell[]>([
    { id: 1, row: 1, col: 1, isClicked: false, userSymbol: null },
    { id: 2, row: 1, col: 2, isClicked: false, userSymbol: null },
    { id: 3, row: 1, col: 3, isClicked: false, userSymbol: null },
    { id: 4, row: 2, col: 1, isClicked: false, userSymbol: null },
    { id: 5, row: 2, col: 2, isClicked: false, userSymbol: null },
    { id: 6, row: 2, col: 3, isClicked: false, userSymbol: null },
    { id: 7, row: 3, col: 1, isClicked: false, userSymbol: null },
    { id: 8, row: 3, col: 2, isClicked: false, userSymbol: null },
    { id: 9, row: 3, col: 3, isClicked: false, userSymbol: null },
  ]);

  const [gameEntries,setGameEntries] = useState<string[]>([]);

  function tickTacCellClickHandler(cell:Cell){    

    const newBoard = [...board];

    if(!cell.isClicked){
      if(gameEntries.length %2 === 0){
        newBoard[cell.id-1].userSymbol = "X";
      }else{
        newBoard[cell.id-1].userSymbol = "O";
      }
      newBoard[cell.id-1].isClicked = true;
      setGameEntries((old)=>[...old,`${cell.row}${cell.col}`]);
      setBoard(newBoard);
    }else{
      console.log("Already clicked");
    }
  }

  console.log(gameEntries,"gameEntries");
  console.log(board,"board");

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center gap-4 p-4 h-full">
        <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell) => {
            return (
              <button
                key={cell.id}
                className="size-24 md:size-28 lg:size-32  flex items-center justify-center border border-gray-500 text-2xl font-bold hover:bg-gray-200"
                onClick={()=>tickTacCellClickHandler(cell)}
              >{cell.userSymbol}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
