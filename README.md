# Chess Game

A responsive web-based chess game built with React and TypeScript, implementing core chess rules and providing an interactive user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)

## Features

-   **Core Chess Logic:** Implements standard chess piece movements, captures, and turn-based gameplay.
-   **Special Moves:**
    -   **Castling:** Supports both kingside and queenside castling.
    -   **En Passant:** Correctly handles the en passant pawn capture rule.
-   **Check Validation:** Detects and manages 'check' situations, restricting moves that would leave the king in check.
-   **Interactive Board:**
    -   Dynamic board rendering with light and dark squares.
    -   Visual highlighting of possible moves for selected pieces.
    -   Visual indication for capture moves.
    -   Drag-and-drop functionality for pieces.
-   **Responsive Design:** Adapts the layout and board size for various screen dimensions, including mobile and portrait orientations.
-   **Game State Management:** Manages the game state, including piece positions, turn, and available moves.

## Technologies Used

-   **React:** Frontend library for building the user interface.
-   **TypeScript:** Adds static typing to JavaScript, improving code quality and maintainability.
-   **CSS:** For styling the application and ensuring a visually appealing design.

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/chess.git
    cd chess
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

To run the game in development mode:

```bash
npm start
```

This will open the application in your browser at `http://localhost:3000`.

To build the project for production:

```bash
npm run build
```

This command builds the app for production to the `build` folder.

## Project Structure

The project follows a standard React application structure, with a focus on clear separation of concerns for game logic and UI components.

```
chess/
├── public/                 # Public assets (index.html, favicon, etc.)
├── src/
│   ├── App.tsx             # Main application component and responsiveness logic
│   ├── App.css             # Global styles for the application
│   ├── index.tsx           # Entry point of the React application
│   ├── initiateGame.tsx    # Initializes the game board and pieces
│   ├── classes/            # Core game logic and chess piece definitions
│   │   ├── Board.tsx       # Represents the chess board
│   │   ├── Game.tsx        # Manages game state, turns, and move validation
│   │   ├── Piece.tsx       # Abstract base class for all chess pieces
│   │   ├── Pos.tsx         # Utility class for board positions (x, y)
│   │   ├── Tile.tsx        # Represents a single square on the board
│   │   └── pieces/         # Individual chess piece implementations
│   │       ├── Bishop.tsx
│   │       ├── King.tsx
│   │       ├── Knight.tsx
│   │       ├── Pawn.tsx
│   │       ├── Queen.tsx
│   │       └── Rook.tsx
│   └── components/         # Reusable React components for the UI
│       ├── BoardComponent.tsx # Renders the chess board and handles piece interactions
│       ├── PieceComponent.tsx # Renders individual chess pieces
│       └── SideInfos.tsx    # Displays game information (timers, move history, actions)
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Future Enhancements

-   **Game Over Conditions:** Implement checkmate, stalemate, and draw conditions. ✅
-   **Move History:** Display a detailed history of moves. ✅
-   **Timers:** Fully functional game timers for each player. ✅
-   **Promotion:** Implement pawn promotion to other pieces.
-   **Undo/Redo Moves:** Add functionality to revert or reapply moves.
-   **AI Opponent:** Develop a basic AI to play against.
-   **Improved UI/UX:** Enhance visual feedback and animations.
