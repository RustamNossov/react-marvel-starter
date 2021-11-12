import {useState, useCallback} from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [charId, setCharId] = useState(null)
    const onChangeCharId = useCallback((charId)=> {
        setCharId(charId)
    }, [])
    return (
        <>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
            
            <div className="char__content">
                <ErrorBoundary>
                    <CharList 
                        onChangeCharId={(id)=>onChangeCharId(id)}/>
                </ErrorBoundary>
                
                    <ErrorBoundary>
                        <CharInfo charId={charId}/>
                    </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
    )
}

export default MainPage;