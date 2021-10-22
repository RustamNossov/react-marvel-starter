import {Component} from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';

import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';



class RandomChar extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        char: {} ,
        //loading: true,
        error: false,
        loading: true,
        }

    
    
    componentDidMount() {
        this.updateChar();
    }
    
    
    marvelService = new MarvelService();
    
    onCharLoaded =(char) => {
        this.setState({
            char,
            loading: false
            
        })
    }

    onError = () => {
       
        this.setState({
        error: true,
        loading: false})

    }

    onClickUpdateChar=() => {
        this.setState({
            loading: true,
            error: false})
        this.updateChar()
    }

    updateChar = () => {
        this.marvelService
            .getRundomCharacter()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    
    render() {
       
    
        const {char, error, loading} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char = {char}/> : null;
        
        
        return (
                <div className="randomchar">
                    {errorMessage}
                    {spinner}
                    {content}
                    
                    <div className="randomchar__static">
                        <p className="randomchar__title">
                            Random character for today!<br/>
                            Do you want to get to know him better?
                        </p>
                        <p className="randomchar__title">
                            Or choose another one
                        </p>
                        <button className="button button__main"
                                onClick = {this.onClickUpdateChar}>
                            <div className="inner">try it</div>
                        </button>
                        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                    </div>
                </div>
            
        )
    }
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, isTherePicture} = char;

    const newDescr = description.length > 180 ? `${description.substr(0, 180)}...` : description;

    const clazz = isTherePicture ?  "randomchar__img" : "randomchar__img randomchar__no-img"
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={clazz}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {/* As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate... */}
                    {newDescr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;