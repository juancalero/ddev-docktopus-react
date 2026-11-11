// frontend_react/src/App.jsx
// #ddev-generated: If you want to edit and own this file, remove this line.
import { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('Cargando…')
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Node API served by ddev-docktopus-node-api (proxied to /api).
    fetch('/hello')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => setMessage(d.message))
      .catch(() => setMessage('API Node no disponible (instala ddev-docktopus-node-api)'))

    fetch('/api/users')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setUsers)
      .catch(() => setUsers([]))
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Docktopus + React</h1>
      <p>{message}</p>
      {users.length > 0 && (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name} — {u.email}</li>
          ))}
        </ul>
      )}
    </main>
  )
}
