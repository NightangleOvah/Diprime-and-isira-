'use client'

import { useEffect, useMemo, useState } from 'react'
import { useWalimaStore } from '@/src/store/useWalimaStore'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','KeyB','KeyA']

export function AchievementDrawer(){
  const [open,setOpen]=useState(false)
  const { achievements, brainrotLevel } = useWalimaStore()
  const unlocked=achievements.filter(a=>a.unlocked).length
  return <>
    <button onClick={()=>setOpen(v=>!v)} className="fixed right-4 top-4 z-[70] rounded-full border border-[#00ff66]/60 bg-[#0f021e]/80 px-4 py-2 font-mono text-xs text-[#00ff66] backdrop-blur">🏆 {unlocked}/{achievements.length} • BRAINROT {brainrotLevel}</button>
    <aside className={`fixed right-0 top-0 z-[160] h-full w-[min(92vw,420px)] transform border-l border-[#00ff66]/40 bg-[#0f021e]/95 p-6 shadow-[-20px_0_60px_rgba(0,255,102,.12)] backdrop-blur-xl transition-transform ${open?'translate-x-0':'translate-x-full'}`}>
      <div className="flex items-center justify-between"><div><p className="font-mono text-xs tracking-[.25em] text-[#00ff66]">ARCHIVE // ACHIEVEMENTS</p><h2 className="mt-2 font-display text-4xl text-[#ffd700]">Walima Badges</h2></div><button onClick={()=>setOpen(false)} className="rounded-lg border border-white/20 px-3 py-2">✕</button></div>
      <div className="mt-6 space-y-3">{achievements.map(a=><div key={a.id} className={`rounded-2xl border p-4 ${a.unlocked?'border-[#ffd700]/60 bg-[#ffd700]/5':'border-white/10 bg-white/[.03] opacity-60'}`}><div className="flex gap-3"><span className="text-2xl">{a.unlocked?'🏆':'🔒'}</span><div><h3 className="font-bold text-white">{a.title}</h3><p className="mt-1 text-sm leading-6 text-white/65">{a.description}</p></div></div></div>)}</div>
      <p className="mt-6 text-sm text-[#00ff66]">Mashallah. Every discovery adds Barakah to your brainrot ledger.</p>
    </aside>
  </>
}

export function KonamiEngine(){
  const [active,setActive]=useState(false)
  const { incrementBrainrot, unlockAchievement, setKonamiProgress, discover }=useWalimaStore()
  useEffect(()=>{
    let progress=0
    const onKey=(event:KeyboardEvent)=>{
      if(event.code===KONAMI[progress]){progress+=1;setKonamiProgress(progress);incrementBrainrot();if(progress===KONAMI.length){progress=0;setKonamiProgress(0);discover();unlockAchievement('konami');setActive(true);window.setTimeout(()=>setActive(false),9000)}}else progress=event.code===KONAMI[0]?1:0
    }
    window.addEventListener('keydown',onKey)
    return()=>window.removeEventListener('keydown',onKey)
  },[discover,incrementBrainrot,setKonamiProgress,unlockAchievement])
  const silhouettes=useMemo(()=>Array.from({length:18},(_,i)=>i),[])
  if(!active)return null
  return <div className="fixed inset-0 z-[190] grid place-items-center overflow-hidden bg-[#0f021e]/95 p-5 backdrop-blur-sm">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,255,102,.25),transparent_35%),linear-gradient(90deg,rgba(255,215,0,.08),transparent,rgba(0,255,102,.08))]"/>
    <div className="relative z-10 text-center"><p className="font-mono text-xs tracking-[.4em] text-[#00ff66]">SECRET PROTOCOL // ZAFFE-06</p><h2 className="mt-4 text-5xl font-black text-[#ffd700] drop-shadow-[0_0_25px_#ffd700] md:text-8xl">INFINITE DABKE</h2><p className="mt-3 text-white/70">Up Up Down Down B A — Mashallah, you found the hidden floor.</p><div className="mt-10 flex max-w-4xl flex-wrap justify-center gap-5">{silhouettes.map(i=><div key={i} className="dabke-dancer text-5xl" style={{animationDelay:`${i*70}ms`}}>🕺</div>)}</div><button onClick={()=>setActive(false)} className="mt-12 rounded-full bg-[#00ff66] px-7 py-3 font-black text-black">RETURN TO THE DAWAT</button></div>
  </div>
}

export function DiscoveryToast(){
  const [message,setMessage]=useState<string|null>(null)
  const { discover }=useWalimaStore()
  useEffect(()=>{
    const handler=(event:Event)=>{const detail=(event as CustomEvent<{message?:string}>).detail;setMessage(detail?.message||'New discovery unlocked, habibi.');discover();window.setTimeout(()=>setMessage(null),2800)}
    window.addEventListener('walima-discovery',handler)
    return()=>window.removeEventListener('walima-discovery',handler)
  },[discover])
  if(!message)return null
  return <div className="fixed left-1/2 top-20 z-[180] -translate-x-1/2 rounded-2xl border-2 border-[#ffd700] bg-[#0f021e]/95 px-6 py-4 text-center shadow-[0_0_40px_rgba(255,215,0,.45)]"><p className="text-xs tracking-[.2em] text-[#00ff66]">DISCOVERY UNLOCKED</p><p className="mt-1 font-bold text-white">{message}</p></div>
}
