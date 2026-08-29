'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useWalimaStore } from '@/src/store/useWalimaStore'

const events = [
  ['12:00 PM', 'Fajr Gainz & Bismillah', 'Heavy bench press session led by Naren at the Fajr Iron Temple. Sabr mode: ACTIVE.'],
  ['02:00 PM', 'Sacred Bubble Bath Dua', 'Achintha enters the gold tub with rubber ducks for maximum focus. Mashallah, zero skip-leg-days energy.'],
  ['04:00 PM', 'The Great Halal Feast (Walima)', 'Lamb chops, garlic toum and cold water. Simon coordinates the catering, Alhamdulillah.'],
  ['06:00 PM', 'Dabke Beatdrop', 'Abu Famous enters the circle shouting: Habibi, trust the process!'],
] as const

function tone(ctx: AudioContext, frequency: number, duration: number, type: OscillatorType = 'sine', gain = 0.06, delay = 0) {
  const osc = ctx.createOscillator()
  const amp = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay)
  amp.gain.setValueAtTime(0.0001, ctx.currentTime + delay)
  amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + delay + 0.015)
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration)
  osc.connect(amp).connect(ctx.destination)
  osc.start(ctx.currentTime + delay)
  osc.stop(ctx.currentTime + delay + duration + 0.03)
}

export function Soundboard() {
  const ctx = useRef<AudioContext | null>(null)
  const [bass, setBass] = useState(false)
  const { soundEnabled, setSoundEnabled, incrementBrainrot, unlockAchievement } = useWalimaStore()

  const getCtx = () => {
    if (typeof window === 'undefined') return null
    if (!ctx.current) ctx.current = new AudioContext()
    if (ctx.current.state === 'suspended') void ctx.current.resume()
    return ctx.current
  }

  const zaffe = () => {
    if (!soundEnabled) return
    const audio = getCtx()
    if (!audio) return
    ;[0, 0.12, 0.24].forEach((d, i) => tone(audio, 260 + i * 140, 0.18, 'square', 0.08, d))
    tone(audio, 90, 0.5, 'sawtooth', 0.09, 0.34)
    window.dispatchEvent(new CustomEvent('walima-confetti'))
    incrementBrainrot(4)
    unlockAchievement('zaffe')
  }

  const boom = () => {
    if (!soundEnabled) return
    const audio = getCtx()
    if (!audio) return
    tone(audio, 55, 0.45, 'sawtooth', 0.16)
    tone(audio, 110, 0.2, 'square', 0.08, 0.03)
    incrementBrainrot(2)
  }

  const chant = () => {
    if (!soundEnabled) return
    const audio = getCtx()
    if (!audio) return
    setBass(true)
    ;[110, 146.83, 164.81, 220].forEach((f, i) => tone(audio, f, 0.5, 'triangle', 0.07, i * 0.16))
    window.dispatchEvent(new CustomEvent('walima-chant'))
    incrementBrainrot(3)
    window.setTimeout(() => setBass(false), 900)
  }

  useEffect(() => () => { void ctx.current?.close() }, [])

  return <section id="soundboard" className={`relative z-10 mx-auto max-w-7xl px-5 pb-28 ${bass ? 'bass-drop' : ''}`}>
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div><p className="font-mono text-xs tracking-[.3em] text-[#00ff66]">PHASE 05 // WALIMA AUDIO GRID</p><h2 className="mt-2 font-display text-5xl text-[#ffd700] md:text-7xl">THE SOUND PORTAL</h2></div>
      <button onClick={() => setSoundEnabled(!soundEnabled)} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/75">Audio: {soundEnabled ? 'ON' : 'OFF'} • Shukran</button>
    </div>
    <div className="grid gap-5 md:grid-cols-3">
      <button onClick={zaffe} className="glass group rounded-3xl p-7 text-left transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(0,255,102,.25)]"><span className="text-4xl">📣</span><h3 className="mt-4 text-2xl font-black text-[#00ff66]">Press for Zaffe</h3><p className="mt-2 text-white/65">Airhorn-style tones + beat-drop pulse + confetti. Yallah!</p></button>
      <button onMouseEnter={boom} onClick={boom} className="glass rounded-3xl p-7 text-left transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,0,80,.2)]"><span className="text-4xl">🚨</span><h3 className="mt-4 text-2xl font-black text-[#ffd700]">Astaghfirullah Alert</h3><p className="mt-2 text-white/65">A dramatic browser boom for suspicious UI interactions.</p></button>
      <button onClick={chant} className="glass rounded-3xl p-7 text-left transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(255,215,0,.24)]"><span className="text-4xl">🕌</span><h3 className="mt-4 text-2xl font-black text-[#ffd700]">Subhanallah Chant</h3><p className="mt-2 text-white/65">Bass pulse + glowing chant event. Tabarakallah!</p></button>
    </div>
  </section>
}

export function ScheduleMatrix() {
  return <section id="schedule" className="relative z-10 mx-auto max-w-7xl px-5 pb-28">
    <div className="mb-10"><p className="font-mono text-xs tracking-[.3em] text-[#00ff66]">SCHEDULE MATRIX // 04 NODES</p><h2 className="mt-2 font-display text-5xl text-[#ffd700] md:text-7xl">THE DAWAT TIMELINE</h2></div>
    <div className="grid gap-4 md:grid-cols-2">
      {events.map(([time, title, copy], index) => <article key={time} className="glass rounded-3xl p-6 transition hover:-translate-y-1"><div className="flex gap-5"><div className="font-mono text-[#00ff66]">0{index + 1}</div><div><time className="font-mono text-sm text-[#ffd700]">{time}</time><h3 className="mt-1 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-white/70">{copy}</p></div></div></article>)}
    </div>
  </section>
}

const RSVP_OPTIONS = [
  'Inshallah, I will attend (Wallah 100% attendance, max muscle active).',
  'Alhamdulillah, I am coming solely for the free Halal meat platter.',
  'La, I am uninvited because my biceps are under 16 inches (Astaghfirullah).',
]

export function RSVPPortal() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [choice, setChoice] = useState(RSVP_OPTIONS[0])
  const [submitted, setSubmitted] = useState(false)
  const { incrementBrainrot, discover } = useWalimaStore()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const existing = JSON.parse(localStorage.getItem('walima-rsvps') || '[]')
    existing.push({ name, email, choice, submittedAt: new Date().toISOString() })
    localStorage.setItem('walima-rsvps', JSON.stringify(existing.slice(-50)))
    setSubmitted(true)
    incrementBrainrot(5)
    discover()
  }

  return <section id="rsvp" className="relative z-10 mx-auto max-w-4xl px-5 pb-32">
    <div className="glass rounded-[2rem] p-7 md:p-12">
      <p className="font-mono text-xs tracking-[.3em] text-[#00ff66]">RSVP PORTAL // SECURE WALIMA NODE</p>
      <h2 className="mt-3 font-display text-5xl text-[#ffd700] md:text-7xl">Will You Join Us?</h2>
      {submitted ? <div className="mt-8 rounded-2xl border border-[#00ff66]/40 bg-[#00ff66]/5 p-7"><p className="text-2xl font-black text-[#00ff66]">Alhamdulillah — RSVP received.</p><p className="mt-2 text-white/70">Shukran, {name || 'Habibi'}! Your response is saved locally on this device.</p><button onClick={() => setSubmitted(false)} className="mt-5 rounded-xl border border-[#ffd700] px-4 py-2 text-[#ffd700]">Edit RSVP</button></div> : <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block"><span className="mb-2 block text-sm text-white/60">Full name / اسم</span><input required value={name} onChange={e => setName(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 outline-none focus:border-[#00ff66]" placeholder="Your name, Akhi" /></label>
        <label className="block"><span className="mb-2 block text-sm text-white/60">Email / بريد إلكتروني</span><input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 outline-none focus:border-[#00ff66]" placeholder="you@example.com" /></label>
        <label className="block"><span className="mb-2 block text-sm text-white/60">Choose your dawat fate / اختر مصيرك</span><select value={choice} onChange={e => setChoice(e.target.value)} className="w-full rounded-2xl border border-white/15 bg-[#0f021e] px-4 py-3 outline-none focus:border-[#00ff66]">{RSVP_OPTIONS.map(option => <option key={option}>{option}</option>)}</select></label>
        <button className="w-full rounded-2xl border-2 border-[#ffd700] bg-[#ffd700]/10 px-5 py-4 font-black text-[#ffd700] transition hover:scale-[1.01]">SEND RSVP • YALLAH</button>
      </form>}
      <p className="mt-6 text-xs text-white/40">Demo-safe mode: no external service is contacted. Connect Supabase later for shared guest management, Inshallah.</p>
    </div>
  </section>
}

export function Phase5() {
  return <div><Soundboard/><ScheduleMatrix/><RSVPPortal/></div>
}
