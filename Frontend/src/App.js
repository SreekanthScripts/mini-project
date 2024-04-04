import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImageCard from "./Components/ImageCard";
import Form from "./Components/Form";






function App(){

    let [data ,setData] = React.useState({
        status: false,
        resultsType:false,
        results: []
    })

    let [loginStatus , setLoginStatus] = useState(false);

    let [inputValue , setInputValue] = React.useState("dog");
    let [favLength , setFavLength] = React.useState(localStorage.length);
    console.log(favLength)
    useEffect(() => {
        async function getData(){
            try{
                let response = await fetch(`https://api.unsplash.com/search/photos/?query=${inputValue}&client_id=_uaYiR_ub4A4B_DPXVekV55JsF24cdRw_lBqW6SKWjs&per_page=30`);
                let data = await response.json();
                // console.log(data)

                if(data.total !== 0 ){
                    setData({status:true , resultsType:true , results:data.results})
                }
                else{
                    setData({status:true , resultsType:false, results: []})
                }

            }
            catch(e){
                console.log(e)
            }

        }
        getData();
    }, [inputValue])


    const getFavItems = () => {
        const keys = Object.keys(localStorage);
        return keys.map((k , i) => {
            const item = localStorage.getItem(k).split(",");
            const id = k;
            const url = item[0];
            const alt = item[1];
            const user = item[2];
            const likes = item[5];
            const downloadLink = item[3];
            const shareLink = item[4];
            return (
                <ImageCard
                    key={i}
                    id={id}
                    favUpdater={setFavLength}
                    url={url}
                    alt={alt}
                    user={user}
                    likes={likes}
                    downloadLink={downloadLink}
                    shareLink={shareLink}
                    renderHeart = "false"
                />
            );
        });
    };
    

    return(

        loginStatus ?  
        <BrowserRouter>
            <header>
                <Link to={"/"}><h1>UNSPLASH.</h1></Link>
                <form action="#" onSubmit={(e)=>{e.preventDefault(); setInputValue(document.getElementById('searchInput').value)}}>
                    <input type="text" id="searchInput" placeholder="eg:Dog..." />
                    <input type="submit" value={"Search"} id="submitButton"/>
                </form>
                <Link to={"/favorites"}><button id="favorates-button">Favourites</button></Link>
            </header>

  

            <Routes>
                <Route path="" element={<div className="images-container">
                {
                    data.status ? data.resultsType ?  data.results.map((result)=>{
                        return <ImageCard key={result.id} id={result.id} favUpdater = {setFavLength} url={result.urls.regular} alt={result.alt_description} user={result.user.name} likes={result.likes} downloadLink={result.links.html} renderHeart = 'true' shareLink = {result.links.download}/>
                    }) : <b>No Data Found</b> : <div className="loader"></div>
                }   
                </div>}></Route>
                <Route path="/favorites" element={<div className="images-container">{getFavItems()}</div>}></Route>
            </Routes>
            
        </BrowserRouter> : <Form stateChanger = {setLoginStatus}/>
    )
}

export default App;
