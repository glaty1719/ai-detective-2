import { Scene, GameObjects } from 'phaser';
import { IconButton } from '../ui/IconButton';
import { SettingsPanel } from '../ui/SettingsPanel';
import { UILayers } from '../utils/UILayers';
import { AudioManager } from '../services/AudioManager';
import { TTSService } from '../services/TTSService';

interface ParticleData {
    sprite: GameObjects.Image;
    baseX: number;
    speedY: number;
    driftSpeed: number;
    driftAmp: number;
    phase: number;
}

export class MainMenu extends Scene {
    private titleContainer!: GameObjects.Container;
    private chimpuMascot!: GameObjects.Image;
    private playBtnContainer!: GameObjects.Container;

    private baseTitleY: number = 190;
    private baseMascotY: number = 0;
    private isStarting: boolean = false;

    private floatingParticles: ParticleData[] = [];

    constructor() {
        super('MainMenu');
    }

    create() {
        const { width, height } = this.scale;
        this.isStarting = false;
        this.floatingParticles = [];

        TTSService.getInstance().stop();
        AudioManager.getInstance().stopVoice();

        this.events.once('shutdown', () => {
            TTSService.getInstance().stop();
            AudioManager.getInstance().stopVoice();
        });

        // 1. Background Scene (Smart City / Detective Lab)
        this.add.image(width / 2, height / 2, 'bg_smart_home')
            .setDisplaySize(width, height)
            .setDepth(UILayers.GAME_BACKGROUND);

        // Soft dark gradient overlay
        this.add.rectangle(width / 2, height / 2, width, height, 0x0c4a6e, 0.45)
            .setDepth(UILayers.GAME_BACKGROUND + 1);

        // 2. Ambient Floating Circuit Sparkles & Stars
        for (let i = 0; i < 18; i++) {
            const x = Phaser.Math.Between(80, width - 80);
            const y = Phaser.Math.Between(60, height - 60);
            const key = i % 2 === 0 ? 'particle_star' : 'particle_circuit_sparkle';
            const sprite = this.add.image(x, y, key)
                .setDepth(UILayers.GAME_EFFECTS)
                .setScale(Phaser.Math.FloatBetween(0.5, 0.9))
                .setAlpha(Phaser.Math.FloatBetween(0.35, 0.75));

            this.floatingParticles.push({
                sprite,
                baseX: x,
                speedY: Phaser.Math.FloatBetween(0.3, 0.7),
                driftSpeed: Phaser.Math.FloatBetween(0.001, 0.0025),
                driftAmp: Phaser.Math.FloatBetween(15, 35),
                phase: Math.random() * Math.PI * 2
            });
        }

        // 3. Game Title Logo Banner (Top Center)
        this.baseTitleY = 195;
        this.titleContainer = this.add.container(width / 2, this.baseTitleY);
        this.titleContainer.setDepth(UILayers.UI_BACKGROUND_PANELS);

        // Title Background Card
        const titleGlow = this.add.graphics();
        titleGlow.fillStyle(0x000000, 0.18);
        titleGlow.fillRoundedRect(-480, -95, 960, 200, 36);
        titleGlow.fillStyle(0xffffff, 0.98);
        titleGlow.fillRoundedRect(-490, -105, 980, 200, 34);
        titleGlow.lineStyle(6, 0x38bdf8, 1);
        titleGlow.strokeRoundedRect(-490, -105, 980, 200, 34);
        this.titleContainer.add(titleGlow);

        // Text "CHIMPU'S"
        const mainTitleTop = this.add.text(0, -60, "CHIMPU THE AI DETECTIVE", {
            fontFamily: 'Arial Black',
            fontSize: '44px',
            color: '#0284c7',
            stroke: '#bae6fd',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Subtitle Banner Pill "SPOT THE SMART TOOLS!"
        const subPillBg = this.add.graphics();
        subPillBg.fillStyle(0xf59e0b, 1);
        subPillBg.fillRoundedRect(-240, 15, 480, 52, 26);
        subPillBg.lineStyle(4, 0x78350f, 1);
        subPillBg.strokeRoundedRect(-240, 15, 480, 52, 26);

        const subTitle = this.add.text(0, 41, "🔍 SPOT THE SMART TOOLS!", {
            fontFamily: 'Arial Black',
            fontSize: '26px',
            color: '#ffffff',
            stroke: '#78350f',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.titleContainer.add([mainTitleTop, subPillBg, subTitle]);

        // 4. Hero Mascot Chimpu (Left of center)
        const mascotX = width / 2 - 280;
        this.baseMascotY = height / 2 + 200;

        this.chimpuMascot = this.add.image(mascotX, this.baseMascotY, 'chimpu_detective_idle')
            .setDepth(UILayers.UI_BACKGROUND_PANELS + 1)
            .setScale(1.4);

        // 5. Play Button (Right of mascot)
        const playX = width / 2 + 240;
        const playY = height / 2 + 200;
        this.playBtnContainer = this.add.container(playX, playY);
        this.playBtnContainer.setDepth(UILayers.UI_BUTTONS);

        const playBtnBg = this.add.image(0, 0, 'menu_play_button_bg').setScale(1.2);
        const playText = this.add.text(35, 0, "PLAY", {
            fontFamily: 'Arial Black',
            fontSize: '52px',
            color: '#ffffff',
            stroke: '#047857',
            strokeThickness: 6,
            shadow: { offsetX: 2, offsetY: 2, color: '#064e3b', blur: 4, fill: true }
        }).setOrigin(0.5);

        this.playBtnContainer.add([playBtnBg, playText]);

        // Hover glow scale effect
        playBtnBg.setInteractive({ useHandCursor: true });
        playBtnBg.on('pointerover', () => {
            if (this.isStarting) return;
            this.tweens.add({ targets: this.playBtnContainer, scale: 1.08, duration: 140, ease: 'Power2' });
        });
        playBtnBg.on('pointerout', () => {
            if (this.isStarting) return;
            this.tweens.add({ targets: this.playBtnContainer, scale: 1.0, duration: 140, ease: 'Power2' });
        });
        playBtnBg.on('pointerdown', () => {
            if (this.isStarting) return;
            this.isStarting = true;
            try {
                AudioManager.getInstance().playSFX('click');
            } catch { }

            this.tweens.add({
                targets: this.playBtnContainer,
                scale: 0.92,
                duration: 90,
                yoyo: true,
                onComplete: () => {
                    this.scene.start('Game');
                }
            });
        });

        // 6. Settings Button (Top Right)
        this.addSettingsButton(width, 50);

        // 7. Background Music
        try {
            AudioManager.getInstance().playMusic('bg_music');
        } catch { }
    }

    update(time: number, _delta: number) {
        if (this.isStarting) return;

        // Floating Title Banner
        if (this.titleContainer) {
            this.titleContainer.y = this.baseTitleY + Math.sin(time * 0.0018) * 10;
        }

        // Mascot Chimpu Breathing & Floating
        if (this.chimpuMascot) {
            this.chimpuMascot.y = this.baseMascotY + Math.sin(time * 0.0024) * 12;
            this.chimpuMascot.rotation = Math.sin(time * 0.0016) * 0.03;
        }

        // Play Button Pulse
        if (this.playBtnContainer) {
            const pulse = 1 + Math.sin(time * 0.0035) * 0.045;
            this.playBtnContainer.setScale(pulse);
        }

        // Particle Drift
        const { height } = this.scale;
        for (let i = 0; i < this.floatingParticles.length; i++) {
            const p = this.floatingParticles[i];
            p.sprite.y -= p.speedY;
            p.sprite.x = p.baseX + Math.sin(time * p.driftSpeed + p.phase) * p.driftAmp;

            if (p.sprite.y < -30) {
                p.sprite.y = height + 20;
            }
        }
    }

    private addSettingsButton(_width: number, margin: number) {
        const settingsBtn = new IconButton(
            this,
            margin + 50,
            margin + 50,
            'settings_icon',
            () => {
                new SettingsPanel(this, () => { });
            }
        );
        settingsBtn.setDepth(UILayers.UI_BUTTONS);
    }
}
