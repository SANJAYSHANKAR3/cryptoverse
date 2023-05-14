
import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic} from "antd";
import {Link} from 'react-router-dom';
import axios from 'axios'
import {Cryptocurrencies,News} from '../components'
const {Title} = Typography;
function Homepage(){
let [responseData, setResponseData] = React.useState('');
function fetchData ()  {
  axios({
    "method": "GET",
    "url": "https://coinranking1.p.rapidapi.com/coins",
    "headers": {
     
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "94b5abf932msha063fb09c4fa868p1828b2jsn645312cbca7b"
    }, "params": {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '50',
      offset: '0'
    }
  })
  .then((response) => {
    setResponseData(response.data)
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
            <div className={"dark-global-crypto-stats"}>
                <Title level={2} className={"heading"}>Global Crypto Stats</Title>
                <main>
                  {responseData &&
                <Row>

                    <Col span={12}><Statistic title={"Total Cryptocurrencies"} value={responseData&&responseData.data.stats.total}/></Col>
                    <Col span={12}><Statistic title={"Total Exchanges"} value={responseData&&responseData.data.stats.totalExchanges}/></Col>
                    <Col span={12}><Statistic title={"Total Market Cap"} value={millify(responseData&&responseData.data.stats.totalMarketCap)}/></Col>
                    <Col span={12}><Statistic title={"Total 24h Volume"} value={millify(responseData&&responseData.data.stats.total24hVolume)}/></Col>
                    <Col span={12}><Statistic title={"Total Markets"} value={responseData&&responseData.data.stats.totalMarkets}/></Col>
                </Row>
}</main>
            </div>
           <div  className='home-heading-container'>
      <Title level={3}className="home-title">Top 10 Cryptocurrencies in the world</Title>
      <Title level={3}className="show-more"><Link to="/Cryptocurrencies">Show More</Link></Title>
           </div>
           <Cryptocurrencies simplified />
           <div  className='home-heading-container'>
            <Title level={3}className="home-title">Latest Crypto News</Title>
            <Title level={3}className="show-more"><Link to="/news">Show More</Link></Title>
           </div>
           <News simplified/>
           </>
       
    )
}

export default Homepage;