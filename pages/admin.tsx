import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { pushAllMutation } from '../utils/useFirebase'

const Admin: NextPage = () => {
  const [msgTitle, setTitle] = useState('Note to Self')
  const [msgBody, setBody] = useState("Don't send global push notifications")

  const sendAll = () => {
    pushAllMutation(msgTitle, msgBody)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Pushy Push JR - Admin</title>
        <meta name='description' content='Generated by Pushy Push Jr' />
        <link rel='icon' href='/PushyPushJRImage.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Admin</h1>

        <a className={styles.card}>
          <h2>Enter custom Push Message to send to everyone who has ever visited this page! &rarr;</h2>
          <p>Title:</p>
          <input type='text' value={msgTitle} onChange={(input) => setTitle(input.currentTarget.value)} />
          <h3>{msgTitle}</h3>

          <p>Body:</p>
          <input type='text' value={msgBody} onChange={(input) => setBody(input.currentTarget.value)} />
          <h3>{msgBody}</h3>

          <button onClick={sendAll}>Send IT!</button>
        </a>
      </main>
    </div>
  )
}

export default Admin
