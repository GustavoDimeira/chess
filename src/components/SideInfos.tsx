import { useState, useEffect } from 'react';
import game from '../iniciateGame';

type SideInfosProps = {
    isSideInfosOpen: boolean;
    toggleSideInfos: () => void;
    screenWidth: number;
    isPortrait: boolean;
    moveHistory: string[];
};

const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default ({ isSideInfosOpen, toggleSideInfos, screenWidth, isPortrait, moveHistory }: SideInfosProps) => {
    const isMobile = screenWidth < 1000;
    const [timers, setTimers] = useState(game.timer);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers([...game.timer]);
        }, 100); // Update every 100ms to keep the display smooth

        return () => clearInterval(interval);
    }, []);

    const whiteTime = formatTime(timers[0]);
    const blackTime = formatTime(timers[1]);

    // Player black is top, Player white is bottom by default
    let topTimer = blackTime;
    let bottomTimer = whiteTime;

    // If player is playing as black, flip the timers
    if (game.playerColor === false) {
        topTimer = whiteTime;
        bottomTimer = blackTime;
    }

    return (
        <div id="sideInfos" className={`${isMobile && isSideInfosOpen && !isPortrait ? 'open' : ''} ${isPortrait ? 'portrait-layout' : ''}`}>
            {isMobile && !isPortrait && ( // Show close button only on small screens in landscape
                <button className="close-side-infos" onClick={toggleSideInfos}>
                    X
                </button>
            )}
            {isPortrait ? (
                <div className="portrait-content">
                    <div className="portrait-timers-wrapper">
                        <div className={`timer ${game.turn === false ? 'active' : ''}`}>{topTimer}</div>
                        <div className={`timer ${game.turn === true ? 'active' : ''}`}>{bottomTimer}</div>
                    </div>
                    <div className="portrait-bottom-section">
                        <div className="moves-history portrait-moves-history">
                            <div className='w_moves'>
                                <p className='move-team'>White:</p>
                                {
                                    moveHistory.map((move, i) => i % 2 == 0 ? <p className='move-str' key={`move_str_${i}`}>{move}</p> : null)
                                }
                            </div>
                            <div className='b_moves'>
                                <p className='move-team'>Black:</p>
                                {
                                    moveHistory.map((move, i) => i % 2 != 0 ? <p className='move-str' key={`move_str_${i}`}>{move}</p> : null)
                                }
                            </div>
                        </div>
                        <div className="portrait-actions-wrapper">
                            <button className="action-button">Resign</button>
                            <button className="action-button">Offer Draw</button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="timers">
                        <div className={`timer ${game.turn === false ? 'active' : ''}`}>{topTimer}</div>
                        <div className={`timer ${game.turn === true ? 'active' : ''}`}>{bottomTimer}</div>
                    </div>
                    <div className="moves-history">
                            <div className='w_moves'>
                                <p className='move-team'>White:</p>
                                {
                                    moveHistory.map((move, i) => i % 2 == 0 ? <p className='move-str' key={`move_str_${i}`}>{move}</p> : null)
                                }
                            </div>
                            <div className='b_moves'>
                                <p className='move-team'>Black:</p>
                                {
                                    moveHistory.map((move, i) => i % 2 != 0 ? <p className='move-str' key={`move_str_${i}`}>{move}</p> : null)
                                }
                            </div>
                    </div>
                    <div className="actions">
                        <button className="action-button">Resign</button>
                        <button className="action-button">Offer Draw</button>
                    </div>
                </>
            )}
        </div>
    )
}