"use client";
import { useState } from "react";

export default function Home() {

  type WinningCombinations = {
    [key: string]: [number, number, number];
  }

  type UserSymbol = "X" | "O" | null;

  type Cell = {
    id: number;
    row: number;
    col: number;
    isClicked: boolean;
    userSymbol: UserSymbol;
    win: boolean;
  };

  type UserMoveRecord ={
    rows:number[],
    columns:number[],
    diagonals:number[],
  };

  type GameStatus = 'waiting' | 'playerXTurn' | 'playerOTurn' | 'draw' | 'playerXWon' | 'playerOWon';

  const winningCombinations:WinningCombinations = {
    row1: [1, 2, 3],
    row2: [4, 5, 6],
    row3: [7, 8, 9],
    col1: [1, 4, 7],
    col2: [2, 5, 8],
    col3: [3, 6, 9],
    diag1: [1, 5, 9],
    diag2: [3, 5, 7],
  };

  const [board, setBoard] = useState<Cell[]>([
    { id: 1, row: 1, col: 1, isClicked: false, userSymbol: null , win:false },
    { id: 2, row: 1, col: 2, isClicked: false, userSymbol: null , win:false },
    { id: 3, row: 1, col: 3, isClicked: false, userSymbol: null , win:false },
    { id: 4, row: 2, col: 1, isClicked: false, userSymbol: null , win:false },
    { id: 5, row: 2, col: 2, isClicked: false, userSymbol: null , win:false },
    { id: 6, row: 2, col: 3, isClicked: false, userSymbol: null , win:false },
    { id: 7, row: 3, col: 1, isClicked: false, userSymbol: null , win:false },
    { id: 8, row: 3, col: 2, isClicked: false, userSymbol: null , win:false },
    { id: 9, row: 3, col: 3, isClicked: false, userSymbol: null , win:false },
  ]);

  const [gameEntries,setGameEntries] = useState<string[]>([]);

  const [userX,setUserX]=useState<UserMoveRecord>({
    rows:[0,0,0],
    columns:[0,0,0],
    diagonals:[0,0]
  });

  const [userO,setUserO]=useState<UserMoveRecord>({
    rows:[0,0,0],
    columns:[0,0,0],
    diagonals:[0,0]
  });

  const [status, setStatus] = useState<GameStatus>('waiting');

  const statusMessages: { [key: string]: string } = {
    waiting: "Game is waiting to start...",
    playerXTurn: "Player X's Turn",
    playerOTurn: "Player O's Turn",
    draw: "It's a Draw!",
    playerXWon: "Player X Wins!",
    playerOWon: "Player O Wins!"
  };

  function tickTacCellClickHandler(cell:Cell){   

    const newBoard = board.map(cell => ({ ...cell }));

    const userXRowCol:UserMoveRecord = Object.assign(userX);
    const userORowCol:UserMoveRecord = Object.assign(userO);

    if(!cell.isClicked){
      if(gameEntries.length %2 === 0){
        newBoard[cell.id-1].userSymbol = "X";
        userXRowCol.rows[cell.row-1]++;
        userXRowCol.columns[cell.col-1]++;
        if(cell.row === cell.col){
          userXRowCol.diagonals[0]++;
        }if(cell.row + cell.col === 4){
          userXRowCol.diagonals[1]++;
        }
        setStatus("playerOTurn");
      }else{
        newBoard[cell.id-1].userSymbol = "O";
        userORowCol.rows[cell.row-1]++;
        userORowCol.columns[cell.col-1]++;
        if(cell.row === cell.col){
          userORowCol.diagonals[0]++;
        }if(cell.row + cell.col === 4){
          userORowCol.diagonals[1]++;
        }
        setStatus("playerXTurn");
      }
      newBoard[cell.id-1].isClicked = true;
      setGameEntries((old)=>[...old,`${cell.row}${cell.col}`]);
      setUserX(userXRowCol);
      setUserO(userORowCol);

    }else{
      console.log("Already clicked");
    }

    checkWinner(userXRowCol,userORowCol,newBoard);
  }

  function checkWinner(userXRowCol: UserMoveRecord, userORowCol: UserMoveRecord,newBoard:Cell[]) {
    const checkWin = (rows: number[], cols: number[], diagonals: number[]): [boolean , number[]] => {
      let wonCells:number[] = [];
      if(rows.some((row) => row === 3)){
        const row = rows.findIndex((row) => row === 3);
        wonCells = winningCombinations[`row${row+1}`];
      }else if(cols.some((col) => col === 3)){
        const col = cols.findIndex((col) => col === 3);
        wonCells = winningCombinations[`col${col+1}`];
      }else if(diagonals.some((diag) => diag === 3)){
        const diag = diagonals.findIndex((diag) => diag === 3);
        wonCells = winningCombinations[`diag${diag+1}`];
      }
      return [(rows.some((row) => row === 3) || 
             cols.some((col) => col === 3) || 
             diagonals.some((diag) => diag === 3)),wonCells];
    };
  
    const { rows: userXRows, columns: userXCols, diagonals: userXDiag } = userXRowCol;
    const { rows: userORows, columns: userOCols, diagonals: userODiag } = userORowCol;

    const [isXWon, xWonCells] = checkWin(userXRows, userXCols, userXDiag);
    const [isOWon, oWonCells] = checkWin(userORows, userOCols, userODiag);
  
    if (isXWon) {
      setStatus("playerXWon");
      newBoard[xWonCells[0]-1].win = true;
      newBoard[xWonCells[1]-1].win = true;
      newBoard[xWonCells[2]-1].win = true;
    }
  
    if (isOWon) {
      setStatus("playerOWon");
      newBoard[oWonCells[0]-1].win = true;
      newBoard[oWonCells[1]-1].win = true;
      newBoard[oWonCells[2]-1].win = true;
    }

    if(gameEntries.length===9){
      setStatus("draw");
    }

    setBoard(newBoard);
  }

  const resetGame = () => {
    setBoard([
      { id: 1, row: 1, col: 1, isClicked: false, userSymbol: null , win:false },
      { id: 2, row: 1, col: 2, isClicked: false, userSymbol: null , win:false },
      { id: 3, row: 1, col: 3, isClicked: false, userSymbol: null , win:false },
      { id: 4, row: 2, col: 1, isClicked: false, userSymbol: null , win:false },
      { id: 5, row: 2, col: 2, isClicked: false, userSymbol: null , win:false },
      { id: 6, row: 2, col: 3, isClicked: false, userSymbol: null , win:false },
      { id: 7, row: 3, col: 1, isClicked: false, userSymbol: null , win:false },
      { id: 8, row: 3, col: 2, isClicked: false, userSymbol: null , win:false },
      { id: 9, row: 3, col: 3, isClicked: false, userSymbol: null , win:false },
    ]);
  
    setGameEntries([]);
  
    setUserX({
      rows: [0, 0, 0],
      columns: [0, 0, 0],
      diagonals: [0, 0],
    });
  
    setUserO({
      rows: [0, 0, 0],
      columns: [0, 0, 0],
      diagonals: [0, 0],
    });

    setStatus("waiting");
  };
  

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center gap-4 p-4 h-full">
        <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
        <div className="text-xl font-semibold">
          {status === 'waiting' && <p className="text-gray-500">{statusMessages.waiting}</p>}
          {status === 'playerXTurn' && <p className="text-blue-500">{statusMessages.playerXTurn}</p>}
          {status === 'playerOTurn' && <p className="text-red-500">{statusMessages.playerOTurn}</p>}
          {status === 'draw' && <p className="text-gray-700">{statusMessages.draw}</p>}
          {status === 'playerXWon' && <p className="text-green-500 font-bold">{statusMessages.playerXWon}</p>}
          {status === 'playerOWon' && <p className="text-green-500 font-bold">{statusMessages.playerOWon}</p>}
        </div>
        <button 
          onClick={resetGame}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          type="reset">
          Reset
        </button>
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell) => {
            return (
              <button
                key={cell.id}
                className={`size-24 md:size-28 lg:size-32 flex items-center justify-center border border-gray-500 text-2xl font-bold hover:bg-gray-200 ${cell.win ? 'text-green-500' : 'text-black'}`}
                onClick={() => tickTacCellClickHandler(cell)}
              >
                {cell.userSymbol}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
