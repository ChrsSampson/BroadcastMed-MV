import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import axios from 'axios';

import {useState, useEffect} from 'react';


export function getServerSideProps() {

  return {
    props: {
      data: 'data'
    }
  }
}

export default function Home() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.API}/test`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        
      </main>
    </>
  )
}
