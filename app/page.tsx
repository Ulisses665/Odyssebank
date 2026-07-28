'use client';

import { useState } from 'react';

export default function LoginBank() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    setAccount('');
    setPassword('');
  };

  return (
    <form>
      <h1 style={{ fontStyle: 'italic', marginBottom: '20px' }}>Odyssebank</h1>

      <div>
        <label htmlFor="account">Conta</label>
        <input
          id="account"
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          style={{ border: '1px solid #ccc', padding: '8px' }}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: '1px solid #ccc', padding: '8px' }}
        />
      </div>

      <div style={{ marginTop: '15px' }}>
        <button type="submit" style={{ marginRight: '10px' }}>
          Entrar
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
