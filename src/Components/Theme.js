import { createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { dark, light } from '@material-ui/core/styles/createPalette';

export default createMuiTheme(
	{ palette: {
		
		primary: {
            main:'#00838f'}, 
            contrastText : '#376e6f',
		},	 
		secondary:{
            main:'#5932a5',
            // contrastText : '#000',
        },
        typography: {
            useNextVariants: true,
            },
    });	
    
