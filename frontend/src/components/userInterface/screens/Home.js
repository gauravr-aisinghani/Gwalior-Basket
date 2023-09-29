import Header from "../usercomponents/Header"
import MainSlider from "../usercomponents/MainSlider"
import Spacer from "../usercomponents/Spacer"
import Favourite from "../usercomponents/Favourite"
import Footer from "../usercomponents/Footer"
import Trending from "../usercomponents/Trending"
import ExploreByCategories from "../usercomponents/ExploreByCategories"
export default function Home(props){
    return(
        <div style={{overflow:'hidden'}}>
            <div>
            <Header/>
            </div>
            <Spacer/>
            <div style={{display:'flex',justifyContent:'center'}}>
                <MainSlider/>
                </div>
                <Spacer/>
               
                <Spacer/>
                <div style={{display:'flex',justifyContent:'center'}}>
                <Trending/>
                </div>
                 <Spacer/>
                 <div style={{display:'flex',justifyContent:'center'}}>
                <ExploreByCategories/>
                </div>
                 <Spacer/>
                 <div style={{display:'flex',justifyContent:'center'}}>
                <Favourite/>
                </div>
                <Spacer/>
                <Spacer/>
                <div>
                <Footer/>
                </div>
                <Spacer/>
                

            </div>
    )
}