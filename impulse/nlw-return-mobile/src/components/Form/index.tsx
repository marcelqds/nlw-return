import React, {useState} from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity

     } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { theme } from '../../theme';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';

let _theme = 'dark';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => {}
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props){
    
    
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [comment, setComment] = useState<string>('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error));        
    }
    
    function handleScreenshotRemove(){
        setScreenshot(null);
    }

    async function handleSendFeedback(){
        if(isSendingFeedback) return;
        setIsSendingFeedback(true);
        let screenshotBase64 = screenshot && 'data:image/png;base64, ' + await FileSystem
        .readAsStringAsync(screenshot,{encoding: 'base64'});

        try{
            await api.post('/feedbacks',{
                type: feedbackType,
                screenshot: screenshotBase64,
                comment,                
            });
            onFeedbackSent();

        }catch(error){
            setIsSendingFeedback(false);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme[_theme].text_secondary}
                    />
                </TouchableOpacity>
            
                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleType}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>        
            <TextInput 
                multiline
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme[_theme].text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton onTakeShot={handleScreenshot} onRemoveShot={handleScreenshotRemove} screenshot={screenshot} />
                <Button 
                    isLoading={isSendingFeedback} 
                    onPress={handleSendFeedback}
                />
            </View>
        </View>
    );
}
