# Materaqua Pop-up Book

A 3D interactive Pop-up Book built with React Three Fiber, Framer Motion, and Three.js.

## Features

- **Dynamic Cover Animation**: Realistic opening mechanism that affects the internal pages.
- **7 Unique Pages**: Each with its own theme and pop-up elements.
- **Interactive Pop-ups**: Elements that trigger during page transitions and can be manually activated via internal mechanisms.
- **Smooth Navigation**: Intelligent page-to-page transitions that animate sequentially.
- **Integration Ready**: Designed to be easily embedded into the Materaqua ecosystem.

## Tech Stack

- **React**: Frontend framework.
- **Vite**: Build tool.
- **React Three Fiber**: Three.js wrapper for React.
- **React Three Drei**: Useful helpers for R3F.
- **Framer Motion / Motion 3D**: Animation orchestration.
- **Tailwind CSS**: Styling.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

- `src/components/3d/`: R3F components (Book, Page, Popups).
- `src/components/ui/`: Standard React components for the interface.
- `src/hooks/`: Custom hooks for animation and state management.
- `src/store/`: State management for the book's progress.
- `src/assets/`: 3D models, textures, and fonts.
