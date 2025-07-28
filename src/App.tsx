import { useState, useEffect } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import SideInfos from './components/SideInfos';

const MIN_TILE_SIZE = 40; // Minimum tile size in pixels
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
  const isSmallScreen = screenWidth < 1000;

  // Calculate effective available viewport dimensions for the board
  const appPadding = 20; // From App.css padding
  const effectiveViewportWidth = screenWidth - (2 * appPadding);
  const effectiveViewportHeight = screenHeight - (2 * appPadding);

  let maxBoardWidth = effectiveViewportWidth;
  let maxBoardHeight = effectiveViewportHeight;

  if (!isSmallScreen) {
    // Desktop/Large screens: SideInfos is beside the board
    const sideInfosWidth = 250; // From App.css width
    const sideInfosMarginLeft = 40; // From App.css margin-left
    maxBoardWidth = effectiveViewportWidth - (sideInfosWidth + sideInfosMarginLeft);
  } else if (isPortrait) {
    // Small screen, portrait: SideInfos is below the board
    // Estimate SideInfos height (rough sum of its elements + padding/margins)
    // This is a rough estimate, actual height might vary
    const estimatedSideInfosHeight = 380; 
    maxBoardHeight = effectiveViewportHeight - estimatedSideInfosHeight;
  }

  // Calculate dynamic tile size based on the smaller of available width or height
  let calculatedTileSize = Math.min(maxBoardWidth / 8, maxBoardHeight / 8);

  // Ensure tile size respects min and max limits
  calculatedTileSize = Math.min(MAX_TILE_SIZE, Math.max(MIN_TILE_SIZE, calculatedTileSize));

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