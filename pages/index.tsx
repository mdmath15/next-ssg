import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"

export default function Home({ users }) {
    return (
        <div>
            <h1>GitHub Users</h1>
            <ul>
                {users.map((item) => {
                    return (
                        <li key={item.id}>
                            <Image
                                src={item.avatar_url}
                                alt="User Avatar"
                                width={100}
                                height={100}
                                style={{ borderRadius: 50 }}
                            />
                            <Link href={`/user/${encodeURIComponent(item.login)}`}>
                                <a>{item.login}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch("https://api.github.com/users")
    const data = await response.json()

    return {
        props: {
            users: data,
        },
        revalidate: 60,
    }
}
