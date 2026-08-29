'use client'

import { useEffect, useMemo, useState } from 'react'
import { useWalimaStore } from '@/src/store/useWalimaStore'

const glass = 'rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_0_32px_rgba(0,255,102,.12)]'

function Naren() {
  const [open, setOpen] = useState(false)
  const [presses, setPresses] = useState(0)
  const { incrementBrainrot, discover, unlockAchievement, setActiveCharacter } = useWalimaStore()
  const verified = presses >= 5

  return <article className={`${glass} p-6`}>
    <div className="flex items-start justify-between gap-4">
      <div><p className="font-mono text-xs tracking-[.25em] text-[#00ff66]">CHARACTER_01</p><h3 className="mt-2 text-2xl font-black text-[#ffd700]">Naren</h3><p className="text-white/60">The Bench Press Sheikh • Fajr Iron Temple</p></div>
      <span className="rounded-full border border-[#00ff66]/40 px-3 py-1 text-xs text-[#00ff66]">GAINZ CHECK</span>
    </div>
    <p className="mt-5 leading-7 text-white/80">“Akhi, prove your legendary focus. Click the barbell five times. Sabr, not spam.”</p>
    <button onClick={() => { setOpen(true); setActiveCharacter('naren'); incrementBrainrot() }} className="mt-5 w-full rounded-2xl border-2 border-[#00ff66] px-5 py-4 font-bold text-[#00ff66] transition hover:scale-[1.02] hover:bg-[#00ff66]/10">OPEN THE IRON TEMPLE →</button>
    {open && <div className="mt-5 rounded-2xl border border-[#00ff66]/30 bg-black/60 p-5">
      <button aria-label="Barbell press" onClick={() => { setPresses(v => v + 1); incrementBrainrot() }} className="mx-auto block text-6xl transition active:scale-90 hover:drop-shadow-[0_0_18px_#00ff66]">🏋️</button>
      <p className="mt-3 text-center font-mono text-sm text-white/70">Temple presses: <span className="text-[#ffd700]">{presses}/5</span></p>
      {verified && <button onClick={() => { discover(); unlockAchievement('simon-trap'); setOpen(false) }} className="mt-4 w-full rounded-xl bg-[#00ff66] px-4 py-3 font-black text-black">MASHALLAH — ACCESS VERIFIED</button>}
    </div>}
  </article>
}

function Achintha() {
  const [rice, setRice] = useState<Array<{ id: number; x: number; y: number }>>([])
  const { discover, incrementBrainrot, setActiveCharacter } = useWalimaStore()
  const summon = () => {
    setActiveCharacter('achintha')
    discover()
    const id = Date.now()
    setRice(v => [...v, { id, x: 15 + Math.random() * 70, y: 15 + Math.random() * 55 }])
    window.setTimeout(() => setRice(v => v.filter(item => item.id !== id)), 5000)
  }

  useEffect(() => {
    let buffer = ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key.length !== 1) return
      buffer = (buffer + event.key.toLowerCase()).slice(-5)
      if (buffer === 'mandi') summon()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return <article className={`${glass} relative overflow-hidden p-6`}>
    <p className="font-mono text-xs tracking-[.25em] text-[#00ff66]">CHARACTER_02</p><h3 className="mt-2 text-2xl font-black text-[#ffd700]">Achintha</h3><p className="text-white/60">The Mandi Master • Hidden in the code</p>
    <p className="mt-5 leading-7 text-white/80">Type <kbd className="rounded border border-[#ffd700]/40 px-2 py-1 text-[#ffd700]">MANDI</kbd> anywhere on the page, yallah. Pixel rice will bounce into the DOM.</p>
    <button onClick={summon} className="mt-5 rounded-2xl border-2 border-[#ffd700] px-5 py-3 font-bold text-[#ffd700] transition hover:bg-[#ffd700]/10">SUMMON THE MANDI MASTER</button>
    {rice.map(item => <div key={item.id} className="pointer-events-none absolute text-4xl" style={{ left: `${item.x}%`, top: `${item.y}%`, animation: 'walima-bounce 1.1s ease-in-out infinite alternate' }}>🍚</div>)}
  </article>
}

function Simon() {
  const [alert, setAlert] = useState(false)
  const { incrementBrainrot, unlockAchievement, setActiveCharacter } = useWalimaStore()
  useEffect(() => {
    const first = window.setTimeout(() => setAlert(true), 6500)
    const id = window.setInterval(() => setAlert(true), 18000)
    return () => { window.clearTimeout(first); window.clearInterval(id) }
  }, [])
  return <article className={`${glass} p-6`}>
    <p className="font-mono text-xs tracking-[.25em] text-[#00ff66]">CHARACTER_03</p><h3 className="mt-2 text-2xl font-black text-[#ffd700]">Simon</h3><p className="text-white/60">The Taqiyah Tactician • Vaporwave assistant</p>
    <p className="mt-5 leading-7 text-white/80">Simon scans the Walima network for suspicious levels of chaos. Wallah, his diagnostics are not medically certified.</p>
    <button onClick={() => { setAlert(true); setActiveCharacter('simon'); incrementBrainrot(2) }} className="mt-5 rounded-2xl border-2 border-[#00ff66] px-5 py-3 font-bold text-[#00ff66]">ASK SIMON</button>
    {alert && <div className="fixed inset-x-5 top-24 z-[140] mx-auto max-w-xl rounded-2xl border-4 border-[#00ff66] bg-[#0f021e]/95 p-6 shadow-[0_0_55px_#00ff66]">
      <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs text-[#00ff66]">SIMON.EXE // ALERT</p><h4 className="mt-2 text-2xl font-black text-[#ffd700]">Virus Detected: Insufficient Gainz</h4><p className="mt-3 text-white/80">Mafi Mushkil. The site is still operational, alhamdulillah.</p></div><button onClick={() => { setAlert(false); unlockAchievement('simon-trap'); incrementBrainrot(3) }} className="rounded-lg border border-[#ffd700] px-3 py-2 text-[#ffd700]">DISMISS</button></div>
    </div>}
  </article>
}

function AbuFamous() {
  const [visible, setVisible] = useState(false)
  const [story, setStory] = useState('')
  const { discover, unlockAchievement, setActiveCharacter } = useWalimaStore()
  const stories = useMemo(() => ['Breaking news: the premium shawarma has been located.','Breaking news: the cold-water supply is mysteriously unlimited.','Breaking news: Abu Famous has arrived before the beat drop.','Breaking news: Habibi, trust the process!'], [])

  const spawn = () => {
    setActiveCharacter('abu-famous')
    setStory(stories[Math.floor(Math.random() * stories.length)])
    setVisible(true)
    discover()
    unlockAchievement('abu-famous')
    window.setTimeout(() => setVisible(false), 5200)
  }

  useEffect(() => {
    const id = window.setInterval(() => spawn(), 23000)
    const first = window.setTimeout(() => spawn(), 11000)
    return () => { window.clearInterval(id); window.clearTimeout(first) }
  }, [])

  return <article className={`${glass} p-6`}>
    <p className="font-mono text-xs tracking-[.25em] text-[#00ff66]">CHARACTER_04</p><h3 className="mt-2 text-2xl font-black text-[#ffd700]">Abu Famous</h3><p className="text-white/60">The Legendary Guest • Unnecessary Breaking News Division</p>
    <p className="mt-5 leading-7 text-white/80">He appears without warning, finds the best food somehow, and delivers a motivational speech nobody requested. Mashallah.</p>
    <button onClick={spawn} className="mt-5 rounded-2xl border-2 border-[#ffd700] px-5 py-3 font-bold text-[#ffd700]">SUMMON ABU FAMOUS</button>
    {visible && <div className="fixed inset-0 z-[130] grid place-items-center bg-[#ffd700]/10 p-6 backdrop-blur-sm"><div className="relative max-w-2xl overflow-hidden rounded-3xl border-4 border-[#ffd700] bg-[#0f021e]/95 p-8 text-center shadow-[0_0_90px_rgba(255,215,0,.7)]"><div className="absolute inset-0 -z-0 animate-pulse bg-[radial-gradient(circle,rgba(255,215,0,.22),transparent_45%)]"/><div className="relative z-10"><div className="text-6xl">🧆✨</div><p className="mt-4 font-mono text-xs tracking-[.25em] text-[#00ff66]">ABU FAMOUS LIVE FEED</p><h4 className="mt-3 text-3xl font-black text-[#ffd700]">BREAKING NEWS</h4><p className="mt-4 text-lg leading-8 text-white">{story}</p><button onClick={() => setVisible(false)} className="mt-6 rounded-xl bg-[#ffd700] px-6 py-3 font-black text-black">SHUKRAN, ABU</button></div></div></div>}
  </article>
}

export function CharacterEngine() {
  return <>
    <style>{`@keyframes walima-bounce { from { transform: translate(0,0) rotate(-8deg); } to { transform: translate(22px,48px) rotate(12deg); } }`}</style>
    <section id="characters" className="relative z-10 mx-auto max-w-7xl px-5 pb-28">
      <div className="mb-10"><p className="font-mono text-sm tracking-[.3em] text-[#00ff66]">PHASE 04 // CHARACTER ENGINE</p><h2 className="mt-3 font-display text-5xl text-[#ffd700] md:text-7xl">THE WALIMA CAST</h2><p className="mt-4 max-w-3xl text-white/70">Four legends. Four systems. One chaotic dawat. Yallah, explore the archive.</p></div>
      <div className="grid gap-6 md:grid-cols-2">
        <Naren /><Achintha /><Simon /><AbuFamous />
      </div>
    </section>
  </>
}
