import React, { useEffect, useState } from 'react';
import './App.css';
const country = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Åland Islands', code: 'AX' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'AndorrA', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Antarctica', code: 'AQ' },
  { name: 'Antigua and Barbuda', code: 'AG' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Aruba', code: 'AW' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' },
];

const fruits = [
  { name: 'Apple' },
  { name: 'Banana' },
  { name: 'Grapes' },
  { name: 'Pineapple' },
];

const App = () => {
  const [firstList, setFirstList] = useState([]);
  const [totalText, setTotalText] = useState('');
  const [lastText, setLastText] = useState('');
  const [includeDot, setIncludeDot] = useState(false);
  const textChange = (e) => {
    const alltext = e.target.value;
    let length = alltext.length;
    if (alltext[length - 1] === '.') {
      setIncludeDot(true);
    } else {
      setIncludeDot(false);
    }
    setTotalText(alltext);
    // console.log(e.target.value.split(' ').pop());
    const lastValue = e.target.value.split(' ').pop();
    if (lastValue.includes('.')) {
      setIncludeDot(true);
      const last = lastValue.split('.').pop();
      setLastText(last);
    } else {
      setLastText(lastValue);
    }
  };

  console.log(includeDot);
  useEffect(() => {
    if (!includeDot) {
      setFirstList(
        country.filter((v) =>
          v.name.toLowerCase().includes(lastText.toLowerCase())
        )
      );
    } else {
      setFirstList(
        fruits.filter((v) =>
          v.name.toLowerCase().includes(lastText.toLowerCase())
        )
      );
    }
  }, [lastText, includeDot]);
  // console.log(lastText);
  const searchDataClick = (textClick) => {
    console.log(includeDot, textClick);
    if (includeDot) {
      // const lastWord = totalText.split('.').pop();
      let lastIndex = totalText.lastIndexOf('.');
      let data = totalText.substring(0, lastIndex);
      data = data + '.' + textClick;
      setTotalText(data);
    } else {
      let lastIndex = totalText.lastIndexOf(' ');
      let data = totalText.substring(0, lastIndex);
      data = data + ' ' + textClick;
      setTotalText(data);
    }
    // console.log(textClick);
  };
  // console.log(secondList);

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
        {totalText.length > 0 && (
          <div className="showContent">
            {firstList.length > 0 &&
              firstList.map((item, index) => {
                return (
                  <div key={index} onClick={() => searchDataClick(item.name)}>
                    {item.name}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
