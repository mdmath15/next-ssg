import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

export default function User({ user }) {
    const {isFallback} = useRouter()

    if (isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{user.login}</h1>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch("https://api.github.com/users")
    const data = await response.json()

    const paths = data.map((item) => {
        return {
            params: {
                login: item.login,
            },
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const login = context.params.login
    const response = await fetch(`https://api.github.com/users/${login}`)
    const data = await response.json()
    console.log(data)

    return {
        props: {
            user: data,
        },
    }
}
