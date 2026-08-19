/**
 * UI Layer Depth System
 * Provides a clean, organized depth hierarchy for all UI elements across scenes
 */

export class UILayers {
    // ===== LAYER 0: Game Elements =====
    static readonly GAME_BACKGROUND = 0;
    static readonly GAME_WALLS = 1;
    static readonly GAME_OBSTACLES = 2;
    static readonly GAME_RINGS = 3;
    static readonly GAME_PLAYER = 10;
    static readonly GAME_EFFECTS = 20;

    // ===== LAYER 1: Non-Blocking UI =====
    static readonly UI_BACKGROUND_PANELS = 100;
    static readonly UI_TEXT = 110;
    static readonly UI_BUTTONS = 120;
    static readonly UI_ICONS = 130;
    static readonly UI_EFFECTS = 150;

    // ===== LAYER 2: Full-Screen Overlays =====
    static readonly OVERLAY_BACKGROUND = 1000;
    static readonly OVERLAY_PANEL = 1010;
    static readonly OVERLAY_TEXT = 1020;
    static readonly OVERLAY_BUTTONS = 1030;
    static readonly OVERLAY_BLOCKER = 900;

    // ===== LAYER 3: Top Modal Panels =====
    static readonly MODAL_BACKGROUND = 10000;
    static readonly MODAL_PANEL = 10010;
    static readonly MODAL_TEXT = 10020;
    static readonly MODAL_BUTTONS = 10030;
    static readonly MODAL_CONTROLS = 10040;
}
