'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

const CONTA_FIXA = 'M.Ulisses'
const SENHA_FIXA = 'Black_1287'

export default function LoginBank() {
  const router = useRouter()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const conta = account.trim()
    const senha = password.trim()

    if (!conta || !senha) {
      setError('Preencha a conta e a senha antes de entrar.')
      return
    }

    if (conta !== CONTA_FIXA || senha !== SENHA_FIXA) {
      setError('Conta ou senha incorretos. Tente novamente.')
      return
    }

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
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <div className={styles.header}>
          <p className={styles.badge}>Acesso ao sistema</p>
          <h1 className={styles.brand}>Odyssebank</h1>
          <p className={styles.subtitle}>Entre com sua conta e senha para continuar.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Conta</span>
            <input
              className={styles.input}
              id="account"
              name="conta"
              type="text"
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              placeholder="Digite a conta"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Senha</span>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                id="password"
                name="senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite a senha"
              />
              <button
                className={styles.togglePassword}
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          {error ? <div className={styles.error}>{error}</div> : null}

          <div className={styles.actions}>
            <button className={styles.btnSecondary} type="button" onClick={handleCancel}>
              Cancelar
            </button>
            <button className={styles.btnPrimary} type="submit">
              Entrar
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}


