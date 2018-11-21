import { createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { dark, light } from '@material-ui/core/styles/createPalette';

export default createMuiTheme(
	{ palette: {
		// background: {
		// 	default : '#0b172a'
		// },
		primary: {
            main:'#00838f'}, 
            contrastText : '#376e6f',
		},	 
		secondary:{
            main:'#5932a5',
            // contrastText : '#000',
        },
        // type: 'dark',
        // contrastThreshold:3,
		// tonalOffset:0.2	
    });	
    
