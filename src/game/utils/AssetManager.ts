import { Scene } from 'phaser';

export class AssetManager {
    static generateTextures(scene: Scene) {
        if (scene.textures.exists('item_smart_speaker')) {
            return;
        }

        // ==========================================
        // 1. PARTICLES & FX TEXTURES
        // ==========================================
        {
            // Star particle
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xfde047, 1);
            const cx = 20, cy = 20, spikes = 5, outerR = 18, innerR = 8;
            let rot = (Math.PI / 2) * 3;
            let step = Math.PI / spikes;
            g.beginPath();
            g.moveTo(cx, cy - outerR);
            for (let i = 0; i < spikes; i++) {
                let x = cx + Math.cos(rot) * outerR;
                let y = cy + Math.sin(rot) * outerR;
                g.lineTo(x, y);
                rot += step;
                x = cx + Math.cos(rot) * innerR;
                y = cy + Math.sin(rot) * innerR;
                g.lineTo(x, y);
                rot += step;
            }
            g.lineTo(cx, cy - outerR);
            g.closePath();
            g.fillPath();
            g.generateTexture('particle_star', 40, 40);
            g.destroy();
        }

        {
            // Blue AI sparkle
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x38bdf8, 1);
            g.fillCircle(16, 16, 10);
            g.fillStyle(0xffffff, 0.9);
            g.fillCircle(16, 16, 5);
            g.lineStyle(3, 0x0284c7, 1);
            g.lineBetween(16, 2, 16, 30);
            g.lineBetween(2, 16, 30, 16);
            g.generateTexture('particle_sparkle_blue', 32, 32);
            g.destroy();
        }

        {
            // AI Circuit Sparkle (glowing cyber node)
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x00f5ff, 0.4);
            g.fillCircle(20, 20, 18);
            g.fillStyle(0x00f5ff, 1);
            g.fillCircle(20, 20, 10);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(20, 20, 5);
            g.lineStyle(2, 0xffffff, 0.9);
            g.strokeCircle(20, 20, 14);
            g.generateTexture('particle_circuit_sparkle', 40, 40);
            g.destroy();
        }

        {
            // Musical note particle
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xf43f5e, 1);
            g.fillEllipse(12, 24, 10, 8);
            g.fillRect(18, 6, 4, 20);
            g.fillRect(18, 6, 14, 6);
            g.generateTexture('particle_music_note', 36, 36);
            g.destroy();
        }

        {
            // Confetti particles
            const colors = [
                { key: 'particle_confetti_blue', color: 0x38bdf8 },
                { key: 'particle_confetti_pink', color: 0xf472b6 },
                { key: 'particle_confetti_yellow', color: 0xfde047 },
                { key: 'particle_confetti_green', color: 0x4ade80 }
            ];
            colors.forEach(c => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(c.color, 1);
                g.fillRoundedRect(2, 2, 18, 12, 3);
                g.generateTexture(c.key, 22, 16);
                g.destroy();
            });
        }

        // ==========================================
        // 2. HUD & UI ASSETS
        // ==========================================
        {
            // HUD Target Circle Frame
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Drop shadow
            g.fillStyle(0x000000, 0.2);
            g.fillCircle(65, 68, 58);

            // Outer ring
            g.fillStyle(0xffffff, 0.95);
            g.fillCircle(65, 65, 58);
            g.lineStyle(5, 0x38bdf8, 1);
            g.strokeCircle(65, 65, 58);

            // Inner circle
            g.fillStyle(0xf0f9ff, 1);
            g.fillCircle(65, 65, 48);

            g.generateTexture('hud_target_circle', 130, 130);
            g.destroy();
        }

        {
            // Green Checkmark
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x22c55e, 1);
            g.fillCircle(30, 30, 26);
            g.lineStyle(4, 0xffffff, 1);
            g.strokeCircle(30, 30, 26);

            g.lineStyle(6, 0xffffff, 1);
            g.beginPath();
            g.moveTo(18, 30);
            g.lineTo(26, 38);
            g.lineTo(44, 18);
            g.strokePath();

            g.generateTexture('hud_checkmark', 60, 60);
            g.destroy();
        }

        {
            // Empty Star
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x0f172a, 0.25);
            g.fillCircle(30, 30, 26);
            g.lineStyle(3, 0x64748b, 0.8);
            g.strokeCircle(30, 30, 26);

            // Empty Star Silhouette (exact same dimensions as filled star)
            g.fillStyle(0x64748b, 0.5);
            const cx = 30, cy = 30, spikes = 5, outerR = 18, innerR = 8;
            let rot = (Math.PI / 2) * 3;
            let step = Math.PI / spikes;
            g.beginPath();
            g.moveTo(cx, cy - outerR);
            for (let i = 0; i < spikes; i++) {
                let x = cx + Math.cos(rot) * outerR;
                let y = cy + Math.sin(rot) * outerR;
                g.lineTo(x, y);
                rot += step;
                x = cx + Math.cos(rot) * innerR;
                y = cy + Math.sin(rot) * innerR;
                g.lineTo(x, y);
                rot += step;
            }
            g.closePath();
            g.fillPath();

            g.generateTexture('hud_star_empty', 60, 60);
            g.destroy();
        }

        {
            // Filled Star
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xfbbf24, 1);
            g.fillCircle(30, 30, 26);
            g.lineStyle(4, 0xd97706, 1);
            g.strokeCircle(30, 30, 26);

            g.fillStyle(0xffffff, 1);
            const cx = 30, cy = 30, spikes = 5, outerR = 18, innerR = 8;
            let rot = (Math.PI / 2) * 3;
            let step = Math.PI / spikes;
            g.beginPath();
            g.moveTo(cx, cy - outerR);
            for (let i = 0; i < spikes; i++) {
                let x = cx + Math.cos(rot) * outerR;
                let y = cy + Math.sin(rot) * outerR;
                g.lineTo(x, y);
                rot += step;
                x = cx + Math.cos(rot) * innerR;
                y = cy + Math.sin(rot) * innerR;
                g.lineTo(x, y);
                rot += step;
            }
            g.closePath();
            g.fillPath();

            g.generateTexture('hud_star_filled', 60, 60);
            g.destroy();
        }

        {
            // Detective Magnifying Lens
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Drop shadow
            g.fillStyle(0x000000, 0.25);
            g.fillCircle(110, 115, 88);

            // Handle (Wood & Gold)
            g.lineStyle(16, 0x78350f, 1);
            g.lineBetween(170, 170, 230, 230);
            g.lineStyle(12, 0xd97706, 1);
            g.lineBetween(170, 170, 226, 226);
            g.lineStyle(6, 0xfde047, 1);
            g.lineBetween(170, 170, 185, 185);

            // Lens Gold Frame
            g.fillStyle(0xfde047, 1);
            g.fillCircle(110, 110, 88);
            g.lineStyle(8, 0xd97706, 1);
            g.strokeCircle(110, 110, 88);

            // Glass Lens (Translucent Sky Blue & Reflection)
            g.fillStyle(0x38bdf8, 0.35);
            g.fillCircle(110, 110, 76);

            // Glass Shine Arc
            g.lineStyle(8, 0xffffff, 0.7);
            g.beginPath();
            g.arc(110, 110, 64, -Math.PI * 0.8, -Math.PI * 0.25, false);
            g.strokePath();

            // Center crosshair / AI detector reticle
            g.lineStyle(2, 0x00f5ff, 0.8);
            g.strokeCircle(110, 110, 30);
            g.lineBetween(110, 72, 110, 86);
            g.lineBetween(110, 134, 110, 148);
            g.lineBetween(72, 110, 86, 110);
            g.lineBetween(134, 110, 148, 110);

            g.generateTexture('magnifier_glass_lens', 260, 260);
            g.destroy();
        }

        {
            // Menu Play Button
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x000000, 0.2);
            g.fillRoundedRect(8, 12, 280, 80, 30);
            g.fillStyle(0x10b981, 1);
            g.fillRoundedRect(0, 4, 280, 80, 30);
            g.lineStyle(6, 0xffffff, 1);
            g.strokeRoundedRect(0, 4, 280, 80, 30);

            g.fillStyle(0x34d399, 0.6);
            g.fillRoundedRect(12, 10, 256, 28, 14);

            g.fillStyle(0xffffff, 1);
            g.beginPath();
            g.moveTo(50, 24);
            g.lineTo(82, 44);
            g.lineTo(50, 64);
            g.closePath();
            g.fillPath();

            g.generateTexture('menu_play_button_bg', 290, 95);
            g.destroy();
        }

        // ==========================================
        // 3. BACKGROUND SCENES (1920 x 1080)
        // ==========================================

        // 3.1 Smart Home Background
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Wall (Warm cream / pastel peach)
            g.fillStyle(0xfef3c7, 1);
            g.fillRect(0, 0, 1920, 680);

            // Wall molding / stripes
            g.lineStyle(6, 0xfde68a, 0.8);
            for (let x = 120; x < 1920; x += 180) {
                g.lineBetween(x, 0, x, 680);
            }

            // Window
            g.fillStyle(0xbae6fd, 1);
            g.fillRoundedRect(800, 120, 320, 280, 20);
            g.lineStyle(10, 0xffffff, 1);
            g.strokeRoundedRect(800, 120, 320, 280, 20);
            g.lineBetween(960, 120, 960, 400);
            g.lineBetween(800, 260, 1120, 260);

            // Sun & Clouds in window
            g.fillStyle(0xfde047, 1);
            g.fillCircle(870, 180, 35);
            g.fillStyle(0xffffff, 0.9);
            g.fillCircle(1020, 200, 25);
            g.fillCircle(1045, 200, 32);
            g.fillCircle(1075, 200, 24);

            // Baseboard
            g.fillStyle(0xffffff, 1);
            g.fillRect(0, 660, 1920, 30);
            g.lineStyle(4, 0xe2e8f0, 1);
            g.lineBetween(0, 660, 1920, 660);

            // Floor (Warm parquet wood)
            g.fillStyle(0xf59e0b, 1);
            g.fillRect(0, 690, 1920, 390);

            g.lineStyle(3, 0xd97706, 0.6);
            for (let y = 740; y < 1080; y += 60) {
                g.lineBetween(0, y, 1920, y);
            }

            // Large Oval Rug
            g.fillStyle(0x38bdf8, 0.85);
            g.fillEllipse(960, 910, 850, 240);
            g.lineStyle(8, 0xbae6fd, 1);
            g.strokeEllipse(960, 910, 850, 240);

            // Coffee Table (Center-Left)
            g.fillStyle(0x78350f, 0.2);
            g.fillEllipse(660, 710, 320, 70);
            g.fillStyle(0xd97706, 1);
            g.fillRoundedRect(500, 640, 320, 50, 20);
            g.lineStyle(6, 0x92400e, 1);
            g.strokeRoundedRect(500, 640, 320, 50, 20);
            // Table legs
            g.fillStyle(0x92400e, 1);
            g.fillRect(530, 680, 18, 50);
            g.fillRect(770, 680, 18, 50);

            // TV Console Table (Center-Right)
            g.fillStyle(0x1e293b, 1);
            g.fillRoundedRect(1240, 500, 280, 30, 10);
            g.fillStyle(0x475569, 1);
            g.fillRect(1270, 530, 16, 160);
            g.fillRect(1490, 530, 16, 160);

            g.generateTexture('bg_smart_home', 1920, 1080);
            g.destroy();
        }

        // 3.2 Smart School Background
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Classroom Wall (Mint / Soft Cyan)
            g.fillStyle(0xe0f2fe, 1);
            g.fillRect(0, 0, 1920, 680);

            // Educational Bunting / Banners at top
            const bannerColors = [0xf43f5e, 0xfbbf24, 0x34d399, 0x38bdf8, 0xa855f7];
            for (let i = 0; i < 20; i++) {
                const bx = i * 100 + 10;
                g.fillStyle(bannerColors[i % bannerColors.length], 1);
                g.beginPath();
                g.moveTo(bx, 0);
                g.lineTo(bx + 80, 0);
                g.lineTo(bx + 40, 55);
                g.closePath();
                g.fillPath();
            }

            // Doorway on right side
            g.fillStyle(0x0284c7, 1);
            g.fillRoundedRect(1600, 220, 260, 470, 16);
            g.fillStyle(0xbae6fd, 1);
            g.fillRoundedRect(1620, 250, 100, 180, 12);
            g.lineStyle(8, 0x0369a1, 1);
            g.strokeRoundedRect(1600, 220, 260, 470, 16);

            // Floor line
            g.fillStyle(0xffffff, 1);
            g.fillRect(0, 680, 1920, 24);

            // Classroom Floor (Polished linoleum tiles)
            g.fillStyle(0x67e8f9, 0.6);
            g.fillRect(0, 704, 1920, 376);

            g.lineStyle(3, 0x06b6d4, 0.4);
            for (let x = 0; x < 1920; x += 160) {
                g.lineBetween(x, 704, x, 1080);
            }
            for (let y = 740; y < 1080; y += 70) {
                g.lineBetween(0, y, 1920, y);
            }

            // Student Wooden Desk (Left)
            g.fillStyle(0x000000, 0.15);
            g.fillEllipse(560, 860, 340, 60);
            g.fillStyle(0xf59e0b, 1);
            g.fillRoundedRect(400, 760, 320, 50, 14);
            g.lineStyle(6, 0xb45309, 1);
            g.strokeRoundedRect(400, 760, 320, 50, 14);
            g.fillStyle(0x78350f, 1);
            g.fillRect(430, 800, 16, 90);
            g.fillRect(670, 800, 16, 90);

            // Teacher's Desk (Right)
            g.fillStyle(0x000000, 0.15);
            g.fillEllipse(1320, 820, 360, 60);
            g.fillStyle(0x38bdf8, 1);
            g.fillRoundedRect(1140, 730, 360, 50, 14);
            g.lineStyle(6, 0x0284c7, 1);
            g.strokeRoundedRect(1140, 730, 360, 50, 14);
            g.fillStyle(0x0369a1, 1);
            g.fillRect(1170, 770, 18, 90);
            g.fillRect(1450, 770, 18, 90);

            g.generateTexture('bg_smart_school', 1920, 1080);
            g.destroy();
        }

        // 3.3 Smart Hospital Background
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Hospital Room Wall (Soft sterile pastel blue)
            g.fillStyle(0xf0fdf4, 1);
            g.fillRect(0, 0, 1920, 680);

            // Decorative pastel mint cross striping
            g.fillStyle(0x86efac, 0.4);
            g.fillRect(0, 240, 1920, 60);

            // Cross emblems on wall
            for (let x = 160; x < 1920; x += 320) {
                g.fillStyle(0x22c55e, 0.6);
                g.fillRect(x - 8, 250, 16, 40);
                g.fillRect(x - 20, 262, 40, 16);
            }

            // Floor baseboard
            g.fillStyle(0xffffff, 1);
            g.fillRect(0, 670, 1920, 24);

            // Hospital Floor (Clean polished clinical tiles)
            g.fillStyle(0xccfbf1, 1);
            g.fillRect(0, 694, 1920, 386);

            g.lineStyle(2, 0x99f6e4, 0.7);
            for (let x = 0; x < 1920; x += 180) {
                g.lineBetween(x, 694, x, 1080);
            }
            for (let y = 740; y < 1080; y += 75) {
                g.lineBetween(0, y, 1920, y);
            }

            // Clinic counter desk
            g.fillStyle(0x000000, 0.15);
            g.fillEllipse(780, 800, 280, 50);
            g.fillStyle(0xffffff, 1);
            g.fillRoundedRect(640, 720, 280, 48, 12);
            g.lineStyle(5, 0x0284c7, 1);
            g.strokeRoundedRect(640, 720, 280, 48, 12);
            g.fillStyle(0x38bdf8, 1);
            g.fillRect(660, 760, 16, 70);
            g.fillRect(880, 760, 16, 70);

            g.generateTexture('bg_smart_hospital', 1920, 1080);
            g.destroy();
        }

        // 3.4 Smart City Background
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Sky (Sunny Sky Blue)
            g.fillStyle(0x7dd3fc, 1);
            g.fillRect(0, 0, 1920, 560);

            // Sun
            g.fillStyle(0xfef08a, 0.4);
            g.fillCircle(180, 120, 80);
            g.fillStyle(0xfde047, 1);
            g.fillCircle(180, 120, 50);

            // Fluffy Clouds
            g.fillStyle(0xffffff, 0.9);
            g.fillCircle(620, 140, 40); g.fillCircle(660, 130, 55); g.fillCircle(710, 140, 45);
            g.fillCircle(1320, 110, 35); g.fillCircle(1360, 100, 50); g.fillCircle(1410, 110, 40);

            // Modern City Skyline (Skyscrapers & Solar buildings)
            const skyline = [
                { x: 60, w: 140, h: 280, c: 0x93c5fd },
                { x: 220, w: 180, h: 360, c: 0x60a5fa },
                { x: 420, w: 150, h: 310, c: 0x3b82f6 },
                { x: 590, w: 200, h: 420, c: 0x2563eb },
                { x: 810, w: 170, h: 350, c: 0x60a5fa },
                { x: 1000, w: 210, h: 440, c: 0x1d4ed8 },
                { x: 1230, w: 160, h: 320, c: 0x3b82f6 },
                { x: 1410, w: 190, h: 380, c: 0x60a5fa },
                { x: 1620, w: 150, h: 300, c: 0x93c5fd },
                { x: 1790, w: 120, h: 260, c: 0xbfdbfe }
            ];

            skyline.forEach(b => {
                g.fillStyle(b.c, 0.9);
                g.fillRect(b.x, 560 - b.h, b.w, b.h);
                // Windows
                g.fillStyle(0xfef08a, 0.85);
                for (let wx = b.x + 18; wx < b.x + b.w - 18; wx += 28) {
                    for (let wy = 560 - b.h + 24; wy < 530; wy += 38) {
                        g.fillRect(wx, wy, 16, 20);
                    }
                }
            });

            // Sidewalk / Green Belt
            g.fillStyle(0x86efac, 1);
            g.fillRect(0, 560, 1920, 110);
            g.fillStyle(0xe2e8f0, 1);
            g.fillRect(0, 660, 1920, 40);

            // Asphalt Roadway
            g.fillStyle(0x334155, 1);
            g.fillRect(0, 700, 1920, 380);

            // Road Divider Dashed Lines (Bright Yellow)
            g.fillStyle(0xfde047, 1);
            for (let x = 40; x < 1920; x += 140) {
                g.fillRect(x, 880, 80, 16);
            }

            // Pedestrian Crosswalk (Zebra Stripes at Intersection)
            g.fillStyle(0xffffff, 0.95);
            for (let y = 720; y < 1060; y += 45) {
                g.fillRect(1080, y, 120, 24);
            }

            g.generateTexture('bg_smart_city', 1920, 1080);
            g.destroy();
        }

        // ==========================================
        // 4. 12 SMART TARGET OBJECTS & ACTIVE STATES
        // ==========================================

        // 4.1 Smart Speaker (Idle & Active)
        {
            const drawSpeaker = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillEllipse(70, 155, 90, 20);

                // Body
                g.fillStyle(0x38bdf8, 1);
                g.fillRoundedRect(30, 25, 80, 125, 22);
                g.lineStyle(5, 0x0284c7, 1);
                g.strokeRoundedRect(30, 25, 80, 125, 22);

                // Speaker Grill
                g.fillStyle(0x0284c7, 1);
                g.fillRoundedRect(42, 60, 56, 75, 12);
                for (let y = 70; y <= 125; y += 12) {
                    g.fillStyle(0xbae6fd, 1);
                    g.fillRoundedRect(48, y, 44, 4, 2);
                }

                // Glowing AI Light Ring
                g.fillStyle(active ? 0x00f5ff : 0xfde047, 1);
                g.fillCircle(70, 32, 14);
                g.lineStyle(3, 0xffffff, 1);
                g.strokeCircle(70, 32, 14);
                g.fillStyle(0xffffff, 1);
                g.fillCircle(70, 32, 5);

                if (active) {
                    // Sound waves
                    g.lineStyle(4, 0x38bdf8, 1);
                    g.beginPath();
                    g.arc(120, 85, 18, -Math.PI / 3, Math.PI / 3, false);
                    g.strokePath();
                    g.beginPath();
                    g.arc(130, 85, 28, -Math.PI / 3, Math.PI / 3, false);
                    g.strokePath();
                }

                g.generateTexture(key, 140, 170);
                g.destroy();
            };
            drawSpeaker('item_smart_speaker', false);
            drawSpeaker('item_smart_speaker_active', true);
        }

        // 4.2 Robot Vacuum (Idle & Active)
        {
            const drawVacuum = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillEllipse(100, 120, 150, 24);

                // Disc Body
                g.fillStyle(0x4fc3f7, 1);
                g.fillCircle(100, 70, 60);
                g.lineStyle(6, 0x0284c7, 1);
                g.strokeCircle(100, 70, 60);

                // Front Bumper Arc
                g.fillStyle(0x0284c7, 1);
                g.beginPath();
                g.arc(100, 70, 56, -Math.PI * 0.8, -Math.PI * 0.2, false);
                g.lineTo(100, 70);
                g.closePath();
                g.fillPath();

                // Lidar Sensor Turret
                g.fillStyle(0xffffff, 1);
                g.fillCircle(100, 65, 24);
                g.lineStyle(4, 0x0284c7, 1);
                g.strokeCircle(100, 65, 24);

                // Eye / Laser Sensor
                g.fillStyle(active ? 0x22c55e : 0x38bdf8, 1);
                g.fillCircle(100, 65, 10);

                // Power button
                g.fillStyle(0xfde047, 1);
                g.fillCircle(100, 105, 8);

                if (active) {
                    // Sweeper sparkles & motion dust
                    g.fillStyle(0xbae6fd, 0.8);
                    g.fillCircle(35, 110, 6);
                    g.fillCircle(165, 110, 6);
                    g.fillCircle(25, 95, 4);
                }

                g.generateTexture(key, 200, 140);
                g.destroy();
            };
            drawVacuum('item_robot_vacuum', false);
            drawVacuum('item_robot_vacuum_active', true);
        }

        // 4.3 Smart TV (Idle & Active)
        {
            const drawTV = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.25);
                g.fillRoundedRect(14, 18, 252, 164, 16);

                // Frame
                g.fillStyle(0x0f172a, 1);
                g.fillRoundedRect(8, 8, 252, 164, 16);
                g.lineStyle(6, 0x334155, 1);
                g.strokeRoundedRect(8, 8, 252, 164, 16);

                // Screen
                g.fillStyle(active ? 0x38bdf8 : 0x0284c7, 1);
                g.fillRoundedRect(18, 18, 232, 144, 10);

                if (active) {
                    // AI Cartoon recommendations on screen
                    g.fillStyle(0xfde047, 1);
                    g.fillRoundedRect(30, 35, 60, 75, 8);
                    g.fillStyle(0x4ade80, 1);
                    g.fillRoundedRect(100, 35, 60, 75, 8);
                    g.fillStyle(0xf472b6, 1);
                    g.fillRoundedRect(170, 35, 60, 75, 8);

                    // Play icon in center
                    g.fillStyle(0xffffff, 1);
                    g.fillCircle(130, 130, 14);
                } else {
                    g.fillStyle(0xbae6fd, 0.4);
                    g.fillCircle(130, 90, 24);
                }

                // TV Legs
                g.fillStyle(0x475569, 1);
                g.fillRect(60, 172, 12, 18);
                g.fillRect(196, 172, 12, 18);

                g.generateTexture(key, 280, 200);
                g.destroy();
            };
            drawTV('item_smart_tv', false);
            drawTV('item_smart_tv_active', true);
        }

        // 4.4 Interactive Smartboard (Idle & Active)
        {
            const drawBoard = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillRoundedRect(14, 18, 352, 204, 16);

                // White Board Frame
                g.fillStyle(0x334155, 1);
                g.fillRoundedRect(8, 8, 352, 204, 16);
                g.lineStyle(6, 0x0284c7, 1);
                g.strokeRoundedRect(8, 8, 352, 204, 16);

                // Screen Display
                g.fillStyle(active ? 0x0c4a6e : 0x0369a1, 1);
                g.fillRoundedRect(18, 18, 332, 184, 10);

                if (active) {
                    // Smart drawings: Glowing Star, Triangle, and Alphabet
                    g.fillStyle(0xfde047, 1);
                    g.fillCircle(80, 80, 24);
                    g.fillStyle(0x4ade80, 1);
                    g.fillRoundedRect(150, 55, 50, 50, 10);
                    g.fillStyle(0xf472b6, 1);
                    g.fillCircle(250, 80, 24);

                    // Touch Stylus pen
                    g.lineStyle(5, 0x00f5ff, 1);
                    g.lineBetween(60, 140, 280, 140);
                } else {
                    g.fillStyle(0x38bdf8, 0.6);
                    g.fillRoundedRect(130, 85, 80, 40, 8);
                }

                g.generateTexture(key, 380, 240);
                g.destroy();
            };
            drawBoard('item_smartboard', false);
            drawBoard('item_smartboard_active', true);
        }

        // 4.5 Tablet Learning Assistant (Idle & Active)
        {
            const drawTablet = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillRoundedRect(12, 14, 146, 112, 16);

                // Tablet Case (Bright Cyan)
                g.fillStyle(0x0284c7, 1);
                g.fillRoundedRect(8, 8, 146, 112, 16);
                g.lineStyle(5, 0x0369a1, 1);
                g.strokeRoundedRect(8, 8, 146, 112, 16);

                // Screen
                g.fillStyle(active ? 0xffffff : 0xbae6fd, 1);
                g.fillRoundedRect(18, 18, 126, 92, 10);

                if (active) {
                    // Learning puzzle & happy smiley face
                    g.fillStyle(0xf59e0b, 1);
                    g.fillCircle(80, 60, 22);
                    g.fillStyle(0x1e293b, 1);
                    g.fillCircle(73, 55, 3);
                    g.fillCircle(87, 55, 3);
                    g.lineStyle(3, 0x1e293b, 1);
                    g.beginPath();
                    g.arc(80, 64, 8, 0.2, Math.PI - 0.2, false);
                    g.strokePath();

                    g.fillStyle(0x22c55e, 1);
                    g.fillCircle(36, 40, 8);
                    g.fillCircle(124, 40, 8);
                }

                g.generateTexture(key, 170, 140);
                g.destroy();
            };
            drawTablet('item_tablet_learning', false);
            drawTablet('item_tablet_learning_active', true);
        }

        // 4.6 Face-Scan Door Lock (Idle & Active)
        {
            const drawLock = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillRoundedRect(12, 16, 96, 148, 16);

                // Lock Body
                g.fillStyle(0x1e293b, 1);
                g.fillRoundedRect(8, 8, 96, 148, 16);
                g.lineStyle(5, 0x0284c7, 1);
                g.strokeRoundedRect(8, 8, 96, 148, 16);

                // Camera Scanner Lens at top
                g.fillStyle(0x0284c7, 1);
                g.fillCircle(56, 36, 16);
                g.fillStyle(active ? 0x22c55e : 0x38bdf8, 1);
                g.fillCircle(56, 36, 8);

                // Scan Screen Area
                g.fillStyle(0x0f172a, 1);
                g.fillRoundedRect(18, 64, 76, 76, 10);

                // Face outline on screen
                g.lineStyle(3, active ? 0x22c55e : 0x38bdf8, 1);
                g.strokeCircle(56, 100, 20);

                if (active) {
                    // Green laser scan line
                    g.lineStyle(4, 0x4ade80, 1);
                    g.lineBetween(22, 100, 90, 100);
                }

                g.generateTexture(key, 120, 180);
                g.destroy();
            };
            drawLock('item_face_door_lock', false);
            drawLock('item_face_door_lock_active', true);
        }

        // 4.7 Health Monitor AI (Idle & Active)
        {
            const drawMonitor = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillRoundedRect(12, 16, 176, 218, 20);

                // Monitor Casing
                g.fillStyle(0xf8fafc, 1);
                g.fillRoundedRect(8, 8, 176, 218, 20);
                g.lineStyle(6, 0x0284c7, 1);
                g.strokeRoundedRect(8, 8, 176, 218, 20);

                // Screen (Dark Blue)
                g.fillStyle(0x0c4a6e, 1);
                g.fillRoundedRect(18, 18, 156, 140, 12);

                // Heart Beat Wave (ECG)
                g.lineStyle(4, active ? 0x22c55e : 0x38bdf8, 1);
                g.beginPath();
                g.moveTo(24, 88);
                g.lineTo(55, 88);
                g.lineTo(70, 48);
                g.lineTo(85, 120);
                g.lineTo(100, 75);
                g.lineTo(115, 88);
                g.lineTo(164, 88);
                g.strokePath();

                // Heart Icon
                g.fillStyle(0xf43f5e, 1);
                g.fillCircle(145, 42, 8);
                g.fillCircle(157, 42, 8);
                g.beginPath();
                g.moveTo(137, 44);
                g.lineTo(165, 44);
                g.lineTo(151, 58);
                g.closePath();
                g.fillPath();

                // Bottom buttons
                g.fillStyle(0x38bdf8, 1);
                g.fillCircle(45, 185, 10);
                g.fillCircle(85, 185, 10);
                g.fillCircle(125, 185, 10);

                g.generateTexture(key, 200, 250);
                g.destroy();
            };
            drawMonitor('item_health_monitor', false);
            drawMonitor('item_health_monitor_active', true);
        }

        // 4.8 Medicine Delivery Robot (Idle & Active)
        {
            const drawMedRobot = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillEllipse(105, 245, 150, 24);

                // Robot Body
                g.fillStyle(0xffffff, 1);
                g.fillRoundedRect(35, 45, 140, 175, 28);
                g.lineStyle(6, 0x0284c7, 1);
                g.strokeRoundedRect(35, 45, 140, 175, 28);

                // Head Display
                g.fillStyle(0x0c4a6e, 1);
                g.fillRoundedRect(50, 60, 110, 55, 16);

                // Friendly Robot Eyes (^ ^ or O O)
                g.fillStyle(active ? 0x22c55e : 0x00f5ff, 1);
                g.fillCircle(80, 88, 10);
                g.fillCircle(130, 88, 10);

                // Medicine Cargo Drawer
                g.fillStyle(0x38bdf8, 1);
                g.fillRoundedRect(50, 130, 110, 75, 12);
                g.lineStyle(4, 0x0284c7, 1);
                g.strokeRoundedRect(50, 130, 110, 75, 12);

                // Red Medical Cross on Drawer
                g.fillStyle(0xef4444, 1);
                g.fillRect(96, 145, 18, 45);
                g.fillRect(82, 158, 46, 18);

                // Wheels
                g.fillStyle(0x1e293b, 1);
                g.fillCircle(65, 230, 14);
                g.fillCircle(145, 230, 14);

                g.generateTexture(key, 210, 270);
                g.destroy();
            };
            drawMedRobot('item_medicine_robot', false);
            drawMedRobot('item_medicine_robot_active', true);
        }

        // 4.9 Smart X-Ray Screen (Idle & Active)
        {
            const drawXray = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.25);
                g.fillRoundedRect(14, 16, 252, 188, 16);

                // Frame
                g.fillStyle(0x334155, 1);
                g.fillRoundedRect(8, 8, 252, 188, 16);
                g.lineStyle(6, 0x0284c7, 1);
                g.strokeRoundedRect(8, 8, 252, 188, 16);

                // X-Ray Viewer Screen (Dark Slate)
                g.fillStyle(active ? 0x0f172a : 0x1e293b, 1);
                g.fillRoundedRect(18, 18, 232, 168, 10);

                // Bone Scan Silhouette (Hand / Bones)
                g.fillStyle(active ? 0xbae6fd : 0x64748b, 1);
                // Palm & Fingers
                g.fillRoundedRect(110, 100, 50, 60, 12);
                g.fillRoundedRect(95, 60, 14, 50, 7);
                g.fillRoundedRect(115, 45, 14, 60, 7);
                g.fillRoundedRect(135, 40, 14, 65, 7);
                g.fillRoundedRect(155, 50, 14, 55, 7);

                if (active) {
                    // AI highlight marker circle (Green detection box)
                    g.lineStyle(4, 0x22c55e, 1);
                    g.strokeCircle(142, 70, 20);
                }

                g.generateTexture(key, 280, 220);
                g.destroy();
            };
            drawXray('item_smart_xray', false);
            drawXray('item_smart_xray_active', true);
        }

        // 4.10 Self-Driving Bus (Idle & Active)
        {
            const drawBus = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillEllipse(190, 205, 310, 28);

                // Bus Body (Bright Yellow & Blue)
                g.fillStyle(0x38bdf8, 1);
                g.fillRoundedRect(30, 45, 320, 140, 28);
                g.lineStyle(6, 0x0284c7, 1);
                g.strokeRoundedRect(30, 45, 320, 140, 28);

                // Windows
                g.fillStyle(0xffffff, 0.95);
                g.fillRoundedRect(50, 65, 60, 45, 8);
                g.fillRoundedRect(125, 65, 60, 45, 8);
                g.fillRoundedRect(200, 65, 60, 45, 8);
                g.fillRoundedRect(275, 65, 60, 45, 8);

                // Rooftop AI Sensor Lidar (Spinning Dome)
                g.fillStyle(active ? 0x00f5ff : 0xfde047, 1);
                g.fillCircle(190, 30, 18);
                g.lineStyle(4, 0xd97706, 1);
                g.strokeCircle(190, 30, 18);

                // Headlights
                g.fillStyle(0xfde047, 1);
                g.fillCircle(335, 140, 12);

                // Wheels
                g.fillStyle(0x0f172a, 1);
                g.fillCircle(90, 185, 26);
                g.fillCircle(285, 185, 26);
                g.fillStyle(0x94a3b8, 1);
                g.fillCircle(90, 185, 10);
                g.fillCircle(285, 185, 10);

                if (active) {
                    // Sensor radar beams in front
                    g.lineStyle(4, 0x38bdf8, 0.8);
                    g.beginPath();
                    g.arc(335, 140, 24, -Math.PI / 4, Math.PI / 4, false);
                    g.strokePath();
                }

                g.generateTexture(key, 380, 230);
                g.destroy();
            };
            drawBus('item_self_driving_bus', false);
            drawBus('item_self_driving_bus_active', true);
        }

        // 4.11 Smart Traffic Lights (Idle & Active)
        {
            const drawTraffic = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillRoundedRect(35, 20, 60, 260, 20);

                // Light Housing
                g.fillStyle(0x1e293b, 1);
                g.fillRoundedRect(25, 10, 80, 270, 22);
                g.lineStyle(6, 0x0f172a, 1);
                g.strokeRoundedRect(25, 10, 80, 270, 22);

                // Red, Yellow, Green bulbs
                g.fillStyle(0xef4444, active ? 0.3 : 1);
                g.fillCircle(65, 60, 24);
                g.fillStyle(0xfde047, active ? 0.3 : 0.4);
                g.fillCircle(65, 135, 24);
                g.fillStyle(0x22c55e, active ? 1 : 0.3);
                g.fillCircle(65, 210, 24);

                // Rooftop AI Camera / Radar
                g.fillStyle(0x38bdf8, 1);
                g.fillCircle(65, 8, 12);

                if (active) {
                    // Green signal waves
                    g.lineStyle(4, 0x22c55e, 0.8);
                    g.beginPath();
                    g.arc(65, 210, 36, -Math.PI / 3, Math.PI / 3, false);
                    g.strokePath();
                }

                g.generateTexture(key, 130, 300);
                g.destroy();
            };
            drawTraffic('item_smart_traffic_lights', false);
            drawTraffic('item_smart_traffic_lights_active', true);
        }

        // 4.12 GPS Navigation Car (Idle & Active)
        {
            const drawCar = (key: string, active: boolean) => {
                const g = scene.make.graphics({ x: 0, y: 0 });
                g.fillStyle(0x000000, 0.2);
                g.fillEllipse(160, 175, 260, 26);

                // Car Body (Bright Red/Magenta or Blue)
                g.fillStyle(0xef4444, 1);
                g.fillRoundedRect(40, 85, 240, 75, 22);
                g.lineStyle(6, 0x991b1b, 1);
                g.strokeRoundedRect(40, 85, 240, 75, 22);

                // Cabin / Windows
                g.fillStyle(0xbae6fd, 1);
                g.fillRoundedRect(85, 45, 150, 50, 16);
                g.lineStyle(5, 0x0284c7, 1);
                g.strokeRoundedRect(85, 45, 150, 50, 16);

                // GPS Rooftop Antenna / Satellite Receiver
                g.fillStyle(active ? 0x00f5ff : 0xfde047, 1);
                g.fillCircle(160, 35, 14);
                g.lineStyle(4, 0xd97706, 1);
                g.strokeCircle(160, 35, 14);

                // Wheels
                g.fillStyle(0x0f172a, 1);
                g.fillCircle(95, 160, 22);
                g.fillCircle(225, 160, 22);
                g.fillStyle(0x94a3b8, 1);
                g.fillCircle(95, 160, 9);
                g.fillCircle(225, 160, 9);

                if (active) {
                    // Holographic Navigation Arrow
                    g.fillStyle(0x22c55e, 1);
                    g.beginPath();
                    g.moveTo(270, 40);
                    g.lineTo(295, 60);
                    g.lineTo(280, 60);
                    g.lineTo(280, 90);
                    g.lineTo(260, 90);
                    g.lineTo(260, 60);
                    g.lineTo(245, 60);
                    g.closePath();
                    g.fillPath();
                }

                g.generateTexture(key, 320, 200);
                g.destroy();
            };
            drawCar('item_gps_car', false);
            drawCar('item_gps_car_active', true);
        }

        // ==========================================
        // 5. INTERACTIVE ORDINARY PROPS
        // ==========================================

        // Home Armchair
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xf59e0b, 1);
            g.fillRoundedRect(30, 40, 200, 200, 32);
            g.fillStyle(0xd97706, 1);
            g.fillRoundedRect(50, 120, 160, 110, 20);
            g.lineStyle(6, 0x92400e, 1);
            g.strokeRoundedRect(30, 40, 200, 200, 32);
            // Wooden legs
            g.fillStyle(0x78350f, 1);
            g.fillRect(50, 230, 18, 40);
            g.fillRect(190, 230, 18, 40);
            g.generateTexture('prop_home_armchair', 260, 280);
            g.destroy();
        }

        // Home Lamp
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Shade
            g.fillStyle(0xfde047, 1);
            g.beginPath();
            g.moveTo(35, 30); g.lineTo(75, 30); g.lineTo(95, 85); g.lineTo(15, 85);
            g.closePath();
            g.fillPath();
            g.lineStyle(5, 0xd97706, 1);
            g.strokePath();
            // Stand
            g.lineStyle(6, 0x475569, 1);
            g.lineBetween(55, 85, 55, 145);
            g.fillStyle(0x334155, 1);
            g.fillRoundedRect(25, 145, 60, 14, 6);
            g.generateTexture('prop_home_lamp', 110, 170);
            g.destroy();
        }

        // Home Teddy
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xd97706, 1);
            g.fillCircle(55, 60, 36);
            g.fillCircle(30, 35, 14);
            g.fillCircle(80, 35, 14);
            g.fillStyle(0xfef3c7, 1);
            g.fillCircle(55, 68, 16);
            g.fillStyle(0x78350f, 1);
            g.fillCircle(45, 55, 4);
            g.fillCircle(65, 55, 4);
            g.fillCircle(55, 65, 4);
            g.generateTexture('prop_home_teddy', 110, 120);
            g.destroy();
        }

        // Home Fruit Bowl
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xef4444, 1);
            g.fillCircle(35, 30, 16);
            g.fillStyle(0xf97316, 1);
            g.fillCircle(65, 30, 16);
            g.fillStyle(0x84cc16, 1);
            g.fillCircle(50, 20, 14);
            // Bowl
            g.fillStyle(0xffffff, 1);
            g.beginPath();
            g.arc(50, 35, 40, 0, Math.PI, false);
            g.closePath();
            g.fillPath();
            g.lineStyle(4, 0x38bdf8, 1);
            g.strokePath();
            g.generateTexture('prop_home_fruit', 100, 70);
            g.destroy();
        }

        // Home Bookshelf
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xb45309, 1);
            g.fillRoundedRect(10, 10, 180, 420, 16);
            g.lineStyle(6, 0x78350f, 1);
            g.strokeRoundedRect(10, 10, 180, 420, 16);
            // Shelves & colorful books
            const bcolors = [0xef4444, 0x3b82f6, 0x22c55e, 0xf59e0b, 0xa855f7];
            for (let y = 100; y < 400; y += 95) {
                g.fillStyle(0x78350f, 1);
                g.fillRect(15, y, 170, 12);
                for (let x = 25; x < 160; x += 26) {
                    g.fillStyle(bcolors[(x + y) % bcolors.length], 1);
                    g.fillRoundedRect(x, y - 60, 20, 60, 4);
                }
            }
            g.generateTexture('prop_home_bookshelf', 200, 440);
            g.destroy();
        }

        // School Backpack
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xec4899, 1);
            g.fillRoundedRect(15, 25, 100, 120, 24);
            g.lineStyle(5, 0xbe185d, 1);
            g.strokeRoundedRect(15, 25, 100, 120, 24);
            g.fillStyle(0xf472b6, 1);
            g.fillRoundedRect(28, 75, 74, 55, 12);
            g.generateTexture('prop_school_backpack', 130, 160);
            g.destroy();
        }

        // School Globe
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x38bdf8, 1);
            g.fillCircle(65, 65, 45);
            g.fillStyle(0x4ade80, 1);
            g.fillCircle(55, 55, 18);
            g.fillCircle(75, 80, 22);
            // Stand
            g.lineStyle(6, 0xf59e0b, 1);
            g.beginPath();
            g.arc(65, 65, 54, -Math.PI * 0.4, Math.PI * 0.7, false);
            g.strokePath();
            g.lineBetween(65, 120, 65, 145);
            g.fillStyle(0xd97706, 1);
            g.fillRoundedRect(35, 145, 60, 12, 6);
            g.generateTexture('prop_school_globe', 130, 160);
            g.destroy();
        }

        // School Pencils
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xfde047, 1);
            g.fillRect(15, 10, 12, 50);
            g.fillStyle(0xef4444, 1);
            g.fillRect(35, 5, 12, 55);
            g.fillStyle(0x3b82f6, 1);
            g.fillRect(55, 12, 12, 48);
            // Cup
            g.fillStyle(0x38bdf8, 1);
            g.fillRoundedRect(10, 40, 60, 45, 10);
            g.generateTexture('prop_school_pencils', 80, 90);
            g.destroy();
        }

        // School Wall Clock
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xffffff, 1);
            g.fillCircle(55, 55, 45);
            g.lineStyle(6, 0xef4444, 1);
            g.strokeCircle(55, 55, 45);
            g.fillStyle(0x1e293b, 1);
            g.fillCircle(55, 55, 5);
            g.lineStyle(4, 0x1e293b, 1);
            g.lineBetween(55, 55, 55, 28);
            g.lineBetween(55, 55, 75, 55);
            g.generateTexture('prop_school_clock', 110, 110);
            g.destroy();
        }

        // School Desk Plant
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x22c55e, 1);
            g.fillCircle(50, 45, 24);
            g.fillCircle(35, 30, 16);
            g.fillCircle(65, 30, 16);
            // Pot
            g.fillStyle(0xf97316, 1);
            g.fillRoundedRect(25, 65, 50, 45, 8);
            g.generateTexture('prop_school_plant', 100, 120);
            g.destroy();
        }

        // Hospital Stethoscope
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.lineStyle(6, 0x334155, 1);
            g.beginPath();
            g.arc(60, 50, 36, 0, Math.PI, false);
            g.strokePath();
            g.fillStyle(0x94a3b8, 1);
            g.fillCircle(60, 92, 14);
            g.generateTexture('prop_hosp_stethoscope', 120, 110);
            g.destroy();
        }

        // Hospital Bed
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xffffff, 1);
            g.fillRoundedRect(20, 60, 240, 110, 18);
            g.lineStyle(6, 0x0284c7, 1);
            g.strokeRoundedRect(20, 60, 240, 110, 18);
            g.fillStyle(0x38bdf8, 1);
            g.fillRoundedRect(35, 75, 60, 40, 10);
            // Legs
            g.fillStyle(0x64748b, 1);
            g.fillRect(35, 170, 14, 50);
            g.fillRect(230, 170, 14, 50);
            g.generateTexture('prop_hosp_bed', 280, 240);
            g.destroy();
        }

        // Hospital Clipboard
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xd97706, 1);
            g.fillRoundedRect(8, 8, 64, 84, 8);
            g.fillStyle(0xffffff, 1);
            g.fillRect(14, 20, 52, 66);
            g.fillStyle(0x64748b, 1);
            g.fillRoundedRect(24, 4, 32, 12, 4);
            g.generateTexture('prop_hosp_clipboard', 80, 100);
            g.destroy();
        }

        // Hospital First Aid Kit
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xffffff, 1);
            g.fillRoundedRect(15, 20, 110, 80, 14);
            g.lineStyle(5, 0xef4444, 1);
            g.strokeRoundedRect(15, 20, 110, 80, 14);
            g.fillStyle(0xef4444, 1);
            g.fillRect(60, 38, 20, 44);
            g.fillRect(48, 50, 44, 20);
            g.generateTexture('prop_hosp_firstaid', 140, 120);
            g.destroy();
        }

        // Hospital Water Cooler
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x38bdf8, 0.85);
            g.fillCircle(55, 60, 35);
            g.fillStyle(0xffffff, 1);
            g.fillRoundedRect(20, 95, 70, 130, 12);
            g.lineStyle(4, 0x0284c7, 1);
            g.strokeRoundedRect(20, 95, 70, 130, 12);
            g.generateTexture('prop_hosp_water', 110, 240);
            g.destroy();
        }

        // City Park Bench
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xd97706, 1);
            g.fillRoundedRect(15, 30, 150, 50, 10);
            g.lineStyle(5, 0x78350f, 1);
            g.strokeRoundedRect(15, 30, 150, 50, 10);
            g.fillStyle(0x1e293b, 1);
            g.fillRect(35, 80, 12, 40);
            g.fillRect(135, 80, 12, 40);
            g.generateTexture('prop_city_bench', 180, 130);
            g.destroy();
        }

        // City Tree
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x78350f, 1);
            g.fillRect(75, 160, 30, 130);
            g.fillStyle(0x22c55e, 1);
            g.fillCircle(90, 110, 75);
            g.fillStyle(0x16a34a, 1);
            g.fillCircle(65, 80, 50);
            g.fillCircle(115, 80, 50);
            g.generateTexture('prop_city_tree', 180, 300);
            g.destroy();
        }

        // City Fire Hydrant
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0xfde047, 1);
            g.fillRoundedRect(20, 25, 50, 85, 14);
            g.lineStyle(4, 0xd97706, 1);
            g.strokeRoundedRect(20, 25, 50, 85, 14);
            g.fillStyle(0xd97706, 1);
            g.fillCircle(45, 20, 15);
            g.generateTexture('prop_city_hydrant', 90, 120);
            g.destroy();
        }

        // City Bicycle
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.lineStyle(6, 0x1e293b, 1);
            g.strokeCircle(35, 75, 25);
            g.strokeCircle(105, 75, 25);
            g.lineStyle(5, 0x0284c7, 1);
            g.lineBetween(35, 75, 70, 75);
            g.lineBetween(70, 75, 55, 35);
            g.lineBetween(55, 35, 95, 35);
            g.lineBetween(95, 35, 105, 75);
            g.generateTexture('prop_city_bicycle', 140, 120);
            g.destroy();
        }

        // City Trash / Recycle Bin
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x10b981, 1);
            g.fillRoundedRect(15, 25, 60, 95, 10);
            g.lineStyle(4, 0x047857, 1);
            g.strokeRoundedRect(15, 25, 60, 95, 10);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(45, 65, 12);
            g.generateTexture('prop_city_trash', 90, 130);
            g.destroy();
        }

        // ==========================================
        // 6. DETECTIVE CHIMPU POSES (Size: 220 x 240)
        // ==========================================

        const drawChimpu = (key: string, pose: 'idle' | 'cheer' | 'puzzled' | 'dance') => {
            const g = scene.make.graphics({ x: 0, y: 0 });
            g.fillStyle(0x000000, 0.2);
            g.fillEllipse(110, 225, 100, 18);

            // Chimpu Body (Detective Coat / Vest)
            g.fillStyle(0x38bdf8, 1);
            g.fillRoundedRect(70, 140, 80, 75, 18);
            g.lineStyle(5, 0x0284c7, 1);
            g.strokeRoundedRect(70, 140, 80, 75, 18);

            // Golden Detective Badge on Coat
            g.fillStyle(0xfde047, 1);
            g.fillCircle(90, 160, 10);
            g.lineStyle(2, 0xd97706, 1);
            g.strokeCircle(90, 160, 10);

            // Monkey Ears
            g.fillStyle(0xb45309, 1);
            g.fillCircle(50, 105, 24);
            g.fillCircle(170, 105, 24);
            g.lineStyle(4, 0x78350f, 1);
            g.strokeCircle(50, 105, 24);
            g.strokeCircle(170, 105, 24);
            g.fillStyle(0xfef3c7, 1);
            g.fillCircle(50, 105, 12);
            g.fillCircle(170, 105, 12);

            // Head
            g.fillStyle(0xb45309, 1);
            g.fillCircle(110, 110, 52);
            g.lineStyle(5, 0x78350f, 1);
            g.strokeCircle(110, 110, 52);

            // Face Area (Cream)
            g.fillStyle(0xfef3c7, 1);
            g.fillCircle(92, 105, 26);
            g.fillCircle(128, 105, 26);
            g.fillCircle(110, 125, 32);

            // Eyes & Expression
            if (pose === 'cheer' || pose === 'dance') {
                // Happy Arc Eyes (^ ^)
                g.lineStyle(4, 0x1e293b, 1);
                g.beginPath();
                g.arc(95, 105, 8, Math.PI, 0, false);
                g.arc(125, 105, 8, Math.PI, 0, false);
                g.strokePath();
                // Big Happy Smile
                g.fillStyle(0xf43f5e, 1);
                g.beginPath();
                g.arc(110, 122, 14, 0, Math.PI, false);
                g.closePath();
                g.fillPath();
            } else if (pose === 'puzzled') {
                // Puzzled Eyes (one big, one small)
                g.fillStyle(0x1e293b, 1);
                g.fillCircle(95, 105, 9);
                g.fillCircle(125, 105, 6);
                g.lineStyle(3, 0x78350f, 1);
                g.beginPath();
                g.arc(110, 130, 8, Math.PI * 0.2, Math.PI * 0.8, false);
                g.strokePath();
            } else {
                // Cute Big Eyes
                g.fillStyle(0x1e293b, 1);
                g.fillCircle(95, 105, 9);
                g.fillCircle(125, 105, 9);
                g.fillStyle(0xffffff, 1);
                g.fillCircle(92, 102, 4);
                g.fillCircle(122, 102, 4);
                // Friendly Smile
                g.lineStyle(3, 0x78350f, 1);
                g.beginPath();
                g.arc(110, 122, 10, 0.2, Math.PI - 0.2, false);
                g.strokePath();
            }

            // Rosy Cheeks
            g.fillStyle(0xf472b6, 0.8);
            g.fillCircle(78, 122, 8);
            g.fillCircle(142, 122, 8);

            // Detective Hat (Deerstalker / Fedora with plaid band)
            g.fillStyle(0x78350f, 1);
            g.fillRoundedRect(65, 45, 90, 35, 14);
            g.fillRoundedRect(50, 72, 120, 14, 6);
            g.lineStyle(4, 0x451a03, 1);
            g.strokeRoundedRect(65, 45, 90, 35, 14);
            g.strokeRoundedRect(50, 72, 120, 14, 6);
            // Hat Band
            g.fillStyle(0xfde047, 1);
            g.fillRect(66, 64, 88, 8);

            // Detective Magnifying Glass held in hand
            g.lineStyle(6, 0x78350f, 1);
            if (pose === 'dance') {
                g.lineBetween(150, 150, 175, 90);
                g.fillStyle(0xfde047, 1);
                g.fillCircle(185, 80, 24);
                g.fillStyle(0x38bdf8, 0.5);
                g.fillCircle(185, 80, 18);
            } else {
                g.lineBetween(140, 160, 165, 130);
                g.fillStyle(0xfde047, 1);
                g.fillCircle(175, 120, 24);
                g.fillStyle(0x38bdf8, 0.5);
                g.fillCircle(175, 120, 18);
            }

            g.generateTexture(key, 220, 240);
            g.destroy();
        };

        drawChimpu('chimpu_detective_idle', 'idle');
        drawChimpu('chimpu_detective_cheer', 'cheer');
        drawChimpu('chimpu_detective_puzzled', 'puzzled');
        drawChimpu('chimpu_detective_dance', 'dance');

        // ==========================================
        // 7. DETECTIVE STAMPS & MASTER BADGE
        // ==========================================
        const drawStamp = (key: string, title: string, color: number) => {
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Outer stamp circle with scalloped edge
            g.fillStyle(color, 1);
            g.fillCircle(120, 120, 110);
            g.lineStyle(8, 0xffffff, 1);
            g.strokeCircle(120, 120, 100);

            // Inner circle
            g.fillStyle(0xffffff, 0.95);
            g.fillCircle(120, 120, 85);
            g.lineStyle(4, color, 1);
            g.strokeCircle(120, 120, 85);

            // Star icon
            g.fillStyle(color, 1);
            g.fillCircle(120, 85, 26);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(120, 85, 12);

            const txt = scene.add.text(120, 135, title.toUpperCase(), {
                fontFamily: 'Arial Black',
                fontSize: '18px',
                color: '#0f172a',
                align: 'center'
            }).setOrigin(0.5);

            g.generateTexture(key, 240, 240);
            txt.destroy();
            g.destroy();
        };

        drawStamp('stamp_home_detective', 'Home\nDetective', 0x38bdf8);
        drawStamp('stamp_school_detective', 'School\nDetective', 0x4ade80);
        drawStamp('stamp_hospital_detective', 'Hospital\nDetective', 0xf43f5e);
        drawStamp('stamp_city_detective', 'City\nDetective', 0xfbbf24);

        // Master AI Detective Badge
        {
            const g = scene.make.graphics({ x: 0, y: 0 });
            // Ribbon tails
            g.fillStyle(0x2563eb, 1);
            g.beginPath();
            g.moveTo(110, 180); g.lineTo(70, 270); g.lineTo(110, 250); g.lineTo(150, 270); g.lineTo(110, 180);
            g.closePath();
            g.fillPath();

            // Gold Medal
            g.fillStyle(0xfde047, 1);
            g.fillCircle(110, 110, 95);
            g.lineStyle(8, 0xd97706, 1);
            g.strokeCircle(110, 110, 95);

            g.fillStyle(0xfef08a, 1);
            g.fillCircle(110, 110, 78);
            g.lineStyle(4, 0xd97706, 1);
            g.strokeCircle(110, 110, 78);

            // Center AI Star / Crown
            g.fillStyle(0x0284c7, 1);
            g.fillCircle(110, 110, 36);
            g.fillStyle(0xffffff, 1);
            g.fillCircle(110, 110, 16);

            g.generateTexture('badge_master_detective', 220, 280);
            g.destroy();
        }
    }
}
