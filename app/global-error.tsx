'use client'

// Catches errors thrown in the root layout itself. Must render its own
// <html>/<body> because it replaces the entire document tree.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#04060f',
          color: '#eaeef8',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Critical failure</h1>
        <p style={{ color: '#8899cc', marginBottom: '2rem', maxWidth: '28rem' }}>
          The application could not recover. Please reload.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            border: '1px solid #1abc9c',
            color: '#1abc9c',
            background: 'transparent',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
          }}
        >
          Reload
        </button>
      </body>
    </html>
  )
}
