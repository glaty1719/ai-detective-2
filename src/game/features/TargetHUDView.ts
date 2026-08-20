import { Scene, GameObjects } from 'phaser';
import { UILayers } from '../utils/UILayers';
import { TargetObjectData } from './ItemData';

export class TargetHUDView {
    private scene: Scene;
    private container: GameObjects.Container;
    private targetFrames: {
        container: GameObjects.Container;
        icon: GameObjects.Image;
        checkmark: GameObjects.Image;
        label: GameObjects.Text;
        targetId: string;
    }[] = [];

    private starSprites: GameObjects.Image[] = [];
    private badgeMeterContainer!: GameObjects.Container;

    constructor(scene: Scene) {
        this.scene = scene;
        this.container = this.scene.add.container(0, 0);
        this.container.setDepth(UILayers.UI_BACKGROUND_PANELS);

        this.createHUD();
    }

    private readonly STAR_BASE_SCALE = 0.68;

    private createHUD() {
        const { width } = this.scene.scale;
        const hudY = 72;

        // 1. Top HUD Background Bar (Glassmorphic Rounded Pill) - Increased size for perfect label fit
        const barGlow = this.scene.add.graphics();
        const barW = 1260;
        const barH = 114;
        barGlow.fillStyle(0x000000, 0.16);
        barGlow.fillRoundedRect(width / 2 - (barW / 2 + 6), hudY - (barH / 2 - 2), barW + 12, barH + 4, 34);

        barGlow.fillStyle(0xffffff, 0.98);
        barGlow.fillRoundedRect(width / 2 - barW / 2, hudY - barH / 2, barW, barH, 32);
        barGlow.lineStyle(5, 0x38bdf8, 1);
        barGlow.strokeRoundedRect(width / 2 - barW / 2, hudY - barH / 2, barW, barH, 32);
        this.container.add(barGlow);

        // 2. "FIND:" Label on Left
        const findLabel = this.scene.add.text(width / 2 - 505, hudY, "🔍 FIND:", {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#0284c7'
        }).setOrigin(0.5);
        this.container.add(findLabel);

        // 3. 3 Target Item Slots
        const slotStartX = width / 2 - 270;
        const slotSpacing = 240;

        this.targetFrames = [];
        for (let i = 0; i < 3; i++) {
            const slotX = slotStartX + i * slotSpacing;
            const slotContainer = this.scene.add.container(slotX, hudY);

            // Circular frame shifted slightly up to give label ample breathing room
            const frame = this.scene.add.image(0, -12, 'hud_target_circle').setScale(0.62);

            // Target icon
            const icon = this.scene.add.image(0, -12, 'item_smart_speaker').setScale(0.34);

            // Green Checkmark (Hidden initially)
            const checkmark = this.scene.add.image(20, -32, 'hud_checkmark')
                .setScale(0.62)
                .setAlpha(0);

            // Item Name Label underneath inside the board boundary
            const label = this.scene.add.text(0, 28, "", {
                fontFamily: 'Arial Black',
                fontSize: '13px',
                color: '#0f172a',
                stroke: '#ffffff',
                strokeThickness: 3,
                align: 'center',
                wordWrap: { width: 190, useAdvancedWrap: true }
            }).setOrigin(0.5, 0);

            slotContainer.add([frame, icon, checkmark, label]);
            this.container.add(slotContainer);

            this.targetFrames.push({
                container: slotContainer,
                icon,
                checkmark,
                label,
                targetId: ''
            });
        }

        // 4. Detective Badge Meter (Right side)
        this.badgeMeterContainer = this.scene.add.container(width / 2 + 480, hudY);
        const badgePill = this.scene.add.graphics();
        badgePill.fillStyle(0x0284c7, 1);
        badgePill.fillRoundedRect(-100, -32, 200, 64, 22);
        badgePill.lineStyle(3, 0xbae6fd, 1);
        badgePill.strokeRoundedRect(-100, -32, 200, 64, 22);
        this.badgeMeterContainer.add(badgePill);

        this.starSprites = [];
        for (let i = 0; i < 3; i++) {
            const sx = (i - 1) * 54;
            const star = this.scene.add.image(sx, 0, 'hud_star_empty').setScale(this.STAR_BASE_SCALE);
            this.badgeMeterContainer.add(star);
            this.starSprites.push(star);
        }
        this.container.add(this.badgeMeterContainer);
    }

    public setTargets(targets: TargetObjectData[], foundTargetIds: Set<string>) {
        targets.forEach((target, index) => {
            if (this.targetFrames[index]) {
                const tf = this.targetFrames[index];
                tf.targetId = target.id;
                tf.icon.setTexture(target.iconKey);
                tf.label.setText(target.name);

                const isFound = foundTargetIds.has(target.id);
                tf.checkmark.setAlpha(isFound ? 1 : 0);
                tf.checkmark.setScale(isFound ? 0.62 : 0);
                tf.icon.setAlpha(isFound ? 0.6 : 1);
            }
        });

        this.starSprites.forEach(star => {
            this.scene.tweens.killTweensOf(star);
            star.setScale(this.STAR_BASE_SCALE);
        });

        this.updateStars(foundTargetIds.size);
    }

    public markFound(targetId: string, foundCount: number, onComplete?: () => void) {
        const tf = this.targetFrames.find(t => t.targetId === targetId);
        if (!tf) return;

        // Bounce target frame & animate checkmark pop
        this.scene.tweens.add({
            targets: tf.container,
            scale: 1.2,
            duration: 180,
            yoyo: true,
            ease: 'Back.easeOut'
        });

        tf.checkmark.setAlpha(1);
        tf.checkmark.setScale(0);
        this.scene.tweens.add({
            targets: tf.checkmark,
            scale: 0.72,
            duration: 250,
            ease: 'Back.easeOut'
        });

        tf.icon.setAlpha(0.65);

        // Spawn flying star from target frame to badge meter
        const startX = tf.container.x;
        const startY = tf.container.y;
        const endStarIndex = Math.min(2, foundCount - 1);
        const endX = this.badgeMeterContainer.x + (endStarIndex - 1) * 54;
        const endY = this.badgeMeterContainer.y;

        const flyingStar = this.scene.add.image(startX, startY, 'hud_star_filled')
            .setDepth(UILayers.UI_EFFECTS + 20)
            .setScale(1.1);

        this.scene.tweens.add({
            targets: flyingStar,
            x: endX,
            y: endY,
            scale: this.STAR_BASE_SCALE,
            duration: 600,
            ease: 'Cubic.easeInOut',
            onComplete: () => {
                flyingStar.destroy();
                this.updateStars(foundCount);
                if (onComplete) onComplete();
            }
        });
    }

    public updateStars(foundCount: number) {
        for (let i = 0; i < 3; i++) {
            if (this.starSprites[i]) {
                const star = this.starSprites[i];
                this.scene.tweens.killTweensOf(star);

                const shouldBeFilled = i < foundCount;
                if (shouldBeFilled) {
                    star.setTexture('hud_star_filled');
                    if (i === foundCount - 1) {
                        // Pop effect only on the newly earned star
                        star.setScale(this.STAR_BASE_SCALE);
                        this.scene.tweens.add({
                            targets: star,
                            scale: this.STAR_BASE_SCALE * 1.3,
                            duration: 160,
                            yoyo: true,
                            ease: 'Back.easeOut',
                            onComplete: () => {
                                star.setScale(this.STAR_BASE_SCALE);
                            }
                        });
                    } else {
                        star.setScale(this.STAR_BASE_SCALE);
                    }
                } else {
                    star.setTexture('hud_star_empty');
                    star.setScale(this.STAR_BASE_SCALE);
                }
            }
        }
    }

    public destroy() {
        this.container.destroy();
    }
}
