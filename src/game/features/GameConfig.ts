export interface GameConfiguration {
    itemsPerRound: number;
    normalBatteryGain: number;
    powerBatteryGain: number;
    powerModeActivationStreak: number;
    idleHintDelayMs: number;
    swipeThresholdPx: number;
    flickVelocityThreshold: number;
    cardEntryDurationMs: number;
    correctFeedbackDurationMs: number;
    incorrectFeedbackDurationMs: number;
    cardReturnDurationMs: number;
    nextItemDelayMs: number;
}

export const DEFAULT_GAME_CONFIG: GameConfiguration = {
    itemsPerRound: 10,
    normalBatteryGain: 10,
    powerBatteryGain: 15,
    powerModeActivationStreak: 3,
    idleHintDelayMs: 4000,
    swipeThresholdPx: 70,
    flickVelocityThreshold: 500,
    cardEntryDurationMs: 350,
    correctFeedbackDurationMs: 400,
    incorrectFeedbackDurationMs: 450,
    cardReturnDurationMs: 250,
    nextItemDelayMs: 750
};
