import React from 'react';
import { GameState } from '../classes/Game'; // Importar o enum
import './GameStatusPopup.css';

interface GameStatusPopupProps {
  gameState: GameState;
  winner: boolean | null;
  onReset: () => void;
}

const GameStatusPopup: React.FC<GameStatusPopupProps> = ({ gameState, winner, onReset }) => {
  let message = '';
  let subMessage = '';

  switch (gameState) {
    case GameState.win:
      const winnerColor = winner ? 'Brancas' : 'Pretas';
      message = 'Xeque-mate!';
      subMessage = `${winnerColor} venceram!`;
      break;
    case GameState.tie:
      message = 'Empate!';
      subMessage = 'O jogo terminou em empate (Stalemate).';
      break;
    default:
      return null; // Não renderizar se o jogo estiver 'running' ou 'inicial'
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{message}</h2>
        <p>{subMessage}</p>
        <button onClick={onReset}>Jogar Novamente</button>
      </div>
    </div>
  );
};

export default GameStatusPopup;
