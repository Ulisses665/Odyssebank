"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const investments = [
  { id: 1, name: 'CDB Ouro', yield: '10% a.a.', desc: 'Rendimento estável com liquidez diária.' },
  { id: 2, name: 'Fundo Tech Growth', yield: '18% a.a. (estim.)', desc: 'Foco em ações de tecnologia emergente.' },
  { id: 3, name: 'Tesouro Segurança', yield: '6% a.a.', desc: 'Renda fixa e proteção contra inflação.' },
]

export default function DashboardPage(){
  const router = useRouter()
  const [user, setUser] = useState<string | null>(null)
  const [pixAction, setPixAction] = useState<'send' | 'receive' | null>(null)
  const [pixKey, setPixKey] = useState('contato@odyssebank.com')
  const [pixMessage, setPixMessage] = useState('')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('odyssebank_token')
    const storedUser = localStorage.getItem('odyssebank_user')
    if(!token) return router.replace('/')
    setUser(storedUser)
  },[router])

  const handleLogout = ()=>{
    localStorage.removeItem('odyssebank_token')
    localStorage.removeItem('odyssebank_user')
    router.push('/')
  }

  const handleInvest = (invName: string) => {
    alert(`Ação simulada: investir em ${invName}`)
  }

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setPixMessage('Chave Pix copiada!')
    } catch {
      setPixMessage('Não foi possível copiar a chave.')
    }
  }

  const handlePix = () => {
    const message = pixAction === 'send'
      ? 'Área de envio Pix pronta para você informar o destinatário.'
      : 'Seu QR Code Pix está pronto para receber pagamentos.'
    setPixMessage(message)
  }

  const initials = user ? user.replace(/\s+/g, '').slice(0, 2).toUpperCase() : 'US'

  const handlePixTransfer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!recipient.trim() || !amount.trim()) {
      setPixMessage('Informe o destinatário e o valor para continuar.')
      return
    }
    setPixMessage(`Pix de R$ ${amount} preparado para ${recipient}.`)
  }

  return (
    <main style={{minHeight:'100vh',background:'linear-gradient(180deg,#f5f4f1,#e9e7e2)',color:'#242522',padding:24,display:'flex',justifyContent:'center'}}>
      <div style={{width:'100%',maxWidth:980}}>
        <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=5f625c&color=fff&size=120&bold=true`} alt="Foto de perfil" style={{width:84,height:84,borderRadius:'50%',objectFit:'cover',border:'2px solid #d9d7d1'}} />
            <div>
              <div style={{fontSize:18,fontWeight:600}}>Olá, {user ?? 'Usuário'}</div>
              <div style={{color:'#77766f',fontSize:13}}>Bem-vindo à sua conta</div>
            </div>
          </div>

          <div style={{textAlign:'right'}}>
            <div style={{color:'#77766f',fontSize:13}}>Saldo disponível</div>
            <div style={{fontSize:22,fontWeight:700,marginTop:6}}>R$ 1.000.000,00</div>
            <button onClick={handleLogout} style={{marginTop:10,background:'transparent',color:'#6d4d49',border:'1px solid #c9b6b1',padding:'8px 12px',borderRadius:8,cursor:'pointer'}}>Sair</button>
          </div>
        </header>

        <section style={{background:'#ffffff',padding:20,borderRadius:16,border:'1px solid #dedcd6',marginBottom:18,boxShadow:'0 8px 24px rgba(45,45,40,0.06)'}}>
          <h2 style={{margin:0,fontSize:20}}>Enviar Pix</h2>
          <p style={{margin:'8px 0 18px',color:'#77766f',fontSize:14}}>Preencha os dados para realizar uma transferência.</p>
          <form onSubmit={handlePixTransfer} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))',gap:12,alignItems:'end'}}>
            <label style={{display:'grid',gap:7,fontSize:13,color:'#555650'}}>
              Destinatário
              <input value={recipient} onChange={(event)=>setRecipient(event.target.value)} placeholder="Nome ou chave Pix" style={{background:'#f7f6f3',border:'1px solid #d4d2cb',borderRadius:8,color:'#242522',padding:'11px 12px',outline:'none'}} />
            </label>
            <label style={{display:'grid',gap:7,fontSize:13,color:'#555650'}}>
              Valor
              <input value={amount} onChange={(event)=>setAmount(event.target.value)} placeholder="R$ 0,00" inputMode="decimal" style={{background:'#f7f6f3',border:'1px solid #d4d2cb',borderRadius:8,color:'#242522',padding:'11px 12px',outline:'none'}} />
            </label>
            <button type="submit" style={{background:'#3f433d',color:'#fff',border:0,padding:'11px 15px',borderRadius:8,cursor:'pointer',fontWeight:600}}>Continuar</button>
          </form>
          {pixMessage && <p role="status" style={{margin:'12px 0 0',color:'#586452',fontSize:13}}>{pixMessage}</p>}
        </section>

        <section style={{display:'none',background:'linear-gradient(135deg, rgba(6,182,212,0.16), rgba(124,58,237,0.16))',padding:20,borderRadius:16,border:'1px solid rgba(103,232,249,0.22)',marginBottom:18}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:16,alignItems:'flex-start',flexWrap:'wrap'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span aria-hidden="true" style={{width:30,height:30,display:'grid',placeItems:'center',borderRadius:8,background:'#06b6d4',fontWeight:800}}>P</span>
                <h2 style={{margin:0,fontSize:20}}>Área Pix</h2>
              </div>
              <p style={{margin:'10px 0 0',color:'rgba(255,255,255,0.75)',fontSize:14}}>Envie, receba e gerencie suas transferências instantâneas.</p>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>{setPixAction('send');setPixMessage('')}} style={{background:pixAction === 'send' ? '#06b6d4' : 'rgba(255,255,255,0.08)',color:'#fff',border:0,padding:'9px 14px',borderRadius:8,cursor:'pointer',fontWeight:600}}>Enviar Pix</button>
              <button onClick={()=>{setPixAction('receive');setPixMessage('')}} style={{background:pixAction === 'receive' ? '#7c3aed' : 'rgba(255,255,255,0.08)',color:'#fff',border:0,padding:'9px 14px',borderRadius:8,cursor:'pointer',fontWeight:600}}>Receber</button>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'minmax(0, 1fr) auto',gap:18,alignItems:'center',marginTop:20}}>
            <div>
              <label htmlFor="pix-key" style={{display:'block',fontSize:13,color:'rgba(255,255,255,0.72)',marginBottom:7}}>Sua chave Pix</label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <input id="pix-key" value={pixKey} onChange={(event)=>setPixKey(event.target.value)} style={{flex:'1 1 220px',minWidth:0,background:'rgba(7,16,39,0.7)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:8,color:'#fff',padding:'10px 12px',outline:'none'}} />
                <button onClick={copyPixKey} style={{background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.12)',padding:'9px 12px',borderRadius:8,cursor:'pointer'}}>Copiar chave</button>
              </div>
              {pixAction && <button onClick={handlePix} style={{marginTop:14,background:'linear-gradient(90deg,#06b6d4,#7c3aed)',color:'#fff',border:0,padding:'10px 15px',borderRadius:8,cursor:'pointer',fontWeight:600}}>{pixAction === 'send' ? 'Continuar envio' : 'Gerar cobrança Pix'}</button>}
              {pixMessage && <p role="status" style={{margin:'10px 0 0',color:'#a5f3fc',fontSize:13}}>{pixMessage}</p>}
            </div>
            <div aria-label="QR Code Pix ilustrativo" style={{width:104,height:104,padding:8,background:'#fff',borderRadius:10,display:'grid',gridTemplateColumns:'repeat(5, 1fr)',gap:3}}>
              {[1,1,0,1,1, 1,0,1,0,1, 0,1,1,1,0, 1,0,1,0,1, 1,1,0,1,1].map((cell,index)=><span key={index} style={{background:cell ? '#0b1220' : '#fff',borderRadius:1}} />)}
            </div>
          </div>
        </section>

        <section style={{background:'rgba(255,255,255,0.68)',padding:18,borderRadius:12,border:'1px solid #dedcd6'}}>
          <h2 style={{margin:0,marginBottom:12}}>Opções de Investimento</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))',gap:12}}>
            {investments.map(inv=> (
              <article key={inv.id} style={{background:'#ffffff',padding:12,borderRadius:10,border:'1px solid #e1dfd9'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <strong>{inv.name}</strong>
                  <span style={{color:'#62675d'}}>{inv.yield}</span>
                </div>
                <p style={{margin:0,color:'#77766f',fontSize:13}}>{inv.desc}</p>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:12}}>
                  <button onClick={()=>handleInvest(inv.name)} style={{background:'#8b8b78',color:'#fff',border:0,padding:'8px 12px',borderRadius:8,cursor:'pointer'}}>Investir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
