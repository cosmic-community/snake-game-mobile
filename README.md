# Snake Game Mobile

![Snake Game Preview](https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=300&fit=crop&auto=format)

A classic Snake game built with Next.js 15 and optimized for mobile devices. Features touch controls, responsive design, and smooth gameplay.

## Features

- 🐍 Classic snake gameplay mechanics
- 📱 Mobile-optimized touch controls
- 🎮 Responsive game board that adapts to screen size
- 🏆 Score tracking with local high score storage
- ⏸️ Pause/resume functionality
- 🔄 Game over screen with restart option
- 🎨 Retro-style graphics with smooth animations
- 📴 Works offline - no internet required

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68814d18daa031c60ed11283&clone_repository=68814dc3daa031c60ed11285)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built as standalone game without CMS integration

### Code Generation Prompt

> Build a mobile friendly snake game

The app has been tailored to work as a standalone mobile game with optimized touch controls and responsive design.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management and game logic
- **Canvas API** - Game rendering and animations
- **Local Storage** - High score persistence

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Modern web browser with Canvas support

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd snake-game-mobile
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Game Controls

### Desktop
- **Arrow Keys** - Move snake (Up, Down, Left, Right)
- **Spacebar** - Pause/Resume game
- **Enter** - Restart game (on game over screen)

### Mobile
- **Touch Controls** - Tap directional arrows around the game board
- **Tap** - Pause/Resume game (tap game board)
- **Tap Restart** - Start new game (on game over screen)

## Game Features

### Gameplay
- Control the snake to eat red food items
- Snake grows longer with each food consumed
- Avoid hitting walls or the snake's own body
- Game speed increases as score gets higher

### Scoring
- +10 points for each food item eaten
- High score automatically saved to browser storage
- Score multiplier based on game speed

### Responsive Design
- Game board automatically scales to fit screen
- Touch controls positioned optimally for thumb access
- Works on phones, tablets, and desktop browsers

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Deploy with default settings

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure for static site hosting

### Other Platforms
Since this is a static game with no backend requirements, it can be deployed to any static hosting service.

<!-- README_END -->