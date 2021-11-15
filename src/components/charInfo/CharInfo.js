import { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
        }


    marvelService = new MarvelService();
    
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }
    onCharLoading = () => {
        this.setState({loading:true})
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {thumbnail, name, wiki, homepage, description, comics} = char;
    let style = {objectFit: "cover"};
        if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            style = {objectFit: "contain"};
        }
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} style={style} alt={name}/>
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
                {/* <ComicsList char={char}/> */}
                {comics.length > 0 ? null : "There is no comics about this character"}
                {   
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if(i > 9) return;// if we have many elements of this array,
                        //this will be the wrong way to solve the problem
                        //and to avoid problems with es-lint, we need to use
                        //the line before it. 
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}
// const ComicsList = ({char}) => {
//     const {comics} = char;
//     console.log(comics.length);
//     // const arr = comics.length ? comics.slice(0, 10) :  "<div> SDFSDF</div>";
//     if(comics.length) {
//         const arr = comics.slice(0, 10);
//         const list = arr.map((item, i) => {
//             return(
//                 <li key={i} className="char__comics-item">
//                     {item.name}
//                 </li>
//             )
//         })
    
//         return list;
//     } else { return (
//                 <div className="char__comics-item">
//                     There is no comics for this character
//                 </div>
//                 )
//     }
// }

export default CharInfo;