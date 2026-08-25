"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './dashboard.module.css'

const investments = [
  { id: 1, name: 'CDB Ouro', yield: '10% a.a.', desc: 'Rendimento estável com liquidez diária.' },
  { id: 2, name: 'Fundo Tech Growth', yield: '18% a.a. (estim.)', desc: 'Foco em ações de tecnologia emergente.' },
  { id: 3, name: 'Tesouro Segurança', yield: '6% a.a.', desc: 'Renda fixa e proteção contra inflação.' },
]

type PixTransaction = {
  id: number
  description: string
  amount: number
  date: string
  type: 'envio' | 'recebimento'
}

export default function DashboardPage(){
  const router = useRouter()
  const [user, setUser] = useState<string | null>(null)
  const [pixMode, setPixMode] = useState<'envio' | 'recebimento'>('envio')
  const [pixKey, setPixKey] = useState('')
  const [pixAmount, setPixAmount] = useState('')
  const [pixError, setPixError] = useState('')
  const [pixNotice, setPixNotice] = useState('')
  const [transactions, setTransactions] = useState<PixTransaction[]>([])
  const [balance, setBalance] = useState(1000000)

  useEffect(()=>{
    const token = localStorage.getItem('odyssebank_token')
    const storedUser = localStorage.getItem('odyssebank_user')
    if(!token) return router.replace('/')
    const loadUser = window.setTimeout(() => setUser(storedUser), 0)
    return () => window.clearTimeout(loadUser)
  },[router])

  const handleLogout = ()=>{
    localStorage.removeItem('odyssebank_token')
    localStorage.removeItem('odyssebank_user')
    router.push('/')
  }

  const handleInvest = (invName: string) => {
    alert(`Ação simulada: investir em ${invName}`)
  }

  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const handlePixSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPixError('')
    setPixNotice('')

    const amount = Number(pixAmount.replace(',', '.'))
    if (!pixKey.trim() || !pixAmount.trim() || !Number.isFinite(amount) || amount <= 0) {
      setPixError('Informe uma chave Pix e um valor válido.')
      return
    }
    if (amount > balance) {
      setPixError('O valor é maior que seu saldo disponível.')
      return
    }

    setBalance((current) => current - amount)
    setTransactions((current) => [
      { id: Date.now(), description: `Pix enviado para ${pixKey.trim()}`, amount, date: 'Agora', type: 'envio' },
      ...current,
    ])
    setPixKey('')
    setPixAmount('')
    setPixNotice(`Pix de ${formatCurrency(amount)} agendado com sucesso.`)
  }

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText('odyssebank@pix.com')
    setPixNotice('Chave Pix copiada.')
  }

  const initials = user ? user.replace(/\s+/g, '').slice(0, 2).toUpperCase() : 'US'

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.profile}>
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=7c3aed&color=fff&size=120&bold=true`} alt="Foto de perfil" className={styles.avatar} />
            <div>
              <div className={styles.greeting}>Olá, {user ?? 'Usuário'}</div>
              <div className={styles.muted}>Bem-vindo à sua conta</div>
            </div>
          </div>

          <div className={styles.balance}>
            <div className={styles.muted}>Saldo disponível</div>
            <div className={styles.balanceValue}>{formatCurrency(balance)}</div>
            <button onClick={handleLogout} className={styles.logout}>Sair</button>
          </div>
        </header>

        <section className={styles.pixSection}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Transferências instantâneas</p>
              <h1>Pix</h1>
              <p className={styles.muted}>Envie ou receba dinheiro de forma simples.</p>
            </div>
            <div className={styles.pixIcon}>PX</div>
          </div>
          <div className={styles.tabs} role="tablist" aria-label="Operação Pix">
            <button className={pixMode === 'envio' ? styles.activeTab : styles.tab} onClick={() => { setPixMode('envio'); setPixNotice(''); setPixError('') }} role="tab" aria-selected={pixMode === 'envio'}>Enviar Pix</button>
            <button className={pixMode === 'recebimento' ? styles.activeTab : styles.tab} onClick={() => { setPixMode('recebimento'); setPixNotice(''); setPixError('') }} role="tab" aria-selected={pixMode === 'recebimento'}>Receber Pix</button>
          </div>

          {pixMode === 'envio' ? (
            <form className={styles.pixForm} onSubmit={handlePixSubmit}>
              <label className={styles.field}><span>Chave Pix</span><input value={pixKey} onChange={(event) => setPixKey(event.target.value)} placeholder="CPF, e-mail, telefone ou chave aleatória" /></label>
              <label className={styles.field}><span>Valor</span><div className={styles.amountInput}><b>R$</b><input value={pixAmount} onChange={(event) => setPixAmount(event.target.value)} inputMode="decimal" placeholder="0,00" /></div></label>
              {pixError && <p className={styles.error}>{pixError}</p>}
              {pixNotice && <p className={styles.notice}>{pixNotice}</p>}
              <button className={styles.pixButton} type="submit">Continuar com Pix</button>
            </form>
          ) : (
            <div className={styles.receiveBox}>
              <div className={styles.qrPlaceholder} aria-hidden="true">▦</div>
              <div><h2>Minha chave Pix</h2><p className={styles.key}>{'odyssebank@pix.com'}</p><p className={styles.muted}>Compartilhe esta chave para receber pagamentos.</p><button className={styles.copyButton} type="button" onClick={handleCopyKey}>Copiar chave</button>{pixNotice && <p className={styles.notice}>{pixNotice}</p>}</div>
            </div>
          )}
        </section>

        <section className={styles.historySection}>
          <div className={styles.sectionTitle}><h2>Últimas movimentações</h2><span>{transactions.length} registros</span></div>
          <div className={styles.transactions}>
            {transactions.map((transaction) => (
              <article className={styles.transaction} key={transaction.id}>
                <div className={`${styles.transactionIcon} ${transaction.type === 'envio' ? styles.sent : styles.received}`}>{transaction.type === 'envio' ? '↑' : '↓'}</div>
                <div className={styles.transactionInfo}><strong>{transaction.description}</strong><span>{transaction.date}</span></div>
                <strong className={transaction.type === 'envio' ? styles.sentText : styles.receivedText}>{transaction.type === 'envio' ? '-' : '+'} {formatCurrency(transaction.amount)}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.investmentSection}>
          <h2>Opções de Investimento</h2>
          <div className={styles.investments}>
            {investments.map(inv=> (
              <article key={inv.id} className={styles.investment}>
                <div className={styles.investmentHead}>
                  <strong>{inv.name}</strong>
                  <span>{inv.yield}</span>
                </div>
                <p className={styles.muted}>{inv.desc}</p>
                <button onClick={()=>handleInvest(inv.name)} className={styles.investButton}>Investir</button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
