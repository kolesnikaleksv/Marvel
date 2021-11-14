import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        //it is our error
        this.foo.bar = 0;
        // this.updateListChar();
        this.marvelService
        .getAllCaracters()
        .then(this.onCharsLoaded)
        .catch(this.errorMessage)
    }
    onCharsLoaded = (chars) => {
        this.setState({
            chars,
            loading: false
        })
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
        const {chars, loading, error} = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;