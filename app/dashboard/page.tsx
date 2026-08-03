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

  const initials = user ? user.replace(/\s+/g, '').slice(0, 2).toUpperCase() : 'US'

  return (
    <main style={{minHeight:'100vh',background:'linear-gradient(180deg,#071027,#0b1220)',color:'#fff',padding:24,display:'flex',justifyContent:'center'}}>
      <div style={{width:'100%',maxWidth:980}}>
        <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=7c3aed&color=fff&size=120&bold=true`} alt="Foto de perfil" style={{width:84,height:84,borderRadius:'50%',objectFit:'cover',border:'2px solid rgba(255,255,255,0.06)'}} />
            <div>
              <div style={{fontSize:18,fontWeight:600}}>Olá, {user ?? 'Usuário'}</div>
              <div style={{color:'rgba(255,255,255,0.75)',fontSize:13}}>Bem-vindo à sua conta</div>
            </div>
          </div>

          <div style={{textAlign:'right'}}>
            <div style={{color:'rgba(255,255,255,0.7)',fontSize:13}}>Saldo disponível</div>
            <div style={{fontSize:22,fontWeight:700,marginTop:6}}>R$ 1.000.000,00</div>
            <button onClick={handleLogout} style={{marginTop:10,background:'#ef4444',color:'#fff',border:0,padding:'8px 12px',borderRadius:8,cursor:'pointer'}}>Sair</button>
          </div>
        </header>

        <section style={{background:'rgba(255,255,255,0.02)',padding:18,borderRadius:12}}>
          <h2 style={{margin:0,marginBottom:12}}>Opções de Investimento</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))',gap:12}}>
            {investments.map(inv=> (
              <article key={inv.id} style={{background:'linear-gradient(180deg, rgba(255,255,255,0.01), transparent)',padding:12,borderRadius:10,border:'1px solid rgba(255,255,255,0.03)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <strong>{inv.name}</strong>
                  <span style={{color:'rgba(255,255,255,0.85)'}}>{inv.yield}</span>
                </div>
                <p style={{margin:0,color:'rgba(255,255,255,0.7)',fontSize:13}}>{inv.desc}</p>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:12}}>
                  <button onClick={()=>handleInvest(inv.name)} style={{background:'linear-gradient(90deg,#06b6d4,#7c3aed)',color:'#fff',border:0,padding:'8px 12px',borderRadius:8,cursor:'pointer'}}>Investir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
