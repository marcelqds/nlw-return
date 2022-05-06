import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

let _theme = 'dark';

export const styles = StyleSheet.create({
    container:{
        alignItems: "center",        
    },
    title:{
        fontSize: 20,
        marginBottom: 32,
        fontFamily: theme.fonts.medium,
        color: theme[_theme].text_primary
    },
    options:{
        width: '100%',
        marginBottom: 48,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
