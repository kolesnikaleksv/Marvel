import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1560,
        charEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        // this.updateListChar();
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading(); // We switch the value of newItemLoading to true
        this.marvelService
            .getAllCaracters(offset)
            .then(this.onCharsLoaded)
            .catch(this.errorMessage)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    
    onCharsLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            ended = true;
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }
    errorMessage = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    renderItems(arr) {
        const items =  arr.map((item) => {
            let style = {objectFit: "cover"};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                style = {objectFit: "contain"};
            }
            return (
                <li 
                    className="char__item" 
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)} >
                    <img src={item.thumbnail} style={style} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    render() {
        const {chars, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{"display": charEnded ? "none" : "block"}}
                    onClick={() => this.onRequest(offset)} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;