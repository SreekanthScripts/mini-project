import React from "react";
import { BrowserRouter , Routes , Route ,Link} from "react-router-dom";
import ImageCard from "./Components/ImageCard";






function App(){

    let [data ,setData] = React.useState({
        status: false,
        resultsType:false
    })

    let [inputValue , setInputValue] = React.useState("dog");


    React.useEffect(()=>{
        async function getData(){
            try{
                let response = await fetch(`https://api.unsplash.com/search/photos/?query=${inputValue}&client_id=_uaYiR_ub4A4B_DPXVekV55JsF24cdRw_lBqW6SKWjs&per_page=30`);
                let data = await response.json();
                console.log(data)

                if(data.total !== 0 ){
                    setData({status:true , resultsType:true , results:data.results})
                }
                else{
                    setData({status:true , resultsType:false})
                }

            }
            catch(e){
                console.log(e)
            }

        }getData();
    } , [inputValue])


    return(
        <BrowserRouter>
            <header>
                <Link to={"/"}><h1>UNSPLASH.</h1></Link>
                <form action="#" onSubmit={(e)=>{e.preventDefault(); setInputValue(document.getElementById('searchInput').value)}}>
                    <input type="text" id="searchInput" placeholder="eg:Dog..." />
                    <input type="submit" value={"Search"} id="submitButton"/>
                </form>
                <Link to={"/favorates"}><button id="favorates-button">Favorates</button></Link>
            </header>

  

            <Routes>
                <Route path="" element={<div className="images-container">
                {
                    data.status ? data.resultsType ?  data.results.map((result)=>{
                        return <ImageCard key={result.id} url={result.urls.regular} alt={result.alt_description} user={result.user.name} likes={result.likes} downloadLink={result.links.html} shareLink = {result.links.download}/>
                    }) : <b>No Data Found</b> : <div className="loader"></div>
                }   
                </div>}></Route>
                <Route path="/favorates" element={<div><h1>Favorates Page</h1></div>}></Route>
            </Routes>
            
        </BrowserRouter>
    )
}

export default App;
