import { createMuiTheme } from '@material-ui/core/styles';

export const headerTheme = createMuiTheme({
  typography: {
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
