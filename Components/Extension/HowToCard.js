import React from 'react';



const HowToCard =({title, instructions, index})=>{

    return(
        <div>
    
       <div className="flex flex-col">

           <p style={{display:"flex"}} >  <span  className="pt-5 mb-2 justify-center uppercase  bold mr-5">{index +1} . </span> <span className="flex pt-5 mb-2 justify-center uppercase  bold" >{title} </span></p>
       

       </div>
       <div style={{textAlign:"left"}} className="flex pt-2 mb-2 ">
           {instructions}

       </div>
    </div>
    )
        

}


export default HowToCard