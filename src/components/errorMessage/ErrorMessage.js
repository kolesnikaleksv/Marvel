import img from './error.gif';

    // const ErrorMessage = () => {
// If my image is in the 'public' folder
    //     return(
    //         <img src={process.env.PUBLIC_URL + '/error.gif'}/>
    //     )
    // }

const ErrorMessage = () => {
    return (
        <img style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}}  src={img} alt="Error"/>
    )
}

export default ErrorMessage;