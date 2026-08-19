# Base Project Structure & Skeleton Guide

This document defines the standardized architecture and rules for the Phaser JS educational game project. Follow this guide when starting a new game or cleaning up the project.

## 📁 Directory Structure

```text
/
├── public/
│   └── assets/             # Global and game-specific assets
│       ├── audio/          # UI SFX and BGM (royalty-free)
│       ├── globalUI/       # Standard buttons, panels, and icons
│       ├── loading/        # Splash screen assets
│       └── [GameSpecific]/ # Features assets (remove on cleanup)
├── src/
│   ├── game/
│   │   ├── components/     # Reusable game-world UI/graphics components
│   │   ├── entities/       # Physics objects, players, and NPCs
│   │   ├── features/       # CORE GAMEPLAY LOGIC (Feature-based)
│   │   ├── scenes/         # Phaser Scene definitions
│   │   ├── services/       # Singleton managers (Audio, Data, API)
│   │   ├── ui/             # Screen-space UI components (Buttons, Modals)
│   │   ├── utils/          # Constants, Math, Layer systems, Themes
│   │   └── main.ts         # Phaser Config and Scene registration
│   └── main.ts             # Entry point
└── ...config files
```

---

## 🏗️ Core Scene Architecture

### 1. **Boot (`Boot.ts`)**
- Initial loading of minimal assets (loading bar, splash logo).
- Transition to Preloader.

### 2. **Preloader (`Preloader.ts`)**
- Loads global UI assets, audio, and standard textures.
- **CLEANUP RULE**: Remove all game-specific asset loading here for new projects.

### 3. **Main Menu (`MainMenu.ts`)**
- High-quality background, Title, Play button, and Settings button.
- Triggers background music.

### 4. **Level Selection (`LevelSelection.ts`)**
- Grid of level cards.
- Handles unlocking logic via `GameDataManager`.

### 5. **Game (`Game.ts`) - Skeleton**
- Root scene for gameplay.
- **Rules**:
  - Do not put gameplay logic here.
  - Instantiate classes from `features/` instead.
  - Controls Pause/Resume/Win/Lose states.

### 6. **UI Scene (`UIScene.ts`)**
- Persistent HUD layer that sits above the Game scene.
- Contains Pause/Settings buttons.
- Handles global events (`show-gameover`, `update-hud`).

---

## 🎨 UI & Design System

### Layer Depth System (`UILayers.ts`)
Must be strictly followed using `setDepth(UILayers.NAME)`:

| Layer | Type | Range | Examples |
| :--- | :--- | :--- | :--- |
| **Layer 3** | **Modals** | 10000+ | Settings, Pause, Game Complete |
| **Layer 2** | **Overlays** | 900-1000 | Tutorials, Hints, Blocker |
| **Layer 1** | **UI/HUD** | 100-130 | HUD Buttons, Score, Timer |
| **Layer 0** | **Game** | 0-20 | Player, Obstacles, Background |

### Theme System (`Theme.ts`)
- Use constants for all colors to maintain branding.
- Avoid hardcoded hex values in features.

---

## 🛠️ Global Services

1.  **`AudioManager.ts`**: Use for all sound. Controlled via Settings Panel.
2.  **`GameDataManager.ts`**: Handles level progress, score persistence, and local storage.
3.  **`APIService.ts`**: Standards for backend communication (Start Level, Post Score).

---

## 📜 Development Rules

### 1. **Feature-Based Architecture**
- Divide gameplay into logic classes in `src/game/features/`.
- Example: A racing game should have `TrackManager`, `VehicleController`, `LapSystem`.

### 2. **Asset Management**
- Use `royalty-free` assets only.
- Audio must be in `mp3` (BGM) or `wav/short mp3` (SFX).

### 3. **Clean Code**
- **NO SINGLE FILE PROJECTS**: If a file exceeds 400 lines, refactor into components.
- **UI Components**: Use `IconButton`, `SpriteButton` instead of raw `add.image().setInteractive()`.

### 4. **UI Layer Status**
- Every scene must document its depth usage in `UI_LAYER_STATUS.md`.

---

## 🧹 Cleanup Checklist for New Games

When starting a new game within this repository:

1.  [ ] **`src/game/features/`**: Clear all files.
2.  [ ] **`src/game/ui/`**: Remove specific tutorials (keep Buttons/Panels).
3.  [ ] **`src/game/scenes/Game.ts`**: Reset to skeleton structure.
4.  [ ] **`src/game/scenes/Preloader.ts`**: Delete game-specific `load` calls.
5.  [ ] **`public/assets/`**: Delete folders for the previous game.
6.  [ ] **`src/game/utils/`**: Delete specific generator/math files.
