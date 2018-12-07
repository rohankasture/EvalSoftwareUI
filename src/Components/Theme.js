import { createMuiTheme } from '@material-ui/core/styles';

// custom theme for the application
export default createMuiTheme(
      {
            palette: {

                  primary: {
                        main: '#00838f'
                  },
                  contrastText: '#376e6f',
            },
            secondary: {
                  main: '#5932a5',
            },
            typography: {
                  useNextVariants: true,
            },
            background: {
                  default: "#848484"
            }
      });

