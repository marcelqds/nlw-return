import { StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { getBottomSpace } from 'react-native-iphone-x-helper';

let _theme = 'dark';

export const styles = StyleSheet.create({
    button:{
        width: 48,
        height: 48,        
        borderRadius: 24,
        backgroundColor: theme[_theme].brand,
        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 16,
        bottom: getBottomSpace() + 16,
    },
    modal:{
        backgroundColor: theme[_theme].surface_primary,
        paddingBottom: getBottomSpace() + 16,
    },
    indicator:{
        backgroundColor: theme[_theme].text_primary,
        width: 56,
    }
});
