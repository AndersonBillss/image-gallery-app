'use client'
import Image from 'next/image'
import styles from './page.module.css'
import {useState} from 'react'


export default function Home() {
  const optionsArray = ['a','b','c','d']
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null)

  function switchBetweenTabsHandler (key) {
    setSelectedOptionIndex(key)
  }

  function NavOption(index){
  console.log(selectedOptionIndex)
  console.log(index)
  console.log(index === setSelectedOptionIndex)
    if(index === setSelectedOptionIndex){
      console.log('selected list: ' + index)
      return(
        <option
        key={index}
        className={styles.selectedOption}
        onClick={() => {switchBetweenTabsHandler(index)}}
        >{optionsArray[index]}</option>
      )
    } else {
      return(
        <option
        key={index}
        className={styles.option}
        onClick={() => {switchBetweenTabsHandler(index)}}
        >{optionsArray[index]}</option>
      )
    }

  }

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        {optionsArray.map((option, index) => (
          
          NavOption(index)
/*           <option
          key={index}
          className={styles.option}
          onClick={() => {switchBetweenTabsHandler(index)}}
          >{optionsArray[index]}</option> */
        ))}
      </div>

      <div className={styles.container}>

      </div>
    </main>
  )
}
