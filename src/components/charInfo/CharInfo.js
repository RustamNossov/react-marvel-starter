import {Component} from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


import './charInfo.scss';

class CharInfo extends Component {
    
    

   


    render() {
        

        const {chars:{comics, description, homepage, isTherePicture, name, thumbnail, wiki}, isLoading, charInfoError} = this.props
       // console.log(this.props.chars)
       if (charInfoError) {
        return (
            <div className="char__info">
                <ErrorMessage/>
            </div>
        )
    }
       
       if (isLoading) {
            return (
                <div className="char__info">
                    <Spinner/>
                </div>
            )
        }
        let comicsList;
        
        if (comics !== undefined && comics.length !== 0) {
            comicsList = comics.map((item, i) => {
                if (i > 9) {
                    return null;
                }
                return (
                    <li className="char__comics-item">
                        {item.name}
                    </li>
                )
            });
        } else {console.log('else'); comicsList = [<div className="char__descr">We haven't find any comics with this character</div>]}
        
        
  
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
                    {/* In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda. */}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comicsList}
                    {/* <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li> */}
                </ul>
            </div>
        )
    }
}

export default CharInfo;