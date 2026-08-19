import { AudioManager } from './AudioManager';

const VO_MAP: Record<string, string> = {
    // Level Initial Greetings
    "Welcome to the Smart Home! Let's find all 3 smart tools!": "vo_greeting_home",
    "Welcome to the Smart School! Let's find all 3 smart tools!": "vo_greeting_school",
    "Welcome to the Smart Hospital! Let's find all 3 smart tools!": "vo_greeting_hospital",
    "Welcome to the Smart City! Let's find all 3 smart tools!": "vo_greeting_city",

    // Target Names
    "Smart Speaker": "vo_item_smart_speaker",
    "Robot Vacuum": "vo_item_robot_vacuum",
    "Smart TV": "vo_item_smart_tv",
    "Interactive Smartboard": "vo_item_smartboard",
    "Tablet Learning Assistant": "vo_item_tablet_learning",
    "Face-Scan Door Lock": "vo_item_face_door_lock",
    "Health Monitor AI": "vo_item_health_monitor",
    "Medicine Delivery Robot": "vo_item_medicine_robot",
    "Smart X-Ray Screen": "vo_item_smart_xray",
    "Self-Driving Bus": "vo_item_self_driving_bus",
    "Smart Traffic Lights": "vo_item_smart_traffic_lights",
    "GPS Navigation Car": "vo_item_gps_car",

    // Educational Takeaway Voiceover Cues
    "The smart speaker listens and plays your favorite song!": "vo_edu_smart_speaker",
    "The robot vacuum cleans the floor all by itself!": "vo_edu_robot_vacuum",
    "The smart TV recommends fun shows you might like!": "vo_edu_smart_tv",
    "The smartboard helps us learn with smart drawings!": "vo_edu_smartboard",
    "The learning tablet creates fun lessons just for you!": "vo_edu_tablet_learning",
    "The face-scan lock opens the door safely for recognized students!": "vo_edu_face_door_lock",
    "The AI monitor watches vital signs to keep patients safe!": "vo_edu_health_monitor",
    "Robots help doctors deliver medicine safely and quickly!": "vo_edu_medicine_robot",
    "The smart X-ray screen helps doctors spot bone injuries quickly!": "vo_edu_smart_xray",
    "The self-driving bus takes passengers safely across the city!": "vo_edu_self_driving_bus",
    "Smart traffic lights change colors to keep traffic moving smoothly!": "vo_edu_smart_traffic_lights",
    "GPS navigation finds the smartest route through city traffic!": "vo_edu_gps_car",

    // Praises
    "Awesome detective work!": "vo_praise_awesome",
    "Smart discovery!": "vo_praise_smart_choice",
    "High five! Great detective skills!": "vo_praise_high_five",

    // 20 Ordinary Object Hints (Exact text strings & key fallbacks)
    // Level 1: Smart Home
    "That is a cozy armchair! Can you find something that thinks like a computer?": "vo_hint_home_chair",
    "That's a cozy armchair! Can you find something that thinks like a computer?": "vo_hint_home_chair",
    "That is a regular lamp! Can you find something that thinks like a computer?": "vo_hint_home_lamp",
    "That's a regular lamp! Can you find something that thinks like a computer?": "vo_hint_home_lamp",
    "That is a toy teddy bear! Can you find something that thinks like a computer?": "vo_hint_home_teddy",
    "That's a toy teddy bear! Can you find something that thinks like a computer?": "vo_hint_home_teddy",
    "That is a bowl of fresh fruit! Can you find something that thinks like a computer?": "vo_hint_home_fruit",
    "That's a bowl of fresh fruit! Can you find something that thinks like a computer?": "vo_hint_home_fruit",
    "That is a wooden bookshelf! Can you find something that thinks like a computer?": "vo_hint_home_bookshelf",
    "That's a wooden bookshelf! Can you find something that thinks like a computer?": "vo_hint_home_bookshelf",

    // Level 2: Smart School
    "That is a student backpack! Can you find something that thinks like a computer?": "vo_hint_school_backpack",
    "That's a student backpack! Can you find something that thinks like a computer?": "vo_hint_school_backpack",
    "That is a spinning world globe! Can you find something that thinks like a computer?": "vo_hint_school_globe",
    "That's a spinning world globe! Can you find something that thinks like a computer?": "vo_hint_school_globe",
    "That is a cup of colored pencils! Can you find something that thinks like a computer?": "vo_hint_school_pencils",
    "That's a cup of colored pencils! Can you find something that thinks like a computer?": "vo_hint_school_pencils",
    "That is a regular wall clock! Can you find something that thinks like a computer?": "vo_hint_school_clock",
    "That's a regular wall clock! Can you find something that thinks like a computer?": "vo_hint_school_clock",
    "That is a green desk plant! Can you find something that thinks like a computer?": "vo_hint_school_plant",
    "That's a green desk plant! Can you find something that thinks like a computer?": "vo_hint_school_plant",

    // Level 3: Smart Hospital
    "That is a doctor stethoscope! Can you find something that thinks like a computer?": "vo_hint_hospital_stethoscope",
    "That's a doctor stethoscope! Can you find something that thinks like a computer?": "vo_hint_hospital_stethoscope",
    "That is a comfortable care bed! Can you find something that thinks like a computer?": "vo_hint_hosp_bed",
    "That's a comfortable care bed! Can you find something that thinks like a computer?": "vo_hint_hosp_bed",
    "That is a medical clipboard! Can you find something that thinks like a computer?": "vo_hint_hosp_clipboard",
    "That's a medical clipboard! Can you find something that thinks like a computer?": "vo_hint_hosp_clipboard",
    "That is a first aid kit! Can you find something that thinks like a computer?": "vo_hint_hosp_firstaid",
    "That's a first aid kit! Can you find something that thinks like a computer?": "vo_hint_hosp_firstaid",
    "That is a water dispenser! Can you find something that thinks like a computer?": "vo_hint_hosp_water",
    "That's a water dispenser! Can you find something that thinks like a computer?": "vo_hint_hosp_water",

    // Level 4: Smart City
    "That is a park bench! Can you find something that thinks like a computer?": "vo_hint_city_bench",
    "That's a park bench! Can you find something that thinks like a computer?": "vo_hint_city_bench",
    "That is a shady green tree! Can you find something that thinks like a computer?": "vo_hint_city_tree",
    "That's a shady green tree! Can you find something that thinks like a computer?": "vo_hint_city_tree",
    "That is a fire hydrant! Can you find something that thinks like a computer?": "vo_hint_city_hydrant",
    "That's a fire hydrant! Can you find something that thinks like a computer?": "vo_hint_city_hydrant",
    "That is a pedal bicycle! Can you find something that thinks like a computer?": "vo_hint_city_bicycle",
    "That's a pedal bicycle! Can you find something that thinks like a computer?": "vo_hint_city_bicycle",
    "That is a recycle bin! Can you find something that thinks like a computer?": "vo_hint_city_trash",
    "That's a recycle bin! Can you find something that thinks like a computer?": "vo_hint_city_trash",

    // Level Completions
    "Great detective work! You spotted all the smart machines in the Smart Home!": "vo_victory_home",
    "Super detective work! You spotted all the smart machines in the Smart School!": "vo_victory_school",
    "Amazing job! You spotted all the smart machines in the Smart Hospital!": "vo_victory_hospital",
    "Incredible detective skills! You spotted all the smart machines in the Smart City!": "vo_victory_city",
    "Congratulations! You earned the Master AI Detective Badge!": "vo_victory_master"
};

export class TTSService {
    private static instance: TTSService;
    private isSupported: boolean = false;
    private isEnabled: boolean = true;
    private selectedVoice: SpeechSynthesisVoice | null = null;
    private activeUtterance: SpeechSynthesisUtterance | null = null;
    private isPrimed: boolean = false;

    private constructor() {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            this.isSupported = true;
            this.initVoices();
            this.setupUserGestureListener();
        }
    }

    public static getInstance(): TTSService {
        if (!TTSService.instance) {
            TTSService.instance = new TTSService();
        }
        return TTSService.instance;
    }

    private setupUserGestureListener() {
        if (typeof window === 'undefined') return;

        const unlockTTS = () => {
            if (this.isPrimed) return;
            this.isPrimed = true;
            try {
                window.speechSynthesis.resume();
                const silentUtterance = new SpeechSynthesisUtterance('');
                silentUtterance.volume = 0;
                window.speechSynthesis.speak(silentUtterance);
            } catch { }

            window.removeEventListener('pointerdown', unlockTTS);
            window.removeEventListener('keydown', unlockTTS);
            window.removeEventListener('touchstart', unlockTTS);
        };

        window.addEventListener('pointerdown', unlockTTS, { passive: true });
        window.addEventListener('keydown', unlockTTS, { passive: true });
        window.addEventListener('touchstart', unlockTTS, { passive: true });
    }

    private initVoices() {
        if (!this.isSupported) return;

        const updateVoices = () => {
            try {
                const voices = window.speechSynthesis.getVoices();
                if (voices && voices.length > 0) {
                    this.selectedVoice =
                        voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Guy'))) ||
                        voices.find(v => v.lang.startsWith('en')) ||
                        voices[0];
                }
            } catch { }
        };

        updateVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = updateVoices;
        }
    }

    /**
     * Speaks the given text using high-quality pre-rendered voice clips,
     * falling back to Web Speech API.
     */
    public speak(text: string, options?: { voKey?: string; pitch?: number; rate?: number; onComplete?: () => void }) {
        if (!this.isEnabled) {
            options?.onComplete?.();
            return;
        }
        if (!text || text.trim().length === 0) {
            options?.onComplete?.();
            return;
        }

        // Immediately stop any currently playing voice/audio
        this.stop();

        // Check if audio/SFX is muted
        try {
            if (AudioManager.getInstance().isSFXMuted()) {
                options?.onComplete?.();
                return;
            }
        } catch { }

        // 1. Try High-Quality Pre-Rendered Voice Clip (100% reliable across all browsers & OS)
        const targetVoKey = options?.voKey || VO_MAP[text.trim()] || VO_MAP[text];
        if (targetVoKey) {
            try {
                AudioManager.getInstance().playVoice(targetVoKey, 1.0, options?.onComplete);
                return;
            } catch (e) {
                // If audio clip not found, fallback to Web Speech API
            }
        }

        // 2. Web Speech API Fallback
        if (!this.isSupported) {
            options?.onComplete?.();
            return;
        }

        try {
            window.speechSynthesis.resume();

            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                window.speechSynthesis.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);
            this.activeUtterance = utterance;

            utterance.lang = 'en-US';
            if (this.selectedVoice) {
                utterance.voice = this.selectedVoice;
            }

            utterance.rate = options?.rate ?? 0.95;
            utterance.pitch = options?.pitch ?? 1.1;

            let sfxVol = 1.0;
            try {
                sfxVol = AudioManager.getInstance().getSFXVolume();
            } catch { }
            utterance.volume = Math.max(0.2, sfxVol);

            utterance.onend = () => {
                this.activeUtterance = null;
                options?.onComplete?.();
            };

            utterance.onerror = (e) => {
                console.warn('[TTSService] Web Speech fallback error:', e);
                this.activeUtterance = null;
                options?.onComplete?.();
            };

            setTimeout(() => {
                try {
                    window.speechSynthesis.resume();
                    window.speechSynthesis.speak(utterance);
                } catch { }
            }, 15);

        } catch (err) {
            console.warn('[TTSService] Speech execution error:', err);
            options?.onComplete?.();
        }
    }

    public stop() {
        // Stop active pre-rendered audio voice clip
        try {
            AudioManager.getInstance().stopVoice();
        } catch { }

        // Stop active Web Speech synthesis utterance
        if (this.isSupported) {
            try {
                window.speechSynthesis.cancel();
                this.activeUtterance = null;
            } catch { }
        }
    }

    public setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
        if (!enabled) {
            this.stop();
        }
    }

    public isSpeaking(): boolean {
        return this.activeUtterance !== null || (typeof window !== 'undefined' && Boolean(window.speechSynthesis?.speaking));
    }

    public isTTSAvailable(): boolean {
        return true;
    }
}
