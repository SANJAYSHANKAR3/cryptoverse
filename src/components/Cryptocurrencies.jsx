import React from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom'
import {Card,Row,Col,Input} from 'antd';
import { Homepage } from '../components';
import axios from 'axios';

const Cryptocurrencies = ({simplified}) => {
const count=simplified?10:100;
  let [responseData, setResponseData] = React.useState('');


 
 function fetchData() {
 
    axios({
      "method": "GET",
      "url": "https://coinranking1.p.rapidapi.com/coins",
      "headers": {
       
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": "120a52a56cmsh645d397f98d4746p163356jsnbf4ae7a9879e"
      }, "params": {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: count,
        offset: '0'
      }
    }    )
    

    .then((response) => {
      console.log(response.data)
      setResponseData(response.data)
    
  
      //console.log(responseData);
    })
    .catch((error) => {
     
      console.log(error)
    })
  }
  React.useEffect(() => {
  
  fetchData();
    
  }, [])


  return (
    
    <>
{!simplified && (
            <div className={"search-crypto"}>
                <Input placeholder={"Search Cryptocurrency"} />
            </div>)}
    <Row gutters={[32,32]} className={'crypto-card-container'}>
    {responseData &&responseData.data.coins.map((item)=>(//to show one by one for array of values
           <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.uuid}>
            <Link key={item.uid} to='/CryptoDetails'>   
                 <Card style={{
                                margin: "5px",
                                borderRadius: "10px",
                                overflow: "hidden"
                            }}
                           
                   title={`${item.rank}. ${item.name}`}
                   extra={<img className='crypto-image'src={item.iconUrl} alt={"alt"}/>}
                   hoverable
                   >     
                   <p>Price: {millify(item.price)}</p>
                   <p>Market Cap: {millify(item.marketCap)}</p>
                    <p>Daily Change: {millify(item.change)}%</p>
      </Card>
    </Link>  
  </Col>))}

    </Row>
                  
   
    </>
  );
};

export default Cryptocurrencies
