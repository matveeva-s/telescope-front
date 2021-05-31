import { telescopeTurnTime } from "../constants/appConstants";

const countTimingFromExposures = (array) => {
    if (!array) {
        return 0;
    }
    let sum = 0;
    array.map(el => {
        if (el && el.exposure) {
            sum = sum + parseInt(el.exposure) + telescopeTurnTime;
        }
        return el;
    });
    return (sum/60).toFixed(2);
};

const countTimingToTracking = (track) => {
    if (!track) {
        return 0;
    }
    let unixTimes = [];
    track.map(el => {
        if (!el.time || !el.date) return el;
        const year = el.date.getFullYear();
        const month = el.date.getMonth();
        const day = el.date.getDate();
        const hours = el.time.getHours();
        const minutes = el.time.getMinutes();
        const seconds = el.time.getSeconds();
        const unixDT = new Date(year, month, day, hours, minutes, seconds).getTime();
        unixTimes.push(unixDT);
    });
    let maxTime = unixTimes[0];
    let minTime = unixTimes[0];
    unixTimes.map(el => el > maxTime ? maxTime = el : null);
    unixTimes.map(el => el < minTime ? minTime = el : null);
    return ((maxTime - minTime)/60000).toFixed(2);
};

export const countPointsTaskTiming = (points) => {
    return countTimingFromExposures(points);
};

export const countTrackingTaskTiming = (trackingData) => {
    const track = trackingData ? trackingData.track : [];
    return countTimingToTracking(track);
};

export const countTleTaskTiming = (tleData) => {
    const frames = tleData ? tleData.frames : [];
    return countTimingToTracking(frames);
};
