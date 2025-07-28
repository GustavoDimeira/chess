import React from 'react';
import { GameState, GameEndReason } from '../classes/Game'; // Importar o enum
import './GameStatusPopup.css';

interface GameStatusPopupProps {
  gameState: GameState;
  winner: boolean | null;
  endReason: GameEndReason | null;
  onReset: () => void;
}

const GameStatusPopup: React.FC<GameStatusPopupProps> = ({ gameState, winner, endReason, onReset }) => {
  let message = '';
  let subMessage = '';
  const winnerColor = winner ? 'Brancas' : 'Pretas';

  switch (endReason) {
    case 'checkmate':
      message = 'Xeque-mate!';
      subMessage = `${winnerColor} venceram!`;
      break;
    case 'timeout':
      message = 'Tempo Esgotado!';
      subMessage = `${winnerColor} venceram por tempo.`;
      break;
    case 'stalemate':
      message = 'Empate!';
      subMessage = 'O jogo terminou em empate por afogamento (Stalemate).';
      break;
    case 'insufficient_material':
      message = 'Empate!';
      subMessage = 'Empate por material insuficiente.';
      break;
    default:
      return null; // Não renderizar se não houver um motivo de fim de jogo
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
