import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

let _theme = 'dark';

export const styles = StyleSheet.create({
    container: {
        width: 104,
        height: 112,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: theme[_theme].surface_secondary
    },
    image:{
        width: 40,
        height: 40,        
    },
    title:{
        fontSize: 14,
        marginTop: 8,
        fontFamily: theme.fonts.medium,
        color: theme[_theme].text_primary,
    }
});
