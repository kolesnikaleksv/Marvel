import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }
//Along with the folowing, we can use this method, it is simpler, but
//we cannot do anything in it
    // static getDerivedStateFromError(error) {
    //     return {error: true};
    // }
//now we can use the componentDidCatch
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error:true
        })
    }

    render() {
        if(this.state.error) {
            // return <h2>Something went wrong!</h2>
            return <ErrorMessage/>;
        }
// Give our component
        return this.props.children;
    }
}

export default ErrorBoundary;