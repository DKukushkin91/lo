const convertMinutesToMs = (minutes: number): number => {
    return minutes * 60 * 1000;
};

const convertSecondsToMs = (seconds: number): number => {
    return seconds * 1000;
};

export const DateTimeHelper = {
    convertSecondsToMs,
    convertMinutesToMs,
};
