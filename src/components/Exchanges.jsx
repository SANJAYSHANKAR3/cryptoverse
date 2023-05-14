import React from 'react'
import {useParams} from 'react-router-dom';
const Exchanges = () => {
  const {coinId}=useParams();
  return (
    <div>
      exchanges{coinId}
    </div>
  )
}

export default Exchanges
