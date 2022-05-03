import { feedbackTypes, FeedbackType } from '..';
import { CloseButton } from '../CloseButton';

interface IFeedbackTypeStepProps {
    onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep(props: IFeedbackTypeStepProps){
    return(
        <>
        <header>                
               <span className="text-xl leading-6">
                    Deixe seu feedback
                </span>
                <CloseButton />
        </header>

        <div className="flex py-8 gap-2 w-full">
                { Object.entries(feedbackTypes).map(([key,value]) =>{
                    return(
                        <button
                            key={key}
                            onClick={()=>props.onFeedbackTypeChanged(key as FeedbackType)}
                            className="bg-zinc-800 rounded-6g py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent bhover:border-brand-500 focus:border-brand-500 focus:outline-none"
                            type="button"
                        >
                            <img src={value.image.source} alt={value.image.alt} />
                            <span>{value.title}</span>
                        </button>
                    );
                })}
            </div>
    </>
    );
}
