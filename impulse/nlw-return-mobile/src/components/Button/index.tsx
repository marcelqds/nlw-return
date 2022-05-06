import React from 'react';
import { 
            View, 
            TouchableOpacity,
            Text,
            ActivityIndicator,
            TouchableOpacityProps
         } from 'react-native';
//import { } from 'phosphor-react-native';

import { theme } from '../../theme';
import { styles } from './styles';

interface Props extends TouchableOpacityProps {
    isLoading: boolean;
}

let _theme = 'dark';

export function Button({ isLoading, ...rest}){
    return(
        <TouchableOpacity
            style={styles.container}
            {...rest}
        >

                { isLoading ? 
                    <ActivityIndicator
                        color={theme[_theme].text_on_brand_color}
                     />
                    :
                     <Text style={styles.textButton}>
                          Enviar feedback
                     </Text>
                }

        </TouchableOpacity>
    );
}

