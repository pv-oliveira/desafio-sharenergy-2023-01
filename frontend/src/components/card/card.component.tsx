import React from 'react'

import { dataType } from '../../pages/random-users/random-users'

import './card.styles.css'

type CardProps = {
  data: dataType
}

/* Componente que recebe os dados dos usuarios e os exibe */


const Card = ({ data }: CardProps) => {
  return (
      <div className='card-container'>
          <img src={data.picture.large} />
          <h3>{`${data.name.title}. ${data.name.first} ${data.name.last}`}</h3>
          <ul>
              <li>{data.email}</li>
              <li>{data.login.username}</li>
              <li>{data.dob.age}</li>
          </ul>
      </div>
  );
}

export default Card