import { Scene, GameObjects } from 'phaser';
import { UILayers } from '../utils/UILayers';
import { TargetObjectData } from './ItemData';

export class MagnifyingLensController {
    private scene: Scene;
    private readonly lensSprite: GameObjects.Image;
    private isVisible: boolean = false;
    private targets: TargetObjectData[] = [];
    private foundTargetIds: Set<string> = new Set();
    private lastSparkleTime: number = 0;

    constructor(scene: Scene) {
        this.scene = scene;

        this.lensSprite = this.scene.add.image(-500, -500, 'magnifier_glass_lens')
            .setDepth(UILayers.UI_EFFECTS + 10)
            .setScale(0.85)
            .setAlpha(0);

        this.setupPointerListeners();
    }

    public setTargets(targets: TargetObjectData[], foundTargetIds: Set<string>) {
        this.targets = targets;
        this.foundTargetIds = foundTargetIds;
    }

    public updateFoundTargets(foundTargetIds: Set<string>) {
        this.foundTargetIds = foundTargetIds;
    }

    private setupPointerListeners() {
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.showLens(pointer.x, pointer.y);
        });

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (this.isVisible) {
                this.moveLens(pointer.x, pointer.y);
                this.checkSmartObjectProximity(pointer.x, pointer.y);
            }
        });

        this.scene.input.on('pointerup', () => {
            this.hideLens();
        });
    }

    private showLens(x: number, y: number) {
        this.isVisible = true;
        this.lensSprite.setPosition(x, y);
        this.scene.tweens.killTweensOf(this.lensSprite);
        this.scene.tweens.add({
            targets: this.lensSprite,
            alpha: 1,
            scale: 0.95,
            duration: 120,
            ease: 'Back.easeOut'
        });
        this.checkSmartObjectProximity(x, y);
    }

    private moveLens(x: number, y: number) {
        this.lensSprite.x = Phaser.Math.Linear(this.lensSprite.x, x, 0.65);
        this.lensSprite.y = Phaser.Math.Linear(this.lensSprite.y, y, 0.65);
    }

    private hideLens() {
        this.isVisible = false;
        this.scene.tweens.killTweensOf(this.lensSprite);
        this.scene.tweens.add({
            targets: this.lensSprite,
            alpha: 0,
            scale: 0.75,
            duration: 150,
            ease: 'Sine.easeIn'
        });
    }

    private checkSmartObjectProximity(x: number, y: number) {
        const now = this.scene.time.now;
        if (now - this.lastSparkleTime < 180) return;

        for (const target of this.targets) {
            const dist = Phaser.Math.Distance.Between(x, y, target.x, target.y);
            const radius = Math.max(target.width, target.height) * 0.75;

            if (dist < radius) {
                this.lastSparkleTime = now;
                const isFound = this.foundTargetIds.has(target.id);
                this.spawnCircuitSparkle(
                    target.x + Phaser.Math.Between(-target.width / 3, target.width / 3),
                    target.y + Phaser.Math.Between(-target.height / 3, target.height / 3),
                    isFound
                );
                break;
            }
        }
    }

    private spawnCircuitSparkle(x: number, y: number, isFound: boolean) {
        const key = isFound ? 'particle_star' : 'particle_circuit_sparkle';
        const sparkle = this.scene.add.image(x, y, key)
            .setDepth(UILayers.UI_EFFECTS + 5)
            .setScale(Phaser.Math.FloatBetween(0.6, 1.1))
            .setAlpha(0.9);

        this.scene.tweens.add({
            targets: sparkle,
            y: y - Phaser.Math.Between(25, 55),
            x: x + Phaser.Math.Between(-20, 20),
            scale: 0.2,
            alpha: 0,
            duration: 550,
            ease: 'Cubic.easeOut',
            onComplete: () => sparkle.destroy()
        });
    }

    public destroy() {
        this.lensSprite.destroy();
    }
}
