import React from "react";





export default function ImageCard(props){
    let imageStyles = {
        width: '100%',
        height: '100%'
    }

    let [show , setShow] = React.useState(false);

    function showContainer(e){
        setShow(true)
    }
    function hideContainer(e){
        setShow(false)
    }

    return(
        <div className="card" onMouseOver={showContainer} onMouseOut={hideContainer}>
        <img src={props.url} alt={props.alt} style={imageStyles} />
            {
                show 
                && 
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

                    <i className="fa-solid fa-heart" onClick={(e)=>e.target.style.color = "red"}></i>
            </div>}
        </div>
    )
}
