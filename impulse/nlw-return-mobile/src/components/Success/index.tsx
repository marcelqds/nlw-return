import React from 'react';
import {View, Text, TouchableOpacity, Image } from 'react-native';

import successImg from '../../assets/success.png';
import { styles } from './styles';

interface Props{
    onSendAnotherFeedback: () => void;
}

export function Success({onSendAnotherFeedback}: Props){
    return(
        <View style={styles.container}>
            <Image source={successImg} style={styles.image} />
            <Text style={styles.title}>
                Agradecemos o feedback!
            </Text>
            <TouchableOpacity
                onPress={onSendAnotherFeedback}
                style={styles.button}
            >
                <Text style={styles.titleButton}>
                    Quero enviar outro
                </Text>                
            </TouchableOpacity>
        </View>
    );
}
