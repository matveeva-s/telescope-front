export const validatePointsTask = points => {
    let errors = [];
    points.map(({ satellite, mag, alpha, beta, exposure, systemType, date, time }, index) => {
        let error = {};
        if (!satellite) error.satellite = true;
        if (!mag) error.mag = true;
        if (!alpha) error.alpha = true;
        if (!beta) error.beta = true;
        if (!exposure) error.exposure = true;
        if (!systemType) error.systemType = true;
        if (!date) error.date = true;
        if (!time) error.time = true;
        errors.push(error);
    });
    let wrongFieldsCount = 0;
    errors.map((el) => {
        if (Object.keys(el).length > 0) wrongFieldsCount = wrongFieldsCount + 1;
    });
    return wrongFieldsCount > 0 ?  errors : null;
};


export const validateTrackingData = (trackingData) => {
    let trackingError = {
        satellite: !trackingData.satellite,
        mag: !trackingData.mag,
        count: !trackingData.count,
        track: [],
        frames: [],
    };
    let isError = trackingError.satellite || trackingError.count || trackingData.mag;
    trackingData.track.map(({ alpha, beta, date, time }) => {
        const error = {
            alpha: !alpha,
            beta: !beta,
            date: !date,
            time: !time,
        };
        isError = isError || !alpha || !beta || !date || !time;
        trackingError.track.push(error);
    });
    trackingData.frames.map(({ exposure, date, time }) => {
        const error = {
            exposure: !exposure,
            date: !date,
            time: !time,
        };
        isError = isError || !exposure || !date || !time;
        trackingError.frames.push(error);
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
    let isError = tleError.satellite || tleError.line1 || tleError.line2;
    tleData.frames.map(({ exposure, date, time }) => {
        const error = {
            exposure: !exposure,
            date: !date,
            time: !time,
        };
        isError = isError || !exposure || !date || !time;
        tleError.frames.push(error);
    });
    return { isError, errors: tleError };
};
