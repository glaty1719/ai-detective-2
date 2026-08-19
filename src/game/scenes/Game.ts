import { Scene, GameObjects } from 'phaser';
import { GameSession, GameSessionEvents } from '../features/GameSession';
import { TargetHUDView } from '../features/TargetHUDView';
import { MagnifyingLensController } from '../features/MagnifyingLensController';
import { ChimpuView } from '../features/ChimpuView';
import { TargetObjectData, OrdinaryObjectData, LevelData } from '../features/ItemData';
import { UILayers } from '../utils/UILayers';
import { AudioManager } from '../services/AudioManager';
import { TTSService } from '../services/TTSService';

export class Game extends Scene {
    private session!: GameSession;
    private targetHUD!: TargetHUDView;
    private lensController!: MagnifyingLensController;
    private chimpuView!: ChimpuView;

    private bgImage!: GameObjects.Image;
    private targetSprites: Map<string, GameObjects.Container> = new Map();
    private ordinarySprites: Map<string, GameObjects.Image> = new Map();

    private victoryModal?: GameObjects.Container;
    private haloGraphics?: GameObjects.Graphics;

    constructor() {
        super('Game');
    }

    create() {
        const { width, height } = this.scale;

        // 1. Scene Background
        this.bgImage = this.add.image(width / 2, height / 2, 'bg_smart_home')
            .setDisplaySize(width, height)
            .setDepth(UILayers.GAME_BACKGROUND);

        // 2. Target HUD (Top Bar)
        this.targetHUD = new TargetHUDView(this);

        // 3. Chimpu Mascot (Bottom Left)
        this.chimpuView = new ChimpuView(this, 180, height - 60);

        // 4. Magnifying Lens Controller
        this.lensController = new MagnifyingLensController(this);

        // 5. Halo Graphics for Idle Assistance
        this.haloGraphics = this.add.graphics().setDepth(UILayers.GAME_EFFECTS);

        // 6. Launch Global UI Scene (Pause/Settings)
        if (!this.scene.isActive('UIScene')) {
            this.scene.launch('UIScene', { gameScene: this });
        }

        // 7. Authoritative Game Session
        this.session = new GameSession();
        this.setupSessionListeners();

        // 8. UIScene Event Listeners
        this.events.on('pause-game', () => {
            TTSService.getInstance().stop();
            this.session.pause();
        });
        this.events.on('resume-game', () => this.session.resume());
        this.events.on('restart-game', (data?: { level?: number }) => {
            TTSService.getInstance().stop();
            const lvl = data?.level ? data.level - 1 : 0;
            this.session.startLevel(lvl);
        });
        this.events.on('quit-game', () => {
            TTSService.getInstance().stop();
            this.scene.start('MainMenu');
        });

        // Cleanup on scene shutdown
        this.events.once('shutdown', () => {
            TTSService.getInstance().stop();
            AudioManager.getInstance().stopVoice();
        });
        this.events.once('destroy', () => {
            TTSService.getInstance().stop();
            AudioManager.getInstance().stopVoice();
        });

        // Start Level 1 (Smart Home)
        this.session.startLevel(0);
    }

    update(_time: number, delta: number) {
        if (this.session) {
            this.session.update(delta);
        }
    }

    private setupSessionListeners() {
        this.session.on(GameSessionEvents.LEVEL_STARTED, ({ level }: { level: LevelData }) => {
            this.loadLevelScene(level);
        });

        this.session.on(GameSessionEvents.TARGET_FOUND, ({ target, foundCount }: { target: TargetObjectData, foundCount: number }) => {
            this.handleTargetFound(target, foundCount);
        });

        this.session.on(GameSessionEvents.ORDINARY_INSPECTED, ({ object }: { object: OrdinaryObjectData }) => {
            this.handleOrdinaryInspected(object);
        });

        this.session.on(GameSessionEvents.IDLE_HINT_TRIGGERED, ({ target }: { target: TargetObjectData }) => {
            this.handleIdleHint(target);
        });
    }

    private loadLevelScene(level: LevelData) {
        this.victoryModal?.destroy();
        this.victoryModal = undefined;
        this.haloGraphics?.clear();

        // 1. Update Background
        this.bgImage.setTexture(level.bgKey);

        // 2. Clear old sprites
        this.targetSprites.forEach(sprite => sprite.destroy());
        this.targetSprites.clear();
        this.ordinarySprites.forEach(sprite => sprite.destroy());
        this.ordinarySprites.clear();

        // 3. Create Interactive Ordinary Props
        level.ordinaryObjects.forEach(obj => {
            const sprite = this.add.image(obj.x, obj.y, obj.textureKey)
                .setDepth(UILayers.GAME_OBSTACLES)
                .setInteractive({ useHandCursor: true });

            sprite.on('pointerdown', () => {
                this.session.inspectOrdinary(obj);
            });

            this.ordinarySprites.set(obj.id, sprite);
        });

        // 4. Create Interactive Target AI Objects
        level.targets.forEach(target => {
            const container = this.add.container(target.x, target.y);
            container.setDepth(UILayers.GAME_OBSTACLES + 1);

            // Sprite image
            const sprite = this.add.image(0, 0, target.iconKey);
            container.add(sprite);

            // Subtle Idle Breathing Animation (GDD Section 2)
            this.tweens.add({
                targets: container,
                y: target.y - 8,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: Phaser.Math.Between(1200, 1800),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Interactive Hit Area
            sprite.setInteractive({ useHandCursor: true });
            sprite.on('pointerdown', () => {
                this.session.inspectTarget(target);
            });

            this.targetSprites.set(target.id, container);
        });

        // 5. Update Target HUD and Magnifying Lens
        this.targetHUD.setTargets(level.targets, this.session.foundTargets);
        this.lensController.setTargets(level.targets, this.session.foundTargets);

        // 6. Chimpu Speech & Initial Greeting
        this.chimpuView.startIdleAnimation();
        const greeting = `Welcome to the ${level.name}! Let's find all 3 smart tools!`;
        this.chimpuView.say(greeting, 4000);
        TTSService.getInstance().speak(greeting, { voKey: level.greetingVO });
    }

    private handleTargetFound(target: TargetObjectData, foundCount: number) {
        this.audioPlay('sfx_found_item');
        this.audioPlay('sfx_magnifier_tap');

        // 1. Animate Target Object
        const container = this.targetSprites.get(target.id);
        if (container) {
            this.tweens.killTweensOf(container);
            const sprite = container.getAt(0) as GameObjects.Image;
            if (sprite) {
                sprite.setTexture(target.activeTextureKey);
            }

            // 3D Pop forward & Bounce action
            this.tweens.add({
                targets: container,
                scale: 1.35,
                y: target.y - 25,
                duration: 250,
                yoyo: true,
                repeat: 1,
                ease: 'Back.easeOut',
                onComplete: () => {
                    this.playActionEffect(target, container);
                }
            });

            // Sparkle Burst
            this.spawnSparkleBurst(target.x, target.y);
        }

        // 2. HUD Checkmark Pop & Flying Star
        this.targetHUD.markFound(target.id, foundCount, () => {
            this.audioPlay('star');
        });
        this.lensController.updateFoundTargets(this.session.foundTargets);

        // 3. Chimpu Mascot Cheer
        this.chimpuView.playCheer();
        this.chimpuView.say(`You found it! That's a ${target.name}!`, 3500);

        const isLevelComplete = foundCount >= this.session.currentLevel.targets.length;
        let victoryTriggered = false;
        const triggerVictory = () => {
            if (victoryTriggered) return;
            victoryTriggered = true;
            this.time.delayedCall(400, () => {
                const level = this.session.currentLevel;
                const isLastLevel = this.session.currentLevelNumber >= this.session.totalLevels;
                this.showLevelVictoryModal(level, isLastLevel);
            });
        };

        // 4. Voiceover Narration: Educational Takeaway (GDD Section 4)
        TTSService.getInstance().speak(target.eduTakeaway, {
            voKey: target.voEduKey,
            onComplete: () => {
                if (isLevelComplete) {
                    triggerVictory();
                }
            }
        });

        // Safety fallback timer if voiceover finishes or fails
        if (isLevelComplete) {
            this.time.delayedCall(4500, () => {
                triggerVictory();
            });
        }
    }

    private handleOrdinaryInspected(object: OrdinaryObjectData) {
        this.audioPlay('sfx_wobble_soft');

        // Rubbery Wobble Animation (GDD Section 6)
        const sprite = this.ordinarySprites.get(object.id);
        if (sprite) {
            this.tweens.add({
                targets: sprite,
                rotation: 0.12,
                scaleX: 1.12,
                scaleY: 0.92,
                duration: 90,
                yoyo: true,
                repeat: 3,
                ease: 'Sine.easeInOut'
            });
        }

        // Mascot Reaction & Gentle Hint
        this.chimpuView.playPuzzled();
        const hint = object.hintText;
        this.chimpuView.say(hint, 4500);
        TTSService.getInstance().speak(hint, { voKey: object.voHintKey });
    }

    private handleIdleHint(target: TargetObjectData) {
        const container = this.targetSprites.get(target.id);
        if (!container) return;

        // Gentle Hop & Soft Blue Halo (GDD Section 3: Idle Assistance)
        this.tweens.add({
            targets: container,
            y: target.y - 30,
            scaleX: 1.15,
            scaleY: 1.15,
            duration: 250,
            yoyo: true,
            repeat: 2,
            ease: 'Back.easeOut'
        });

        // Pulsing Soft Halo
        if (this.haloGraphics) {
            this.haloGraphics.clear();
            this.haloGraphics.lineStyle(6, 0x38bdf8, 0.9);
            this.haloGraphics.strokeCircle(target.x, target.y, Math.max(target.width, target.height) * 0.65);

            this.tweens.add({
                targets: this.haloGraphics,
                alpha: 0,
                duration: 1500,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    this.haloGraphics?.clear();
                    if (this.haloGraphics) this.haloGraphics.alpha = 1;
                }
            });
        }
    }

    private playActionEffect(target: TargetObjectData, container: GameObjects.Container) {
        // Unique Action Animation per Smart Tool
        switch (target.actionType) {
            case 'music_pulse':
                for (let i = 0; i < 4; i++) {
                    const note = this.add.image(target.x + Phaser.Math.Between(-30, 30), target.y - 20, 'particle_music_note')
                        .setDepth(UILayers.GAME_EFFECTS)
                        .setScale(0.8);
                    this.tweens.add({
                        targets: note,
                        y: target.y - Phaser.Math.Between(60, 110),
                        x: note.x + Phaser.Math.Between(-40, 40),
                        alpha: 0,
                        duration: 800,
                        ease: 'Sine.easeOut',
                        onComplete: () => note.destroy()
                    });
                }
                break;
            case 'spin_clean':
                this.tweens.add({
                    targets: container,
                    rotation: Math.PI * 2,
                    duration: 600,
                    ease: 'Cubic.easeInOut'
                });
                break;
            case 'bus_drive':
            case 'gps_route':
                this.tweens.add({
                    targets: container,
                    x: target.x + 30,
                    duration: 200,
                    yoyo: true,
                    repeat: 1,
                    ease: 'Sine.easeInOut'
                });
                break;
        }
    }

    private spawnSparkleBurst(x: number, y: number) {
        for (let i = 0; i < 12; i++) {
            const star = this.add.image(x, y, 'particle_star')
                .setDepth(UILayers.GAME_EFFECTS)
                .setScale(Phaser.Math.FloatBetween(0.6, 1.3));

            const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            const speed = Phaser.Math.FloatBetween(60, 200);

            this.tweens.add({
                targets: star,
                x: x + Math.cos(angle) * speed,
                y: y + Math.sin(angle) * speed,
                alpha: 0,
                scale: 0.2,
                duration: 650,
                ease: 'Cubic.easeOut',
                onComplete: () => star.destroy()
            });
        }
    }

    private showLevelVictoryModal(level: LevelData, isLastLevel: boolean) {
        const { width, height } = this.scale;
        this.audioPlay('sfx_stamp_badge');
        this.audioPlay('victory');

        this.chimpuView.playDance();

        this.victoryModal = this.add.container(width / 2, height / 2);
        this.victoryModal.setDepth(UILayers.MODAL_PANEL);

        // Dark modal backdrop
        const backdrop = this.add.rectangle(0, 0, width, height, 0x000000, 0.75)
            .setInteractive();
        this.victoryModal.add(backdrop);

        // Victory Panel Card
        const panel = this.add.graphics();
        panel.fillStyle(0x0c4a6e, 0.96);
        panel.fillRoundedRect(-380, -290, 760, 580, 36);
        panel.lineStyle(6, 0xfde047, 1);
        panel.strokeRoundedRect(-380, -290, 760, 580, 36);
        this.victoryModal.add(panel);

        // Confetti Emitters
        for (let i = 0; i < 35; i++) {
            const colors = ['particle_confetti_blue', 'particle_confetti_pink', 'particle_confetti_yellow', 'particle_confetti_green'];
            const key = Phaser.Utils.Array.GetRandom(colors);
            const confetti = this.add.image(
                Phaser.Math.Between(-340, 340),
                Phaser.Math.Between(-260, 260),
                key
            ).setScale(Phaser.Math.FloatBetween(0.9, 1.6));
            this.victoryModal.add(confetti);

            this.tweens.add({
                targets: confetti,
                y: '+=60',
                rotation: Phaser.Math.FloatBetween(-3, 3),
                duration: Phaser.Math.Between(1000, 2000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }

        // Themed Detective Stamp (or Master AI Detective Badge on Level 4)
        const badgeTexture = isLastLevel ? 'badge_master_detective' : level.stampKey;
        const stamp = this.add.image(0, -90, badgeTexture).setScale(0.95);
        this.victoryModal.add(stamp);

        // Slam down animation for stamp
        stamp.setScale(2.5);
        stamp.setAlpha(0);
        this.tweens.add({
            targets: stamp,
            scale: 1,
            alpha: 1,
            duration: 350,
            ease: 'Back.easeOut'
        });

        // Title
        const titleText = this.add.text(0, 75, isLastLevel ? "MASTER AI DETECTIVE!" : `${level.stampTitle.toUpperCase()}!`, {
            fontFamily: 'Arial Black', fontSize: '42px', color: '#fde047', stroke: '#713f12', strokeThickness: 6
        }).setOrigin(0.5);
        this.victoryModal.add(titleText);

        // Subtitle
        const subMsg = isLastLevel
            ? "Congratulations! You found all smart machines across the city!"
            : `Great detective work! You spotted all smart tools in ${level.name}!`;

        const subText = this.add.text(0, 130, subMsg, {
            fontFamily: 'Arial', fontSize: '20px', color: '#ffffff', stroke: '#0f172a', strokeThickness: 2,
            wordWrap: { width: 680, useAdvancedWrap: true }, align: 'center'
        }).setOrigin(0.5);
        this.victoryModal.add(subText);

        // Voiceover Victory
        TTSService.getInstance().speak(subMsg, { voKey: isLastLevel ? 'vo_victory_master' : level.victoryVO });

        // Next Place Button (Large Green Arrow Button)
        const nextBtn = this.add.container(0, 215);
        const btnBg = this.add.graphics();
        btnBg.fillStyle(0x22c55e, 1);
        btnBg.fillRoundedRect(-160, -35, 320, 70, 22);
        btnBg.lineStyle(4, 0xffffff, 1);
        btnBg.strokeRoundedRect(-160, -35, 320, 70, 22);

        const btnLabel = isLastLevel ? "PLAY AGAIN 🔄" : "NEXT PLACE ➔";
        const btnText = this.add.text(0, 0, btnLabel, {
            fontFamily: 'Arial Black', fontSize: '26px', color: '#ffffff', stroke: '#15803d', strokeThickness: 3
        }).setOrigin(0.5);

        nextBtn.add([btnBg, btnText]);
        this.victoryModal.add(nextBtn);

        btnBg.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(-160, -35, 320, 70),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });

        btnBg.on('pointerdown', () => {
            this.audioPlay('click');
            if (isLastLevel) {
                this.session.startLevel(0);
            } else {
                this.session.nextLevel();
            }
        });

        // Entrance scale
        this.victoryModal.setScale(0.7);
        this.victoryModal.setAlpha(0);
        this.tweens.add({
            targets: this.victoryModal,
            scale: 1,
            alpha: 1,
            duration: 350,
            ease: 'Back.easeOut'
        });
    }

    private audioPlay(key: string) {
        try {
            AudioManager.getInstance().playSFX(key);
        } catch { }
    }
}
