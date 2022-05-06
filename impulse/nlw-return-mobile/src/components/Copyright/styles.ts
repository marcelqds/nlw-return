import { StyleSheet } from 'react-native';

import { theme } from '../../theme';

let _theme = 'dark';
export const styles = StyleSheet.create({
    text: {
        color: theme[_theme].text_secondary,
        fontFamily:theme.fonts.medium
    },
});
