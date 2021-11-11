import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        showComponent: true
    }

    toggleComponent = () => {
        this.setState((state) => {
            return {
                showComponent: !state.showComponent
            }
        })
    }
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    {this.state.showComponent ? <RandomChar/>: null}
                    <button onClick={this.toggleComponent}>
                        Click here
                    </button>
                    {/* <RandomChar/> */}
                    <div className="char__content">
                        <CharList/>
                        <CharInfo/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;