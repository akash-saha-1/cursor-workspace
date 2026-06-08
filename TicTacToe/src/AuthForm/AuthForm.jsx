import { useState } from 'react';
import './AuthForm.css';

function validateEmail(email){
    if(email?.trim() === '') return 'Email is required';
    if(!email.includes('@')) return 'Email must contain @';
    return null;
}

function validatePassword(v){
    if(v?.trim() === '') return 'Password is required';
    if(v.length < 6) return 'Password must be at least 6 characters';
    return null;
}

function StepEmail({data, onChange, onNext}) {
    const [error, setError] = useState(null);

    function submit(e) {
        e.preventDefault();
        const err = validateEmail(data.email);
        if(err) {
            setError(err);
            return;
        }
        setError('');
        onNext();
    }

    return (
        <form className="auth-form" onSubmit={submit} noValidate>
            <h2> Step 1 - Email</h2>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email" 
                    value={data.email} 
                    onChange={e => onChange('email', e.target.value)}
                    aria-describedby="email-error"
                    className={error ? 'input--err' : ''}  
                />
                {error && <p id="email-error" className="err" role="alert">{error}</p>}
            </div>
            <button type="submit" className="btn-primary">Continue →</button>
        </form>
    )
}

function StepPassword({ data, onChange, onBack, onDone }) {
  const [err, setErr] = useState('');

  function submit(e) {
    e.preventDefault();
    const msg = validatePassword(data.password);
    if (msg !== null) { setErr(msg); return; }
    setErr('');
    onDone();
  }

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <h2>Step 2 — Password</h2>
      <p className="email-tag">Signing in as <strong>{data.email}</strong></p>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password" type="password"
          value={data.password}
          onChange={e => onChange('password', e.target.value)}
          aria-invalid={err !== ''}
          aria-describedby={err ? 'pw-err' : undefined}
          className={err ? 'input--err' : ''}
        />
        {err !== '' && (
          <span id="pw-err" className="err" role="alert">{err}</span>
        )}
      </div>
      <div className="row">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button type="submit" className="btn-primary">Sign In</button>
      </div>
    </form>
  );
}

function Success({email}) {
    return (
        <div className="success" role="status">
            <span>✅</span>
            <h2>Welcome!</h2>
            <p>Signed in as <strong>{email}</strong></p>
    </div>
    )
}

export default function AuthForm() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({email: '', password: ''});

    function handleChange(field, value){
        setData(prev => ({...prev, [field]: value}));
    }

    return (
        <main className="auth-wrap">
            {step < 3 && (
                <nav className="steps" aria-label="Progress">
                    <div className={`dot ${step >= 1 ? 'dot--on' : ''}`}>1</div>
                    <div className="line" />
                    <div className={`dot ${step >= 2 ? 'dot--on' : ''}`}>2</div>
                </nav>
            )}

            {step === 1 && (
                <StepEmail data={data} onChange={handleChange} onNext={() => setStep(2)} />
            )}
            {step === 2 && (
                <StepPassword data={data} onChange={handleChange} onBack={() => setStep(1)} onDone={() => setStep(3)} />
            )}
            {step ===3 && < Success email={data.email} />}
        </main>
    )

}