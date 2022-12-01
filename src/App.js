import React, { useEffect, useState } from 'react';
import './App.css';
const country = [
  {
    countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola'],
  },
];

const products = [
  {
    Afghanistan: ['new', 'Beanie', 'Belt', 'Cap', 'Sunglasses', 'Album'],
  },
  {
    Angola: ['old', 'Beanie', 'Belt', 'Cap', 'Sunglassses', 'Album'],
  },
];

const App = () => {
  const [firstList, setFirstList] = useState([]); // create state
  const [totalText, setTotalText] = useState('');
  const [lastText, setLastText] = useState('');
  const [includeDot, setIncludeDot] = useState(false);
  const [countryTxt, setCountryTxt] = useState('');
  const textChange = (e) => {
    const alltext = e.target.value; // this is toatal text of input box
    let length = alltext.length;
    if (alltext[length - 1] === '.') {
      // checking is dot present at last index
      setIncludeDot(true);
    } else {
      setIncludeDot(false);
    }
    setTotalText(alltext);
    const lastValue = e.target.value.split(' ').pop(); // track last word that I can check with data
    if (lastValue.includes('.')) {
      setIncludeDot(true);
      const last = lastValue.split('.').pop();
      setLastText(last);
    } else {
      setLastText(lastValue);
    }
  };

  useEffect(() => {
    if (!includeDot) {
      // if dot not present then filter frst list
      setFirstList(
        country[0].countries.filter((v) =>
          v.toLowerCase().includes(lastText.toLowerCase())
        )
      );
    } else {
      // if dot present then second list
      let list;
      products.map((item) => {
        // filter data of second list with first list property
        if (item[countryTxt] !== undefined) list = item;
      });
      if (list) {
        setFirstList(
          // filter data for second list from list
          list[countryTxt].filter((v) =>
            v.toLowerCase().includes(lastText.toLowerCase())
          )
        );
      }
    }
  }, [lastText, includeDot, countryTxt]); // run every changes of lastText, includeDot, countryTxt
  const searchDataClick = (textClick) => {
    // when click a data from list
    if (includeDot) {
      let lastIndex = totalText.lastIndexOf('.'); // if dot present then seperate with dot (.)
      let data = totalText.substring(0, lastIndex); // remove last word after dot
      data = data + '.' + textClick; // add previous data , a dot (.) and ckicked text
      setTotalText(data);
    } else {
      let lastIndex = totalText.lastIndexOf(' '); // if dot not present then sepereate wit space (' ')
      let data = totalText.substring(0, lastIndex); // remove last word from sentence. Beacuse when we click a data on list then we need to remove last text whatever we texted. otherwise clicked text added after whatever we typed previously.
      data = data + ' ' + textClick; // add previous data, a space (' ') and clicked text
      setTotalText(data);
      setCountryTxt(textClick);
    }
  };

  return (
    <>
      <div className=" mainContent">
        <p> Type here...</p>

        <textarea
          onChange={textChange}
          name="textarea"
          rows="4"
          value={totalText}
          style={{ width: '100%' }}
        ></textarea>
        <div className="showContent">
          {firstList.length > 0 &&
            firstList.map((item, index) => {
              return (
                <div key={index} onClick={() => searchDataClick(item)}>
                  {item}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default App;
