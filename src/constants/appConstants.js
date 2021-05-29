export const navigationLinks = [
    { title: 'Телескопы' , path : '/telescopes/' } ,
    { title: 'Наблюдения' , path : '/tasks/' } ,
    { title: 'Новое наблюдение' , path : '/new-task/' } ,
    { title: 'Баланс' , path : '/balance/' } ,
];

export const tasksTypes = [
    { value: 1, label: 'Снимки по точкам' },
    { value: 2, label: 'Трэкинг по точкам'},
    { value: 3, label: 'Снимки по TLE' }
];

export const coordinateSystemTypes = [
    { value: 0, label: 'Земная СК' },
    { value: 1, label: 'Звездная СК'},
];

export const emptyValueErrorText = 'Это поле не должно быть пустым';

export const telescopeTurnTime = 2*60;


export const credentialsHeaders = (token) => ({
  'Authorization': "JWT " + token,
  'Content-Type': 'application/json',
  'accept': 'application/json'
});
