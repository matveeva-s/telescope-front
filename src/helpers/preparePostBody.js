const convertDateTime = (date, time) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return new Date(year, month, day, hours, minutes, seconds);
};

export const preparePoints = (points) => {
    if (!points) {
        return;
    }
    let newPoints = [];
    points.map(el => {
        const dt = convertDateTime(el.date, el.time);
        const {date, time, satellite, systemType, ...elWithoutDateTime} = el;
        newPoints.push({dt, cs_type: el.systemType, satellite_id: el.satellite, ...elWithoutDateTime});
        return el;
    });
    return newPoints;
};


export const prepareTrackingTask = (trackingData) => {
    let newTrackingData = {
        satellite_id: trackingData.satellite,
        mag: trackingData.mag,
        count: trackingData.count,
        step_sec: 1,
    };
    return newTrackingData;
};

export const prepareTrack = (track) => {
    let newTrack = [];
    track.map(({alpha, beta, date, time}) => newTrack.push({
        alpha,
        beta,
        dt: convertDateTime(date, time),
    }));
    return newTrack;
};


export const prepareFrames = (frames) => {
    let newFrames = [];
    frames.map(({exposure, date, time}) => newFrames.push({
        exposure,
        dt: convertDateTime(date, time),
    }));
    return newFrames;
};


export const prepareTleTask = (tleData) => {
    let newTrackingData = {
        satellite_id: tleData.satellite,
        line1: tleData.line1,
        line2: tleData.line2,
    };
    return newTrackingData;
};
