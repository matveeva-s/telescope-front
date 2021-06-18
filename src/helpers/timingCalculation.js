import { telescopeTurnTime } from "../constants/appConstants";

const getUnixTimeArray = (array) => {
    let unixTimes = [];
    array.map(el => {
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
    return unixTimes;
};

export const countPointsTaskTiming = (points) => {
    const unixTimes = getUnixTimeArray(points);
    let maxTime = unixTimes[0];
    let minTime = unixTimes[0];
    let maxTimeExp = 0;
    unixTimes.map(el => el < minTime ? minTime = el : null);
    unixTimes.map((el, index) => {
        if (el >= maxTime) {
            maxTime = el;
            maxTimeExp = points[index].exposure;
        }
    });
    minTime = new Date(minTime);
    maxTime = new Date(maxTime + maxTimeExp*1000 + telescopeTurnTime*1000);
    const duration = ((maxTime - minTime)/60000).toFixed(2);
    return { duration, minTime, maxTime };
};

export const countTrackingTaskTiming = (trackingData) => {
    const track = trackingData ? trackingData.track : [];
    if (track.length < 2) return { duration: 0, maxTime: 0, minTime: 0 };
    const unixTimes = getUnixTimeArray(track);
    let maxTime = unixTimes[0];
    let minTime = unixTimes[0];
    unixTimes.map(el => el < minTime ? minTime = el : null);
    unixTimes.map((el, index) => {
        if (el >= maxTime) {
            maxTime = el;
        }
    });
    minTime = new Date(minTime);
    maxTime = new Date(maxTime + telescopeTurnTime*1000);
    const duration = ((maxTime - minTime)/60000).toFixed(2);
    return { duration, minTime, maxTime };
};

export const countTleTaskTiming = (tleData) => {
    const frames = tleData ? tleData.frames : [];
    if (frames.length < 2) return { duration: 0, maxTime: 0, minTime: 0 };
    const unixTimes = getUnixTimeArray(frames);
    let maxTime = unixTimes[0];
    let minTime = unixTimes[0];
    let maxTimeExp = 0;
    unixTimes.map(el => el < minTime ? minTime = el : null);
    unixTimes.map((el, index) => {
        if (el >= maxTime) {
            maxTime = el;
            maxTimeExp = frames[index].exposure;
        }
    });
    minTime = new Date(minTime );
    maxTime = new Date(maxTime + maxTimeExp*1000 + telescopeTurnTime*1000);
    const duration = ((maxTime - minTime)/60000).toFixed(2);
    return { duration, minTime, maxTime };
};
