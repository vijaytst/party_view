import React, { useState } from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Transition } from '@tailwindui/react';
import { FaqData } from  './Data';




const Faq = ({question,answer}) => {
  const [ToggleView, setToggleView] = useState(true);
  const [isOpen, setIsOpen] = useState(false)



  const HandleToggle = () => {
    setToggleView(!ToggleView);
    setIsOpen(!isOpen)
    
  };

  return (

    <div className="flex" style={{width:'100%'}}>

     <div className="flex-row w-full mt-5" >
           <div className="flex" onClick={HandleToggle}>
              <div >
               <button onClick={HandleToggle}>{ToggleView ? (
            <PlusCircleOutlined
               onClick={HandleToggle}
               style={{ fontSize: "35px" }}
             />
           ) : (
             <MinusCircleOutlined
               onClick={HandleToggle}
               style={{ fontSize: "35px" }}
             />
           )}</button>

               </div>
               <div className="ml-2 mt-1 font-bold text-xl font-sans " >
                   <h3 className="uppercase text-lg text-grey-darkest" >{question} </h3>

               </div>
           </div>
          <div>
        <Transition
         show={isOpen}
         enter="transition-opacity duration-100"
         enterFrom="opacity-0"
         enterTo="opacity-100"
         leave="transition-opacity duration-150"
         leaveFrom="opacity-100"
         leaveTo="opacity-0"
       >
         <div className="ml-5 mt-5 bg-gray-light rounded p-5">
         <h3 className="text-md text-black font-serif-roboto">{answer}</h3>
         
         </div>
        
         {/* Will fade in and out */}
       </Transition>

           </div>
       </div>


        
      
    </div>
  );
};

export default Faq;
