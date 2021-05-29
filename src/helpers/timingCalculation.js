import { telescopeTurnTime } from "../constants/appConstants";

export const countPointsTaskTiming = (points) => {
    if (!points) {
        return 0;
    }
    let sum = 0;
    points.map(el => {
        if (el && el.exposure) {
            sum = sum + parseInt(el.exposure) + telescopeTurnTime;
        }
    });
    return (sum/60).toFixed(2);
};
