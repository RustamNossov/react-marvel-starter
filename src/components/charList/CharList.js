import {Component} from 'react';
import CharItem from '../charItem/CharItem';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        loadingMore: false,
        error: false,
        buttonDisabled: false,
        buttonVisible: true,
        counter: 1,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onloadCharacters()
    }

    onloadCharacters = ()=> {

        const rndOffset = Math.floor(Math.random() * 1500)
        this.marvelService.getAllCharacters(9, rndOffset)
        .then(res=> {
            this.props.onChangeCharId(res[0].id)
            this.setState({
                chars: res,
                loading: false})
        })
        .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onMoreItems=()=> {
        this.setState({
            
                loadingMore: true,
                buttonDisabled: true,
                counter: this.state.counter + 1
            
            
        })
       
        

        const rndOffset = Math.floor(Math.random() * 1500)
        this.marvelService.getAllCharacters(9, rndOffset)
        .then(res=> {

            const data = [...this.state.chars, ...res];

            this.setState({
                chars: data,
                loadingMore: false,
                buttonDisabled: false
            })

            if (this.state.counter > 4) {
                console.log(this.state.counter)
                this.setState({
                    buttonVisible: false
                })
            }
            
        })
        .catch(this.onError)

    }

    onCharSelect = (e) => {
        this.props.onChangeCharId(+e.currentTarget.getAttribute('data-key'))
        document.querySelectorAll('.char__item').forEach(item => {
            item.classList.remove('char__item-selected')
            if (item.getAttribute('data-key') === e.currentTarget.getAttribute('data-key')) {
                item.classList.add('char__item-selected')
            }
        })
        
    }

    
    
    
   
    
    render() {

        const {chars, loading, error, loadingMore, buttonDisabled} = this.state;

        const content = chars.map((item, i)=> {
            const clazz = item.isTherePicture ? 'char_img' : 'char_no_img';
            const itemClazz = i===0 ? "char__item char__item-selected" : "char__item"
            return (
                <li className={itemClazz}
                    key = {item.id}
                    data-key={item.id}
                    onClick={this.onCharSelect}>
                    <img src={item.thumbnail} className={clazz} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        const elementLoading = loading ? [<li></li>, <Spinner/>] : null
        const elementError = error ? [<li></li>, <ErrorMessage/>] : null
        const elementContent = !loading && !error ? content : null
        
        const moreSpinner = loadingMore ? <Spinner/> : 'load more';
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {elementLoading}
                    {elementError}
                    {elementContent}
                    
                </ul>
                <button 
                    className="button button__main button__long"
                    onClick={this.onMoreItems}
                    disabled = {buttonDisabled}
                    style={{'display': this.state.buttonVisible ? 'block' : 'none'}}>
                    <div className="inner">{moreSpinner}</div>
                </button>
            </div>
        )
    }
}

export default CharList;