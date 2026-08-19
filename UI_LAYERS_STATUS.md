# UI Layer System - Implementation Status (Skeleton)

## ✅ Global UI Components

### UI Scene (`UIScene.ts`)
- **Layer 1**: HUD Buttons (Pause, Settings)
  - Uses: `UI_BUTTONS`

### Modal Panels
- **PausePanel.ts**: Uses Layer 3 (`MODAL_BACKGROUND`, `MODAL_PANEL`, `MODAL_BUTTONS`)
- **SettingsPanel.ts**: Uses Layer 3 (`MODAL_BACKGROUND`, `MODAL_PANEL`, `MODAL_CONTROLS`)
- **GameOverPanel.ts**: Uses Layer 3 (`MODAL_BACKGROUND`, `MODAL_PANEL`, `MODAL_BUTTONS`)

### Main Menu (`MainMenu.ts`)
- **Layer 0**: Background
  - Uses: `GAME_BACKGROUND`
- **Layer 1**: Title, Play button, Settings button
  - Uses: `UI_TEXT`, `UI_BUTTONS`

### Level Selection (`LevelSelection.ts`)
- **Layer 0**: Background
- **Layer 1**: Level Cards, Back/Settings buttons
  - Uses: `UI_BACKGROUND_PANELS`, `UI_BUTTONS`

---

## 📊 Layer Hierarchy (Enforced Globally)

```
Layer 3: MODAL PANELS          10000+
  - Pause Panel
  - Settings Panel
  - Game Over Panel

Layer 2: OVERLAYS              900-1030
  - Tutorial containers
  - Hint panels
  - Click blocker (invisible)

Layer 1: UI ELEMENTS           100-130
  - HUD (score, health, timer)
  - Buttons (pause, settings)

Layer 0: GAME CONTENT          0-20
  - Backgrounds
  - Game objects (player, obstacles)
  - Particles/effects
```

---

## 🔧 Usage Example

```typescript
import { UILayers } from '../utils/UILayers';

// Layer 0: Game element
sprite.setDepth(UILayers.GAME_PLAYER);

// Layer 1: UI button
button.setDepth(UILayers.UI_BUTTONS);

// Layer 2: Tutorial overlay
overlay.setDepth(UILayers.OVERLAY_BACKGROUND);

// Layer 3: Modal panel
panel.setDepth(UILayers.MODAL_PANEL);
```

