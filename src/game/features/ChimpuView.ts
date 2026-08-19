import { Scene, GameObjects } from 'phaser';
import { UILayers } from '../utils/UILayers';

export class ChimpuView {
    private scene: Scene;
    private container: GameObjects.Container;
    private readonly mascotSprite: GameObjects.Image;
    private speechBubbleContainer?: GameObjects.Container;
    private speechTimer?: Phaser.Time.TimerEvent;

    constructor(scene: Scene, x: number, y: number) {
        this.scene = scene;
        this.container = this.scene.add.container(x, y);
        this.container.setDepth(UILayers.UI_BACKGROUND_PANELS + 2);

        this.mascotSprite = this.scene.add.image(0, 0, 'chimpu_detective_idle')
            .setScale(0.9)
            .setOrigin(0.5, 0.85);

        this.container.add(this.mascotSprite);

        this.startIdleAnimation();
    }

    public startIdleAnimation() {
        this.scene.tweens.killTweensOf(this.mascotSprite);
        this.mascotSprite.setTexture('chimpu_detective_idle');

        this.scene.tweens.add({
            targets: this.mascotSprite,
            y: '-=12',
            rotation: 0.03,
            scaleX: 0.88,
            scaleY: 0.92,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    public playCheer() {
        this.scene.tweens.killTweensOf(this.mascotSprite);
        this.mascotSprite.setTexture('chimpu_detective_cheer');
        this.mascotSprite.y = 0;

        this.scene.tweens.add({
            targets: this.mascotSprite,
            y: '-=35',
            scaleX: 0.98,
            scaleY: 0.98,
            duration: 220,
            yoyo: true,
            repeat: 2,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.scene.time.delayedCall(400, () => {
                    this.startIdleAnimation();
                });
            }
        });
    }

    public playPuzzled() {
        this.scene.tweens.killTweensOf(this.mascotSprite);
        this.mascotSprite.setTexture('chimpu_detective_puzzled');
        this.mascotSprite.y = 0;

        this.scene.tweens.add({
            targets: this.mascotSprite,
            rotation: -0.1,
            duration: 180,
            yoyo: true,
            repeat: 2,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.scene.time.delayedCall(600, () => {
                    this.startIdleAnimation();
                });
            }
        });
    }

    public playDance() {
        this.scene.tweens.killTweensOf(this.mascotSprite);
        this.mascotSprite.setTexture('chimpu_detective_dance');
        this.mascotSprite.y = 0;

        this.scene.tweens.add({
            targets: this.mascotSprite,
            y: '-=25',
            rotation: 0.08,
            scaleX: 0.95,
            duration: 250,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    public say(text: string, durationMs: number = 4200) {
        this.speechTimer?.remove();
        this.speechBubbleContainer?.destroy();

        // Position bubble upward and slightly right of Chimpu so it never clips off-screen
        const bubbleOffsetY = -175;
        const bubbleOffsetX = 120;
        this.speechBubbleContainer = this.scene.add.container(bubbleOffsetX, bubbleOffsetY);
        this.container.add(this.speechBubbleContainer);

        const paddingX = 24;
        const paddingY = 18;
        const msgText = this.scene.add.text(0, 0, text, {
            fontFamily: 'Arial',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#0f172a',
            stroke: '#ffffff',
            strokeThickness: 2,
            wordWrap: { width: 380, useAdvancedWrap: true },
            align: 'center'
        }).setOrigin(0.5);

        const bubbleWidth = Math.max(220, msgText.width + paddingX * 2);
        const bubbleHeight = Math.max(65, msgText.height + paddingY * 2);

        const bubbleBg = this.scene.add.graphics();
        // Drop shadow
        bubbleBg.fillStyle(0x000000, 0.2);
        bubbleBg.fillRoundedRect(-bubbleWidth / 2 + 5, -bubbleHeight / 2 + 5, bubbleWidth, bubbleHeight, 20);

        // Bubble body
        bubbleBg.fillStyle(0xffffff, 0.98);
        bubbleBg.fillRoundedRect(-bubbleWidth / 2, -bubbleHeight / 2, bubbleWidth, bubbleHeight, 20);
        bubbleBg.lineStyle(4, 0x38bdf8, 1);
        bubbleBg.strokeRoundedRect(-bubbleWidth / 2, -bubbleHeight / 2, bubbleWidth, bubbleHeight, 20);

        // Pointer triangle tail connecting towards Chimpu's head
        const tailX = -bubbleWidth / 2 + 35;
        bubbleBg.fillStyle(0xffffff, 1);
        bubbleBg.beginPath();
        bubbleBg.moveTo(tailX, bubbleHeight / 2);
        bubbleBg.lineTo(tailX - 25, bubbleHeight / 2 + 22);
        bubbleBg.lineTo(tailX + 20, bubbleHeight / 2);
        bubbleBg.closePath();
        bubbleBg.fillPath();

        bubbleBg.lineStyle(4, 0x38bdf8, 1);
        bubbleBg.beginPath();
        bubbleBg.moveTo(tailX, bubbleHeight / 2);
        bubbleBg.lineTo(tailX - 25, bubbleHeight / 2 + 22);
        bubbleBg.lineTo(tailX + 20, bubbleHeight / 2);
        bubbleBg.strokePath();

        this.speechBubbleContainer.add([bubbleBg, msgText]);

        // Entrance scale animation
        this.speechBubbleContainer.setScale(0.5);
        this.speechBubbleContainer.setAlpha(0);
        this.scene.tweens.add({
            targets: this.speechBubbleContainer,
            scale: 1,
            alpha: 1,
            duration: 220,
            ease: 'Back.easeOut'
        });

        this.speechTimer = this.scene.time.delayedCall(durationMs, () => {
            if (this.speechBubbleContainer) {
                this.scene.tweens.add({
                    targets: this.speechBubbleContainer,
                    alpha: 0,
                    scale: 0.7,
                    duration: 200,
                    ease: 'Sine.easeIn',
                    onComplete: () => {
                        this.speechBubbleContainer?.destroy();
                        this.speechBubbleContainer = undefined;
                    }
                });
            }
        });
    }

    public destroy() {
        this.speechTimer?.remove();
        this.container.destroy();
    }
}
