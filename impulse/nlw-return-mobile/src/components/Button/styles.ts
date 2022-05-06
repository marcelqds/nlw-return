import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

let _theme = 'dark';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 40,
        backgroundColor: theme[_theme].brand,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textButton:{
        fontSize: 14,
        fontFamily: theme.fonts.medium,
        color: theme[_theme].text_on_brand_color
    }
});

