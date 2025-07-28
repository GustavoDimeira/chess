import { Dispatch, SetStateAction } from "react";

type SideInfosProps = {
    isSideInfosOpen: boolean;
    toggleSideInfos: () => void;
    screenWidth: number;
    isPortrait: boolean;
};

export default ({ isSideInfosOpen, toggleSideInfos, screenWidth, isPortrait }: SideInfosProps) => {
    const isMobile = screenWidth < 1000; // Define your breakpoint for mobile

    return (
        <div id="sideInfos" className={`${isMobile && isSideInfosOpen && !isPortrait ? 'open' : ''} ${isPortrait ? 'portrait-layout' : ''}`}>
            {isMobile && !isPortrait && ( // Show close button only on small screens in landscape
                <button className="close-side-infos" onClick={toggleSideInfos}>
                    X
                </button>
            )}
            {isPortrait ? (
                <div className="portrait-content">
                    <div className="portrait-timers">
                        <div className="timer">10:00</div>
                        <div className="timer">10:00</div>
                    </div>
                    <div className="moves-history portrait-moves-history">
                        {/* Moves will be added here */}
                    </div>
                    <div className="portrait-actions">
                        <button>Resign</button>
                        <button>Offer Draw</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="timers">
                        <div className="timer">10:00</div>
                        <div className="timer">10:00</div>
                    </div>
                    <div className="moves-history">
                        {/* Moves will be added here */}
                    </div>
                    <div className="actions">
                        <button>Resign</button>
                        <button>Offer Draw</button>
                    </div>
                </>
            )}
        </div>
    )
}