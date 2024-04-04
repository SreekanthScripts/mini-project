import React, { useState } from "react";

export default function ImageCard(props){
    let imageStyles = {
        width: '100%',
        height: '100%'
    }
    // console.log(props.id)

    let [show , setShow] = useState(false);

    let [isFavorite, setIsFavorite] = useState(false);
    let favItem = React.useRef();

    function showContainer(e){
        setShow(true)
    }
    function hideContainer(e){
        setShow(false)
    }

    // function addToFavorites() {
    //     // Send a request to your backend to add the image to favorites
    //     console.log('Adding to favorites:', { id: props.id, imageUrl: props.url, description: props.alt });
    //     axios.post('http://localhost:5000/', {
    //         id: props.id,
    //         imageUrl: props.url,
    //         description: props.alt
    //     }).then(response => {
    //         // Handle the response, update the UI, etc.
    //         setIsFavorite(!isFavorite);
    //     }).catch(error => {
    //         console.error('Failed to add to favorites:', error);
    //     });
    // }

    
    function addToFavorites(){
        setIsFavorite(!isFavorite);
        if(!isFavorite){
            localStorage.setItem(props.id , [props.url , props.alt , props.user , props.downloadLink , props.shareLink , props.likes])
        }
        else{
            localStorage.removeItem(props.id)
        }
        props.favUpdater(localStorage.length)
    }
    
    function removeItem(){
        // alert();
        console.log(props.id)
        localStorage.removeItem(props.id);
        props.favUpdater(localStorage.length)
    }

    return(
        <div className="card" onMouseOver={showContainer} onMouseOut={hideContainer} ref={favItem}>
            <img src={props.url} alt={props.alt} style={imageStyles} />
            { show && (
                <div className="hover-container">
                    <div className="element-1">
                        <b style={{color:"#FFF"}}>{props.user}</b>
                        <div className="icons">
                            <a href={props.downloadLink}><i className="fa-solid fa-share"></i></a>
                            <a href={props.shareLink}><i className="fa-solid fa-download"></i></a>
                        </div>
                    </div>

                    <div className="likes">
                        <i className="fa-solid fa-thumbs-up"></i>
                        <p>{props.likes}</p>
                    </div>
                    {/* Add to Favorites button */}
                    {props.renderHeart === 'true' ? <i className="fa-solid fa-heart" style={{ color: isFavorite ? 'red' : 'white' }} onClick={addToFavorites}></i> : <button style={{padding: '10px' , border: 'none' , cursor:"pointer"}} onClick={removeItem}>Remove</button>}
                </div>
            )}
        </div>
    )
}
