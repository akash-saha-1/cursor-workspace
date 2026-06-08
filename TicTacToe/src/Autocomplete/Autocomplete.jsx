import { useState, useCallback, useEffect, useRef } from "react";
import './Autocomplete.css';

function debounce(fn,ms){
    let id;
    return (...args) => {
        clearTimeout(id);
        id = setTimeout(()=> fn(...args), ms);
    }
}

export default function Autocomplete() {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState('idle');
    const [active, setActive] = useState(-1);
    const [open, setOpen] = useState(false);


    const abortController = useRef(null);

    async function search(q) {
        if(abortController.current) {
            abortController.current.abort(); // cancel previous request
        }

        const controller = new AbortController();
        abortController.current = controller;
        setStatus('loading');

        try{
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {signal: controller.signal});

            if(!res.ok) throw new Error(`Http ${res.status} ${res.statusText}`);
            const json = await res.json();

            const filtered = json.filter(u => u.name.toLowerCase().includes(q.toLowerCase()));
            setItems(filtered);

            setStatus(filtered?.length === 0 ? 'empty' : 'success');
            setOpen(true);
            setActive(-1);
        } catch(e){
            //AbortError is intentional — don't show error UI
            if(e.name === 'AbortController') return;
            setStatus('error');
        }
    }

    const debounceSearch = useCallback(debounce(search, 300), []);

    useEffect(() => {
        if(query.trim() === ''){
            setOpen(false);
            setItems([]);
            return;
        }
        debounceSearch(query);
    }, [query, debounceSearch]);

    useEffect(()=> {abortController.current?.abort()},[]);

    function select(user){
        setQuery(user.name);
        setOpen(false);
        setActive(-1);
    }

    function onKeyDown(e) {
        if (!open) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setActive(p => Math.min(p+1, items.length-1)); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(p => Math.max(p-1, -1)); }
        if (e.key === 'Enter' && active >= 0) select(items[active]);
        if (e.key === 'Escape') setOpen(false);
    }

    return (
        <main className="ac-wrap">
            <h1>User Search</h1>

            <div className="ac-box" role="combobox" aria-expanded={open}>
                <label htmlFor="search"> Search User</label>
                <input id="search" 
                type="search" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a name..."
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="ac-list"
                aria-activedescendant={active >= 0 ? `opt-${active}` : undefined} />

                <span className="sr-only" aria-live="polite" role="status">
                {status === 'success' ? `${items.length} results` : ''}
                {status === 'empty'   ? 'No results'              : ''}
                </span>

                {open && (
                    <ul id="ac-list" className="dropdown" role="listbox">
                        {status === 'loading' && <li className="ac-msg">Searching...</li>}
                        {status === 'error'   && <li className="ac-msg ac-err" role="alert">⚠️ Error</li>}
                        {status === 'empty' && <li className="ac-msg">No results for "{query}"</li>}
                        {status === 'success' && items.map((u, i) => (
                            <li key={u.id} id={`opt-${i}`}
                            role="option" className={`ac-opt ${i === active ? 'ac-opt--active': ''}`}
                            onMouseDown={() => select(u)}>
                                <b>{u.name}</b>
                                <small>{u.email}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}