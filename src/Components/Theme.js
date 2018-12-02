import { createMuiTheme } from '@material-ui/core/styles';

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
      });

