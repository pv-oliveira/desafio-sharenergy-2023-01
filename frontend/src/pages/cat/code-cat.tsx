import React, { useState } from "react";

import statusList from "../../data/status-code.json";

import './code-cat.styles.css'

const Cat = () => {
  //State that receives input data to be incremented by the api
  //State que recebe dados do input para ser incrementado a api
  const [data, setData] = useState<React.SetStateAction<number>>(1); 

  // Function that assigns the value entered to the "data" hook
  // Função que atribui valor inserido ao hook "data" 
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.valueAsNumber)
  }

  return (
    <>
    <div className="input-cat-container">
    <input className="input-cat" placeholder="enter the code" type='number' onChange={onChangeInput} />
    </div>
      <div className="card-cat-container">
        <div className="card-details-container">
          <div className="text-container">
            <h6>Code: {statusList.find(item => data === parseInt(item.code))?.code || statusList[20].code} </h6>
            <h6> Phrase: {statusList.find(item => data === parseInt(item.code))?.phrase || statusList[20].phrase}</h6>
            <h6> Description: {statusList.find(item => data === parseInt(item.code))?.description || statusList[20].description}</h6>
          </div>
          <div>
            <img src={`https://http.cat/${data || statusList[20]}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cat;
