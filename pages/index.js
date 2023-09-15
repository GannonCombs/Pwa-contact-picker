import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

  const [validBrowser, setValidBrowser] = useState(false)
  const [firstContact, setFirstContact] = useState("fake first contact")
  const [firstNumber, setFirstNumber] = useState("fake first number")

  useEffect(() => {
    if ("contacts" in navigator) {
      // Do something with Contact Picker API 
      console.log("Browser supporterd")
      setValidBrowser(true)
      getContacts()
     } else {
      console.log("Your browser doesn't support Contact Picker API");
      setValidBrowser(false)
     }
  });

  const getContacts = async () => {
    console.log("Getting contacts...")
    if ("contacts" in navigator && "select" in navigator.contacts) {
      try {
        const contacts = await navigator
         .contacts
         .select(
          ['name', 'tel'],
          {multiple: true}
         );
        
        //console.log("Your first contact: " + contacts[0].name + " " + contacts[0].tel);
        
        console.log("Your contacts: " , contacts)
        setFirstContact(contacts[0].name)
        setFirstNumber(contacts[0].tel)
      } catch (e) {
        console.log("Unexpected error happened in Contact Picker API" , e);
      }
     } else {
      console.log("Your browser doesn't support Contact Picker API");
     }
  }


  return (
    <div className={styles.background} >
      <h1> Contact loading PWA </h1>
      <p>Valid browser? {validBrowser.toString()}</p> 
      {validBrowser && <div>
        <p>First contact: {firstContact}</p>
        <p>First number: {firstNumber}</p>
        </div>}
      <button className={styles.button} onClick={getContacts}> Get Contacts </button>
    </div>
  )
}
