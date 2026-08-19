import { Scene } from 'phaser';
import { AssetManager } from '../utils/AssetManager';
import { APIService, APIEvents } from '../services/APIService';
import { GameDataManager } from '../services/GameDataManager';
import { AudioManager } from '../services/AudioManager';
import { APIConfig } from '../utils/Constants';

export class Preloader extends Scene {
    private apiReady: boolean = false;
    private assetsLoaded: boolean = false;

    constructor() {
        super('Preloader');
    }

    init() {
        const { width, height } = this.scale;

        // Progress Bar
        this.add.rectangle(width / 2, height / 2, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(width / 2 - 230, height / 2, 4, 28, 0xffffff);

        // Animated Character
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('chimpu_run', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });

        this.add.sprite(width / 2, height / 2 - 80, 'chimpu_run')
            .setScale(0.8)
            .play('run');

        this.load.on('progress', (progress: number) => {
            bar.width = 4 + (460 * progress);
        });

        this.load.on('loaderror', (_file: any) => {
            // Error loading asset
        });

        const statusText = this.add.text(width / 2, height / 2 + 50, 'Loading Assets...', {
            fontFamily: 'Arial', fontSize: '18px', color: '#ffffff'
        }).setOrigin(0.5);

        // API Status Handling
        const api = APIService.getInstance();

        const onApiReady = () => {
            statusText.setText('Connecting to Server... Done!');
            GameDataManager.getInstance().syncFromAPI(api.level);
            this.apiReady = true;
            this.checkReady();
        };

        const onApiError = (_err: any) => {
            statusText.setText('Connecting to Server... Done!');
            if (!APIConfig.USE_API) {
                this.apiReady = true;
                this.checkReady();
            }
        };

        if (api.isInitialized) {
            onApiReady();
        } else if (api.isFailed) {
            onApiError("API Failed during initialization");
        } else {
            statusText.setText('Connecting to Server...');
            api.once(APIEvents.API_READY, onApiReady);
            api.once(APIEvents.API_ERROR, onApiError);

            if (!APIConfig.USE_API) {
                this.time.delayedCall(3000, () => {
                    if (!this.apiReady) {
                        onApiError("Timeout");
                    }
                });
            }
        }
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('bg', 'bg.png');
        this.load.image('playButton', 'playButton.png');
        this.load.image('logo', 'CV_Logo.png');
        this.load.image('gameBG', 'GameBG.png');
        this.load.image('game_over_bg', 'GameOverBG.png');
        this.load.image('game_completed_bg', 'GameCompletedBG.png');

        this.load.image('back_icon', 'globalUI/backBtn.png');
        this.load.image('settings_icon', 'globalUI/settingsBtn.png');
        this.load.image('pause_icon', 'globalUI/pauseBtn.png');

        this.load.image('settings_bg', 'globalUI/settingsBG.png');
        this.load.image('paused_bg', 'globalUI/pausedBG.png');
        this.load.image('musicon', 'globalUI/musicon.png');
        this.load.image('musicoff', 'globalUI/musicoff.png');
        this.load.image('sfxon', 'globalUI/sfxon.png');
        this.load.image('sfxoff', 'globalUI/sfxoff.png');
        this.load.image('pause_panel_btn', 'globalUI/pausePanelButtons.png');
        this.load.image('close_icon', 'globalUI/closeBtn.png');

        this.load.image('next_icon', 'globalUI/nextBtn.png');
        this.load.image('retry_icon', 'globalUI/retryBtn.png');
        this.load.image('home_icon', 'globalUI/homeBtn.png');

        this.load.setPath('assets/in-game');
        this.load.spritesheet('chimpu_sheet', 'Chimpu-SpriteSheet.png', {
            frameWidth: 313.5,
            frameHeight: 313.5
        });

        // Audio Assets (Generated SFX and BGM)
        this.load.setPath('assets/audio');
        this.load.audio('click', 'click.wav');
        this.load.audio('correct', 'correct.wav');
        this.load.audio('wrong', 'wrong.wav');
        this.load.audio('sfx_magnifier_tap', 'sfx_magnifier_tap.wav');
        this.load.audio('sfx_found_item', 'sfx_found_item.wav');
        this.load.audio('sfx_stamp_badge', 'sfx_stamp_badge.wav');
        this.load.audio('sfx_wobble_soft', 'sfx_wobble_soft.wav');
        this.load.audio('star', 'star.wav');
        this.load.audio('victory', 'victory.wav');
        this.load.audio('bg_music', 'bg_music.wav');

        // Module 2 Voiceover Audio Clips
        this.load.setPath('assets/audio/vo');
        // Level Greetings
        this.load.audio('vo_greeting_home', 'vo_greeting_home.mp3');
        this.load.audio('vo_greeting_school', 'vo_greeting_school.mp3');
        this.load.audio('vo_greeting_hospital', 'vo_greeting_hospital.mp3');
        this.load.audio('vo_greeting_city', 'vo_greeting_city.mp3');

        // Target item names
        this.load.audio('vo_item_smart_speaker', 'vo_item_smart_speaker.mp3');
        this.load.audio('vo_item_robot_vacuum', 'vo_item_robot_vacuum.mp3');
        this.load.audio('vo_item_smart_tv', 'vo_item_smart_tv.mp3');
        this.load.audio('vo_item_smartboard', 'vo_item_smartboard.mp3');
        this.load.audio('vo_item_tablet_learning', 'vo_item_tablet_learning.mp3');
        this.load.audio('vo_item_face_door_lock', 'vo_item_face_door_lock.mp3');
        this.load.audio('vo_item_health_monitor', 'vo_item_health_monitor.mp3');
        this.load.audio('vo_item_medicine_robot', 'vo_item_medicine_robot.mp3');
        this.load.audio('vo_item_smart_xray', 'vo_item_smart_xray.mp3');
        this.load.audio('vo_item_self_driving_bus', 'vo_item_self_driving_bus.mp3');
        this.load.audio('vo_item_smart_traffic_lights', 'vo_item_smart_traffic_lights.mp3');
        this.load.audio('vo_item_gps_car', 'vo_item_gps_car.mp3');

        // Educational Takeaways
        this.load.audio('vo_edu_smart_speaker', 'vo_edu_smart_speaker.mp3');
        this.load.audio('vo_edu_robot_vacuum', 'vo_edu_robot_vacuum.mp3');
        this.load.audio('vo_edu_smart_tv', 'vo_edu_smart_tv.mp3');
        this.load.audio('vo_edu_smartboard', 'vo_edu_smartboard.mp3');
        this.load.audio('vo_edu_tablet_learning', 'vo_edu_tablet_learning.mp3');
        this.load.audio('vo_edu_face_door_lock', 'vo_edu_face_door_lock.mp3');
        this.load.audio('vo_edu_health_monitor', 'vo_edu_health_monitor.mp3');
        this.load.audio('vo_edu_medicine_robot', 'vo_edu_medicine_robot.mp3');
        this.load.audio('vo_edu_smart_xray', 'vo_edu_smart_xray.mp3');
        this.load.audio('vo_edu_self_driving_bus', 'vo_edu_self_driving_bus.mp3');
        this.load.audio('vo_edu_smart_traffic_lights', 'vo_edu_smart_traffic_lights.mp3');
        this.load.audio('vo_edu_gps_car', 'vo_edu_gps_car.mp3');

        // Praises
        this.load.audio('vo_praise_awesome', 'vo_praise_awesome.mp3');
        this.load.audio('vo_praise_smart_choice', 'vo_praise_smart_choice.mp3');
        this.load.audio('vo_praise_high_five', 'vo_praise_high_five.mp3');

        // 20 Ordinary Object Hints
        this.load.audio('vo_hint_home_chair', 'vo_hint_home_chair.mp3');
        this.load.audio('vo_hint_home_lamp', 'vo_hint_home_lamp.mp3');
        this.load.audio('vo_hint_home_teddy', 'vo_hint_home_teddy.mp3');
        this.load.audio('vo_hint_home_fruit', 'vo_hint_home_fruit.mp3');
        this.load.audio('vo_hint_home_bookshelf', 'vo_hint_home_bookshelf.mp3');

        this.load.audio('vo_hint_school_backpack', 'vo_hint_school_backpack.mp3');
        this.load.audio('vo_hint_school_globe', 'vo_hint_school_globe.mp3');
        this.load.audio('vo_hint_school_pencils', 'vo_hint_school_pencils.mp3');
        this.load.audio('vo_hint_school_clock', 'vo_hint_school_clock.mp3');
        this.load.audio('vo_hint_school_plant', 'vo_hint_school_plant.mp3');

        this.load.audio('vo_hint_hospital_stethoscope', 'vo_hint_hospital_stethoscope.mp3');
        this.load.audio('vo_hint_hosp_bed', 'vo_hint_hosp_bed.mp3');
        this.load.audio('vo_hint_hosp_clipboard', 'vo_hint_hosp_clipboard.mp3');
        this.load.audio('vo_hint_hosp_firstaid', 'vo_hint_hosp_firstaid.mp3');
        this.load.audio('vo_hint_hosp_water', 'vo_hint_hosp_water.mp3');

        this.load.audio('vo_hint_city_bench', 'vo_hint_city_bench.mp3');
        this.load.audio('vo_hint_city_tree', 'vo_hint_city_tree.mp3');
        this.load.audio('vo_hint_city_hydrant', 'vo_hint_city_hydrant.mp3');
        this.load.audio('vo_hint_city_bicycle', 'vo_hint_city_bicycle.mp3');
        this.load.audio('vo_hint_city_trash', 'vo_hint_city_trash.mp3');

        // Victory
        this.load.audio('vo_victory_home', 'vo_victory_home.mp3');
        this.load.audio('vo_victory_school', 'vo_victory_school.mp3');
        this.load.audio('vo_victory_hospital', 'vo_victory_hospital.mp3');
        this.load.audio('vo_victory_city', 'vo_victory_city.mp3');
        this.load.audio('vo_victory_master', 'vo_victory_master.mp3');

        this.load.setPath('assets/loading');
        this.load.image('cv_logo_text', 'Text_CV_Logo.png');

        this.load.once('complete', () => {
            this.assetsLoaded = true;
            this.checkReady();
        });
    }

    create() {
        this.cameras.main.setBackgroundColor('#231F20');
        AssetManager.generateTextures(this);
        this.sound.pauseOnBlur = false;

        const audio = AudioManager.getInstance();
        audio.init(this);

        if (!this.scene.isActive('GlobalUI')) {
            this.scene.launch('GlobalUI');
        }
        this.scene.bringToTop('GlobalUI');
    }

    private checkReady() {
        if (this.apiReady && this.assetsLoaded) {
            this.showSplashScreen();
        }
    }

    private showSplashScreen() {
        const { width, height } = this.scale;

        const bg = this.add.rectangle(width / 2, height / 2, width, height, 0xffffff)
            .setAlpha(0)
            .setDepth(1000)
            .setInteractive();

        const logo = this.add.image(width / 2, height / 2, 'cv_logo_text')
            .setAlpha(0)
            .setDepth(1001);

        this.tweens.add({
            targets: [bg, logo],
            alpha: 1,
            duration: 500,
            onComplete: () => {
                this.scene.launch('MainMenu');
                this.scene.bringToTop('Preloader');

                this.children.each((child) => {
                    if (child !== bg && child !== logo) {
                        (child as any).visible = false;
                    }
                });

                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: [bg, logo],
                        alpha: 0,
                        duration: 500,
                        onComplete: () => {
                            this.scene.stop('Preloader');
                        }
                    });
                });
            }
        });
    }
}
