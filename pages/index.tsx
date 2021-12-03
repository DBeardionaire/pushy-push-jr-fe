import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { useFirekeyMutation } from '../utils/useFirebase'
import { enableNotifications, onNotification } from '../utils/utils'

const Home: NextPage = () => {
  const [customMsg, setCustomMsg] = useState('')
  const firebaseToken = useFirekeyMutation()

  return (
    <div className={styles.container}>
      <Head>
        <title>Pushy Push JR</title>
        <meta name='description' content='Generated by Pushy Push Jr' />
        <link rel='icon' href='/PushyPushJRImage.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Pushy Push JR!
          <img height='369' width='740' src='/PushyPushJRImage.png' alt='Pushy Push JR Image' />
        </h1>

        <p className={styles.description}>
          Get started by enabling Notifications <button onClick={enableNotifications}>Enable Notification(s)</button>
        </p>

        <p className={styles.description}>firebaseToken: {firebaseToken}</p>

        <div className={styles.grid}>
          <a onClick={() => onNotification('Lets Go Pushy Push Jr!')} className={styles.card}>
            <h2>Send Test Push &rarr;</h2>
            <p>Send Test Push Notification from Pushy Push JR!.</p>
          </a>

          <a className={styles.card}>
            <h2>Enter custom Push Message &rarr;</h2>
            <input type='text' onChange={(input) => setCustomMsg(input.currentTarget.value)} />
            <h3>{customMsg}</h3>
            <button onClick={() => onNotification(customMsg)}>Send IT!</button>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>Powered by Pushy Push JR</footer>
    </div>
  )
}

export default Home
