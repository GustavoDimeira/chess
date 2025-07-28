import { useState, useEffect } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import SideInfos from './components/SideInfos';

const MIN_TILE_SIZE = 10; // Minimum tile size in pixels
const MAX_TILE_SIZE = 80; // Maximum tile size in pixels

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isSideInfosOpen, setIsSideInfosOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSideInfos = () => {
    setIsSideInfosOpen(!isSideInfosOpen);
  };

  const isPortrait = screenHeight > screenWidth;
  const isSmallScreen = screenWidth < 1000; // Your existing breakpoint

  let availableWidth = screenWidth;
  let availableHeight = screenHeight;

  // Adjust available space based on layout
  if (!isSmallScreen) {
    // Desktop/Large screens: SideInfos is beside the board
    availableWidth -= (250 + 80 + 40); // SideInfos width + margin-left + App padding
  } else if (isPortrait) {
    // Small screen, portrait: SideInfos is below the board
    availableHeight -= (250 + 80 + 40); // Estimated SideInfos height + App padding
  }

  // Calculate dynamic tile size based on the smaller of available width or height
  const calculatedTileSize = Math.min(
    MAX_TILE_SIZE,
    Math.max(MIN_TILE_SIZE,
      Math.min(availableWidth / 9, availableHeight / 9) // Divide by 8 for 8 tiles
    )
  );

  return (
    <div className="App">
      <BoardComponent tileSize={calculatedTileSize} />
      <SideInfos
        isSideInfosOpen={isSideInfosOpen}
        toggleSideInfos={toggleSideInfos}
        screenWidth={screenWidth}
        isPortrait={isPortrait}
      />
      {isSmallScreen && !isPortrait && ( // Show toggle button only on small screens in landscape
        <button className="toggle-side-infos" onClick={toggleSideInfos}>
          {isSideInfosOpen ? 'Close Info' : 'Open Info'}
        </button>
      )}
    </div>
  );
}

export default App;