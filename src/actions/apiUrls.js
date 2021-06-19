// export const baseApiURL = 'http://127.0.0.1:8000/api/';   //local
export const baseApiURL = 'https://chronos-system.ru/api/';  //prod

export const userApiUrls = {
    mainUserInfo: 'user_data/',
    saveProfile: 'users/profile/'
};


export const telescopesApiUrls = {
    telescopesList: 'tasks/telescopes/',
};

const telescopeSchedule = (telescopeId) => `tasks/${telescopeId}/schedule/`;

export const tasksApiUrls = {
    telescopesWithBalances: 'tasks/telescopes_with_balances/',
    savePointTask: 'tasks/point_task/',
    saveTrackingTask: 'tasks/tracking_task/',
    saveTleTask: 'tasks/tle_task/',
    getUserTasks: 'tasks/get_tasks/',
    telescopeSchedule,
};

export const balancesApiUrls = {
    requests: 'tasks/requests/',
    saveRequest: 'tasks/save_request/',
};
