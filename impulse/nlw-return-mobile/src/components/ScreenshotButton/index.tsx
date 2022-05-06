import React from 'react';
import { View,TouchableOpacity, Image } from 'react-native';
import { Camera, Trash } from 'phosphor-react-native';

import { theme } from '../../theme';
import { styles } from './styles';

interface Props{
    screenshot: string | null;
    onTakeShot: () => void;
    onRemoveShot: () => void;
}

let _theme = 'dark';

export function ScreenshotButton(
    {
        screenshot, 
        onTakeShot, 
        onRemoveShot

     }: Props){
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={ screenshot ? onRemoveShot : onTakeShot}
        >
            {
                screenshot ? 
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: screenshot }}
                        />
                        <Trash 
                            size={12}
                            color={theme[_theme].text_secondary}
                            weight="fill"
                            style={styles.trashIcon}
                        />
                    </View>
                    :
                    <Camera 
                        size={24}
                        color={theme[_theme].text_secondary}
                        weight="fill"
                        style={{}}
                    />
            }
        </TouchableOpacity>
    );
}
