import { EventEmitter } from 'eventemitter3';
import { LEVELS_CONFIG, LevelData, TargetObjectData, OrdinaryObjectData } from './ItemData';

export enum GameSessionEvents {
    LEVEL_STARTED = 'level_started',
    TARGET_FOUND = 'target_found',
    ORDINARY_INSPECTED = 'ordinary_inspected',
    IDLE_HINT_TRIGGERED = 'idle_hint_triggered',
    LEVEL_COMPLETED = 'level_completed',
    GAME_COMPLETED = 'game_completed'
}

export class GameSession extends EventEmitter {
    private currentLevelIndex: number = 0;
    private foundTargetIds: Set<string> = new Set();
    private completedLevels: Set<number> = new Set();
    private isPaused: boolean = false;
    private idleTimer: number = 0;
    private readonly IDLE_LIMIT_MS: number = 5000; // 5-second no-stall rule

    constructor() {
        super();
    }

    public get currentLevel(): LevelData {
        return LEVELS_CONFIG[this.currentLevelIndex] || LEVELS_CONFIG[0];
    }

    public get currentLevelNumber(): number {
        return this.currentLevelIndex + 1;
    }

    public get totalLevels(): number {
        return LEVELS_CONFIG.length;
    }

    public get foundTargets(): Set<string> {
        return this.foundTargetIds;
    }

    public get isCurrentLevelCompleted(): boolean {
        return this.foundTargetIds.size >= this.currentLevel.targets.length;
    }

    public startLevel(levelIndex: number = 0) {
        this.currentLevelIndex = Math.max(0, Math.min(LEVELS_CONFIG.length - 1, levelIndex));
        this.foundTargetIds.clear();
        this.isPaused = false;
        this.resetIdleTimer();

        this.emit(GameSessionEvents.LEVEL_STARTED, {
            level: this.currentLevel,
            levelIndex: this.currentLevelIndex
        });
    }

    public inspectTarget(target: TargetObjectData): boolean {
        if (this.foundTargetIds.has(target.id)) {
            // Already found, just celebrate
            return false;
        }

        this.resetIdleTimer();
        this.foundTargetIds.add(target.id);

        this.emit(GameSessionEvents.TARGET_FOUND, {
            target,
            foundCount: this.foundTargetIds.size,
            totalTargets: this.currentLevel.targets.length
        });

        if (this.foundTargetIds.size >= this.currentLevel.targets.length) {
            this.completedLevels.add(this.currentLevelIndex);
            const isLastLevel = this.currentLevelIndex >= LEVELS_CONFIG.length - 1;

            this.emit(GameSessionEvents.LEVEL_COMPLETED, {
                level: this.currentLevel,
                levelIndex: this.currentLevelIndex,
                isLastLevel
            });

            if (isLastLevel) {
                this.emit(GameSessionEvents.GAME_COMPLETED);
            }
        }

        return true;
    }

    public inspectOrdinary(ordinary: OrdinaryObjectData) {
        this.resetIdleTimer();
        this.emit(GameSessionEvents.ORDINARY_INSPECTED, {
            object: ordinary
        });
    }

    public update(delta: number) {
        if (this.isPaused || this.isCurrentLevelCompleted) return;

        this.idleTimer += delta;
        if (this.idleTimer >= this.IDLE_LIMIT_MS) {
            this.triggerIdleHint();
            this.resetIdleTimer();
        }
    }

    public resetIdleTimer() {
        this.idleTimer = 0;
    }

    private triggerIdleHint() {
        // Find first unfound target
        const unfoundTarget = this.currentLevel.targets.find(t => !this.foundTargetIds.has(t.id));
        if (unfoundTarget) {
            this.emit(GameSessionEvents.IDLE_HINT_TRIGGERED, {
                target: unfoundTarget
            });
        }
    }

    public nextLevel(): boolean {
        if (this.currentLevelIndex < LEVELS_CONFIG.length - 1) {
            this.startLevel(this.currentLevelIndex + 1);
            return true;
        }
        return false;
    }

    public pause() {
        this.isPaused = true;
    }

    public resume() {
        this.isPaused = false;
        this.resetIdleTimer();
    }
}
