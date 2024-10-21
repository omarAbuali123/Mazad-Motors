


import React from 'react';

import Hero from './Hero';
import Card from './card';
import High from './F4x4';

import Logocar from './Partners';
import Questions from './Questions';
import NewsAndArticles from './news';


const items = [
  { id: 1,type :'4', image: '', title: 'Car', description: 'سيارات مستعمله وجديده' },
  { id: 2,type :'4', image: '', title: 'جدارية', description: 'لوحات جدارية' },
  { id: 3,type :'5', image: '', title: 'PlayStation', description: 'ألعاب الفيديو' },
  { id: 4,type :'4', image: '', title: 'موبايلات والكترونيات', description: '' },
  { id: 5,type :'5', image: '', title: 'قطع ثمينه من التماثيل والتحف', description: '' },
  { id: 6,type :'4', image: '', title: 'عقارات', description: '' },
  { id: 7,type :'5', image: '', title: 'dwd', description: '' },
  { id: 7,type :'4', image: '', title: 'dwd', description: '' },
  { id: 7,type :'5', image: '', title: 'dwd', description: '' }

];

const Home = () => {
  return (
    <div className="Home">
  
      <Hero />
      <Logocar />

      <main className="main mr-24">
          <Card  items={items}/>
        
      </main>
       <br></br>
      <main className="main">
          <High  items={items}/>
          <div className="ProductDetails"></div>
      </main>


       <main className="mt-8">
       <NewsAndArticles />
      
        </main>

      <Questions />

    </div>
  );
}

export default Home;











