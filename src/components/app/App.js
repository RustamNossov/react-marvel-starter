import {Component} from 'react';

import MarvelService from '../../services/MarvelService';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        chars: {},
        charInfoLoading: true
    }

    onChangeCharId = (charId) => {
        this.setState({charInfoLoading : true})

        const marvelService = new MarvelService();
        marvelService.getCharacter(charId)
        .then(res => {
            this.setState({
                chars: res, 
                charInfoLoading: false
            })
        })
        
    }


    render() {

        return (
            <div className="app">
                <AppHeader/>
                <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                    
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList 
                                onChangeCharId={(id)=>this.onChangeCharId(id)}/>
                        </ErrorBoundary>
                        
                            <ErrorBoundary>
                                <CharInfo 
                                        chars={this.state.chars}
                                        isLoading = {this.state.charInfoLoading}
                                        charInfoError = {this.state.charInfoError}/>
                            </ErrorBoundary>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
} 
    


export default App;