export const navigationLinks = [
  { title: 'Телескопы' , path : '/telescopes' } ,
  { title: 'Наблюдения' , path : '/tasks' } ,
  { title: 'Новое задание' , path : '/new-task' } ,
  { title: 'Баланс' , path : '/balance' } ,
];

export const navigationMenuStyles = {
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    marginLeft: '30px',
    color: `white`,
  },
  expandButton: {
    color: "#ffffff",
  }
};

export const credentialsHeaders = {
  'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
  'Content-Type': 'application/json',
  'accept': 'application/json'
};
