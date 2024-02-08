import { amber, deepOrange, grey, blue, common } from '@mui/material/colors';

const palette = {
  light: {
    primary: {
      main: '#34C0AC',
      light: '#B1DED3',
      dark: '#00765A',
    },
  },
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
  },
  typography: {
    fontFamily: [
      'Oswald',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    body1: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  },
});

export const getThemedComponents = (mode) => ({
  components: {
  }
});