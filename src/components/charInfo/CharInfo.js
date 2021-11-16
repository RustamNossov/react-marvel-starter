import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


import './charInfo.scss';

const CharInfo = (props) => {

    const [chars, setChars] = useState({})
    const {charId} = props;
    const {getCharacter, error, loading, clearError} = useMarvelService()

    const onChangeCharId = (charId) => {
        console.log('ChangeCharInfo')
        clearError();
        getCharacter(charId)
        .then(res => {
            setChars(res);
        })
    }

    useEffect(()=>{
        if (charId) onChangeCharId(charId) 
    }, [charId])
    
    
    
    if (error) {
        return (
            <div className="char__info">
                <ErrorMessage/>
            </div>
        )
    }
       
    if (loading) {
        return (
            <div className="char__info">
                <Spinner/>
            </div>
        )
    }
    
        
    
    const {comics, description, homepage, name, thumbnail, wiki} = chars
    let comicsList;
    if (comics !== undefined && comics.length !== 0) {
        comicsList = comics.map((item, i) => {
            const url = item.resourceURI
            const comicId = url.slice(url.lastIndexOf('/')+1)
            if (i > 9) {
                return null;
            }
            return (
                <li key={i} 
                    className="char__comics-item">
                    <Link to={{pathname: `/comics/${comicId}`, state: { prpg: `prevPage`} }}>{item.name}</Link>
                </li>
            )
        });
    } else {comicsList = [<div className="char__descr">We haven't find any comics with this character</div>]}
        
    return (
        
            <div className="char__info">
                <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comicsList}
                </ul>
            </div>
           
        
    )
    
}

CharInfo.propTypes = {
    
        id: PropTypes.string
    
}

CharInfo.defaultProps = {
    chars: {
        name: 'TurumTurum'
    }
    
}

export default CharInfo;