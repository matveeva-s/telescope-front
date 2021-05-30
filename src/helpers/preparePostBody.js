export const preparePoints = (points) => {
    if (!points) {
        return;
    }
    let newPoints = [];
    points.map(el => {
        const year = el.date.getFullYear();
        const month = el.date.getMonth();
        const day = el.date.getDate();
        const hours = el.time.getHours();
        const minutes = el.time.getMinutes();
        const seconds = el.time.getSeconds();
        const dt = new Date(year, month, day, hours, minutes, seconds);
        const {date, time, satellite, systemType, ...elWithoutDateTime} = el;
        newPoints.push({dt, cs_type: el.systemType, satellite_id: el.satellite, ...elWithoutDateTime});
        return el;
    });
    return newPoints;
};
