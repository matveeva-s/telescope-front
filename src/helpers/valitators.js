import validators from 'tle-validator';

export const validatePointsTask = points => {
    let errors = [];
    let isError = false;
    points.map(({ satellite, mag, alpha, beta, exposure, systemType, date, time }, index) => {
        let error = {
            satellite: !satellite,
            mag: !mag,
            alpha: !alpha,
            beta: !beta,
            exposure: !exposure,
            systemType: !systemType,
            date: !date,
            time: !time,
        };
        isError = isError || !(satellite && mag && alpha && beta && systemType && exposure && date && time);
        errors.push(error);
        return index;
    });
    return { isError, errors };
};

export const checkTimeCollisions = points => {
    const ranges = [];
    let error = '';
    points.map(({ dt, exposure }) => {
        ranges.push({startTime:  dt, endTime: new Date(dt.getTime() + exposure*1000)});
        return dt;
    });
    ranges.map((el, index) => {
        ranges.map((iter_el, iter_index) => {
            if (iter_el.endTime > el.startTime && iter_el.endTime < el.endTime && index !== iter_index) {
                error = `Съемка точки №${index+1} начинается раньше, чем заканчивается съемка точки №${iter_index+1}`;
            }
        })
    });
    return error;
}


export const validateTrackingData = (trackingData) => {
    let trackingError = {
        satellite: !trackingData.satellite,
        mag: !trackingData.mag,
        stepSec: !trackingData.stepSec,
        track: [],
        frames: [],
    };
    let isError = trackingError.satellite || trackingError.stepSec || trackingError.mag;
    trackingData.track.map(({ alpha, beta, date, time }) => {
        const error = {
            alpha: !alpha,
            beta: !beta,
            date: !date,
            time: !time,
        };
        isError = isError || !alpha || !beta || !date || !time;
        trackingError.track.push(error);
        return alpha;
    });
    trackingData.frames.map(({ exposure, date, time }) => {
        const error = {
            exposure: !exposure,
            date: !date,
            time: !time,
        };
        isError = isError || !exposure || !date || !time;
        trackingError.frames.push(error);
        return exposure;
    });
    return { isError, errors: trackingError };
};


export const validateTleData = (tleData) => {
    let tleError = {
        satellite: !tleData.satellite,
        line1: !tleData.line1,
        line2: !tleData.line2,
        frames: [],
    };
    if (tleData.line1) tleError.line1 = !validators.validateLineOne(tleData.line1);
    if (tleData.line2) tleError.line2 = !validators.validateLineTwo(tleData.line2);
    let isError = tleError.satellite || tleError.line1 || tleError.line2;
    tleData.frames.map(({ exposure, date, time }) => {
        const error = {
            exposure: !exposure,
            date: !date,
            time: !time,
        };
        isError = isError || !exposure || !date || !time;
        tleError.frames.push(error);
        return exposure;
    });
    return { isError, errors: tleError };
};
