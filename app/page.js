
'use client'
import React, { useState, useEffect, useReducer } from 'react';
import styles from './page.module.css';


const key = process.env.NEXT_PUBLIC_REACT_APP_API_KEY
console.log(key)

export default function Home() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [optionsArray, setOptionsArray] = useState([]);
  const [loadedContent, setLoadedContent] = useState([]);


  const searchTermList = ['plants', 'river', 'mountians', 'airplane'];

  useEffect(() => {
    const fetchImageData = async () => {
      const imageSet = [];
      for (let i = 0; i < searchTermList.length; i++) {
        const search = searchTermList[i];
        try {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${search}&client_id=${key}&per_page=30`
          );
          const data = await response.json();
          const content = data.results.map((result) => result.urls.regular);
          imageSet.push({ title: search, content });
        } catch (error) {
          console.error(`Error fetching images for ${search}:`, error);
        }
      }
      setOptionsArray(imageSet);
      setLoadedContent(imageSet[0].content);
    };

    fetchImageData();
  }, []);

  function switchBetweenTabsHandler(key) {
    setSelectedOptionIndex(key);
    setLoadedContent(optionsArray[key].content);
  }

  function NavOption(index) {
    const isSelected = selectedOptionIndex === index;
    return (
      <option
        key={index}
        className={isSelected ? styles.selectedOption : styles.option}
        onClick={() => switchBetweenTabsHandler(index)}
      >
        {optionsArray[index].title}
      </option>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        {optionsArray.map((option, index) => NavOption(index))}
      </div>
      {loadedContent && (
        <ul className={styles.mainContent}>
          {loadedContent.map((item, index) => (
            <li className={styles.mainContentItem} key={index}>
              <img
              className={styles.image}
              src={item}
              alt={optionsArray[selectedOptionIndex].title}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}