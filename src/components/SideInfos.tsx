export default () => {
    return (
        <div id="sideInfos">
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
        </div>
    )
}