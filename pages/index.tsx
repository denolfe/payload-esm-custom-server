import LinkImport from 'next/link.js'

const Link = (LinkImport.default || LinkImport) as unknown as typeof LinkImport.default

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/a">/a (Pages Router)</Link>
      </li>
      <li>
        <Link href="/b">b (App Router)</Link>
      </li>
    </ul>
  )
}
