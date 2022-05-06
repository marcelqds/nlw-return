import { useState } from 'react';
import { CloseButton } from './CloseButton';

import bugImageUrl from '../../assets/images/bug.svg';
import ideaImageUrl from '../../assets/images/idea.svg';
import otherImageUrl from '../../assets/images/other.svg';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG:{
        title:'Problema',
        image:{
            source: bugImageUrl,
            alt: 'Imagem de um inseto na cor roxa.',
        }
    },
    IDEA: {
        title:'Ideia',
        image:{
            source: ideaImageUrl,
            alt:'Imagem de uma lâmpada na cor amarela.',
        }
    },
    OTHER:{
        title:'Outros',
        image:{
            source: otherImageUrl,
            alt: 'Imagem de uma nuvem na cor azul.'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSend, setFeedbackSend] = useState(false);
 
    function handleRestartFeedback(){
        setFeedbackSend(false);
        setFeedbackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

{feedbackSend ? (
    <FeedbackSuccessStep 
        onFeedbackRestartRequested={handleRestartFeedback}
     />
    ):(
    <>
    {!feedbackType ? (<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />):
    (
    <FeedbackContentStep 
        feedbackType={feedbackType}
        onFeedbackRestartRequested={handleRestartFeedback}
        onFeedbackSend={() =>setFeedbackSend(true)}
     />
    )}
    </>
)}
            <footer className="text-xs text-neutral-400">
               Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    );
}
