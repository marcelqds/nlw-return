import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

let _theme = 'dark';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image:{
        width: 36,
        height: 36,
        marginTop: 42,
        marginBottom: 10
    },
    title:{
        fontSize: 20,
        marginBottom: 24,
        fontFamily: theme.fonts.medium,
        color: theme[_theme].text_primary
    },
    button:{
        height: 40,
        backgroundColor: theme[_theme].surface_secondary,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        marginBottom: 56
    },
    titleButton:{
        fontSize: 14,
        fontFamily: theme.fonts.medium,
        color: theme[_theme].text_primary
    }
});
