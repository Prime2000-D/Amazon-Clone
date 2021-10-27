import React from 'react'
import './Home.css'
import Product from './Product';
function Home() {
    return (
      <div className="home">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/61Z8j18g29L._SX3000_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="123546985"
            title="iQOO Z3 5G (Cyber Blue, 8GB RAM, 128GB Storage) | India's First SD 768G 5G Processor | 55W FlashCharge"
            rating={5}
            price={20999}
            image="https://m.media-amazon.com/images/I/615CXlFtDDS._SY606_.jpg"
          />
          <Product
            id="123547441"
            title="JBL Go 2 3 Watt Wireless Bluetooth Portable Speaker (Pearl Champagne)"
            rating={4}
            price={1800}
            image="https://m.media-amazon.com/images/I/813ZHLL9zFL._SY450_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="123512356"
            title="HP Pavilion Gaming 10th Gen Intel Core i5 Processor 15.6-inch(39.6 cm) FHD Gaming Laptop"
            rating={4}
            price={64000}
            image="https://m.media-amazon.com/images/I/611VHOvjkES._SX679_.jpg"
          />
          <Product
            id="123568789"
            title="Titan Neo Analog Dial Men's Watch"
            rating={4}
            price={4395}
            image="https://m.media-amazon.com/images/I/712B-FSfXqS._UL1500_.jpg"
          />
          <Product
            id="123546985"
            title="Borosil Pronto Induction Base Stainless Steel Pressure Cooker 3L"
            rating={3}
            price={2070}
            image="https://m.media-amazon.com/images/I/51Ka6R-hCYL._SL1000_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="123598631"
            title="OnePlus 163.8 cm (65 inches) U Series 4K LED Smart Android TV 65U1S (Black) (2021 Model)"
            rating={4}
            price={68999}
            image="https://m.media-amazon.com/images/I/71jv5i4cRKS._SL1500_.jpg"
          />
        </div>
      </div>
    );
}

export default Home
