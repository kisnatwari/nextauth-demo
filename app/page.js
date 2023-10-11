import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';
import User from './components/User';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Server side rendered data</p>
      <pre>{JSON.stringify(session)}</pre>
      <p>Client side rendered data</p>
      <pre>
        <User/>
      </pre>
    </main>
  )
}
