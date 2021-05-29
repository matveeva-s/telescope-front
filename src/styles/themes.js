import { createMuiTheme } from '@material-ui/core/styles';

export const headerTheme = createMuiTheme({
  typography: {
    fontFamily: "'Raleway', sans-serif",
    body1: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 400,
      fontSize: 18,
    }
  },
  palette: {
    primary: {
      main: "#12143d"
    },
  }
});

export const mainTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#12143d',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: "'Raleway', sans-serif",
    },
});

export const taskFormTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#12143d',
            main: '#12143d',
            dark: '#12143d',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: "'Raleway', sans-serif",
    },
});
