import {useState, useEffect} from 'react';
import './DataGrid.css';

const PAGE_SIZE = 5;

export default function DataGrid() {
 const [status, setStatus] = useState('loading');
 const [data, setData] = useState([]);
 const [error, setError] = useState(null);
 const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(data.length / PAGE_SIZE);
const start = (currentPage - 1) * PAGE_SIZE;
const currentPageData = data.slice(start, start + PAGE_SIZE);

useEffect(() => {
    let mounted = true;

    async function loaddata() {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            if(!res.ok) throw new Error(`Http ${res.status} ${res.statusText}`);
            const json = await res.json();
            if (mounted) {
                setData(json);
                setStatus(json?.length > 0 ? 'success' : 'empty');
            }
        } catch (err) {
            if (mounted) {
                setError(err.message);
                setStatus('error');
            }
        }
    }

    loaddata();

    return () => {
        mounted = false;
    };
}, []);

  if (status === 'loading') return (
    <div className="state" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );

  if (status === 'error') return (
    <div className="state state--error" role="alert">
      <p>⚠️ {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  if (status === 'empty') return (
    <div className="state" role="status">No data found.</div>
  );

  return (
    <main className='grid-wrap'>
        <h1>Users</h1>
        <table aria-label='User Table'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                </tr>
            </thead>
            <tbody>
                {currentPageData.map(u=> (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <nav className='pagination' aria-label='pagination'>
            <button onClick={() => setCurrentPage(p=>p-1)}
            disabled={currentPage==1}
            aria-label='Previous page'>
                ← Prev
            </button>
            <span aria-live="polite">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p=>p+1)}
            disabled={currentPage==totalPages}
            aria-label='Next page'>
                Next →
            </button>
        </nav>
    </main>
  )
}