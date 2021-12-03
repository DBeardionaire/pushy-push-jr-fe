import { useEffect, useState } from "react"
import { getFirebaseToken } from "./firebase"

const fetcher = <TData, TVariables>(query: string, variables?: TVariables): (() => Promise<TData>) => {
    return async () => {
        const res = await fetch('/api/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        })

        const json = await res.json()

        if (json.errors) {
            const { message } = json.errors[0] || 'Error..'
            console.error(message)
            throw new Error(message)
        }

        return json.data
    }
}

const setFireMutation = `mutation setFire($firebaseKey: String!, $username: String) {
    setFirebaseUserKey(
      firebaseKey: $firebaseKey
      # firebaseKey: "dnx5HBAlorRMD3x0NwjSu-:APA91bEn872YTMLqf3lG0C9cHmVZL0fEUAfFiArpCGrbAWiB9_x0ms09Hd4jRvv6Bon2JrwOn5_CpRMh-G3sVJhUKECTK0GY6xy-QDyev3vwDfl6q2QXB1HucgnvDYa-qZU75A18GNYr"
      username: $username
      # "Scooty Puff JR"
    ) {
      firebasePushUserKey
      iPAddress
      username
    }
  }`

export const setFirekeyMutation = (firebaseKey: string, username?: string) => fetcher<any, { firebaseKey: string, username?: string }>(setFireMutation, { firebaseKey, username })()

export const useFirekeyMutation = () => {
    const [firebaseToken, setFirebaseToken] = useState<string>()
    useEffect(() => {
        getFirebaseToken().then((token) => {
            console.log(token)
            setFirebaseToken(token)
        })
    }, [])

    useEffect(() => {
        if (firebaseToken) {
            setFirekeyMutation(firebaseToken)
                .then((res) => {
                    console.log(`Set fire success: ${res}`)
                })
                .catch(err => {
                    console.error(`Set fire Error: ${err}`)
                })
        }
    }, [firebaseToken])

    return firebaseToken
}