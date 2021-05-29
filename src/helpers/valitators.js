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

