import React from 'react'
import axios from 'axios'
import {Select, Typography, Row, Col, Card} from "antd";
import moment from 'moment';
const{Option}=Select;
function News({simplified})
{
  let [responseData1, setResponseData] = React.useState('');
  let [responseData2, setResponseData2] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const {Text, Title} = Typography;
 const count=simplified?6:12
 function fetchData () {
    axios({
      "method": "GET",
      "url": "https://crypto-news11.p.rapidapi.com/cryptonews/bitcoin",
      params: {max_articles: count, last_n_hours: '48', top_n_keywords: '10'},
      "headers": {
       
        
        'X-RapidAPI-Key': 'c1b8b011e1msh1d522edf8bb7164p10779ejsne4276e0e410b',
        'X-RapidAPI-Host': 'crypto-news11.p.rapidapi.com'
        
      }
    })
    .then((response) => {
      console.log(response.data)
    
      setResponseData(response.data)
    
    })
    .catch((error) => {
      console.log(error)
    })
  }
  React.useEffect(() => {
fetchData();
  }, [])

  function fetchData2() {
 
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
      setResponseData2(response.data)
    
  
      //console.log(responseData);
    })
    .catch((error) => {
     
      console.log(error)
    })
  }
  React.useEffect(() => {
  
  fetchData2();
    
  }, [])

  
return (
  <Row gutter={[24,24]}>
     {!simplified && (
     <Col span={24}>
                    <Select style={{ menu: { display: 'block' } }}
                    showSearch
                            className={"select-news"}
                            placeholder={"Select a Crypto"}
                            optionFilterProp={"children"}
                            onChange={(value) =>setSelectedCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value={"Cryptocurrency"}>All</Option>
                        {responseData1&&responseData1.articles.map((news)=><Option value={news.source}>{news.source}</Option>)}
                        
                    </Select>
                </Col>)}
    {
     
     (responseData1&&responseData1.articles.map((news)=>(
                   
        
        <Col xs={24} sm={12} lg={8} >
          <Card hoverable className="news-card">
            <a href={news.url}target="_blank" rel="noreferrer">
              <div className="news-image-container">
              
                <Title className="news-title" level={4}>{news.title}</Title>
              </div>
                <p>
              {news.text}
               </p>
               <Text className={"provider-name"}>Source : {news.source}</Text>
            
               <div className="provider-container">
               
                            <Text> {news.date } {moment(news.date).startOf('ss').fromNow()} </Text>
                            </div>
            </a>
          </Card>
        </Col>
      )))
     }
    
  </Row>
  )

}
export default News;
