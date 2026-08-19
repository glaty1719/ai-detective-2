import { Scene } from 'phaser';
import { IconButton } from '../ui/IconButton';
import { PausePanel } from '../ui/PausePanel';
import { SettingsPanel } from '../ui/SettingsPanel';
import { UILayers } from '../utils/UILayers';
import { GameOverPanel } from '../ui/GameOverPanel';

export class UIScene extends Scene {
    private pauseButton: any;
    private settingsButton: any;
    private gameOverPanel: GameOverPanel | null = null;

    private gameScene: Scene;
    private gameEvents: Phaser.Events.EventEmitter;

    constructor() {
        super({ key: 'UIScene' });
    }

    init(data: { gameScene: Scene }) {
        this.gameScene = data.gameScene;
        this.gameEvents = this.gameScene.events;
    }

    create() {
        this.input.setTopOnly(true);

        this.setupButtons(50);

        this.gameEvents.on('show-gameover', this.showGameOver, this);
        this.gameEvents.on('update-hud', this.onUpdateHUD, this);
        this.gameEvents.on('tutorial-started', this.disableTopButtonsOnly, this);
        this.gameEvents.on('tutorial-ended', this.enableTopButtonsOnly, this);

        this.events.on('shutdown', () => {
            if (this.gameEvents) {
                this.gameEvents.off('show-gameover', this.showGameOver, this);
                this.gameEvents.off('update-hud', this.onUpdateHUD, this);
                this.gameEvents.off('tutorial-started', this.disableTopButtonsOnly, this);
                this.gameEvents.off('tutorial-ended', this.enableTopButtonsOnly, this);
            }
        });
    }

    private onUpdateHUD(_data: { collected: number, total: number }) {
        // Implementation for future HUD updates
    }

    private showGameOver(data: { score: number; level: number; win: boolean }) {
        this.gameOverPanel?.destroy();
        this.disableTopButtonsOnly();

        this.gameOverPanel = new GameOverPanel(
            this,
            data.win,
            data.level,
            () => {
                this.gameEvents.emit('restart-game', { level: data.level });
                this.enableTopButtonsOnly();
                this.gameOverPanel?.destroy();
                this.gameOverPanel = null;
            },
            () => {
                this.gameEvents.emit('quit-game');
                this.enableTopButtonsOnly();
                this.gameOverPanel?.destroy();
                this.gameOverPanel = null;
            },
            () => {
                this.gameEvents.emit('restart-game', { level: data.level + 1 });
                this.enableTopButtonsOnly();
                this.gameOverPanel?.destroy();
                this.gameOverPanel = null;
            }
        );
    }

    private setupButtons(margin: number) {
        this.pauseButton = new IconButton(
            this,
            margin + 50,
            50,
            'pause_icon',
            () => {
                this.gameEvents.emit('pause-game');
                new PausePanel(
                    this,
                    () => { this.gameEvents.emit('resume-game'); },
                    () => { this.gameEvents.emit('resume-game'); this.gameEvents.emit('restart-game'); },
                    () => { this.gameEvents.emit('resume-game'); this.gameEvents.emit('quit-game'); }
                );
            }
        );
        this.pauseButton.sprite.setOrigin(0.5, 0);
        this.pauseButton.setDepth(UILayers.UI_BUTTONS);

        this.settingsButton = new IconButton(
            this,
            margin + 170,
            50,
            'settings_icon',
            () => {
                this.gameEvents.emit('pause-game');
                new SettingsPanel(this, () => {
                    this.gameEvents.emit('resume-game');
                });
            }
        );
        this.settingsButton.sprite.setOrigin(0.5, 0);
        this.settingsButton.setDepth(UILayers.UI_BUTTONS);
    }

    private disableTopButtonsOnly() {
        this.pauseButton?.disable();
        this.settingsButton?.disable();
    }

    private enableTopButtonsOnly() {
        this.pauseButton?.enable();
        this.settingsButton?.enable();
    }
}

