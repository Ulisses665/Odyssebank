'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

const CONTA_FIXA = 'M.Ulisses'
const SENHA_FIXA = 'Black_1287'

export default function LoginBank() {
  const router = useRouter()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const autenticar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const formData = new FormData(event.currentTarget)
    const conta = String(formData.get('conta') ?? '').trim()
    const senha = String(formData.get('senha') ?? '').trim()

    if (!conta || !senha) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    if (conta !== CONTA_FIXA || senha !== SENHA_FIXA) {
      setError('Conta ou senha incorretos.')
      return
    }

    // Autenticado: salvar token simples e nome de usuário, depois redirecionar
    localStorage.setItem('odyssebank_token', 'authenticated')
    localStorage.setItem('odyssebank_user', conta)
    router.push('/dashboard')
  }

  const handleCancel = () => {
    setAccount('')
    setPassword('')
    setError('')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.brand}>Odyssebank</h1>
        <p className={styles.subtitle}>Entre com sua conta e senha</p>

        <form className={styles.form} onSubmit={autenticar}>
          <label className={styles.field}>
            <span className={styles.label}>Conta</span>
            <input
              className={styles.input}
              id="account"
              name="conta"
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="CONTA_FIXA"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Senha</span>
            <input
              className={styles.input}
              id="password"
              name="senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="SENHA_FIXA"
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button className={styles.btnPrimary} type="submit">Entrar</button>
            <button className={styles.btnSecondary} type="button" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}


