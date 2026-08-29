'use client'

import { useMemo, useState } from 'react'
import { useWalimaStore } from '@/src/store/useWalimaStore'

const links = [
  ['home', 'HOME'],
  ['dawat', 'DAWAT'],
  ['characters', 'CAST'],
  ['soundboard', 'SOUND'],
  ['schedule', 'SCHEDULE'],
  ['rsvp', 'RSVP'],
] as const

export function WalimaCommandCenter() {
  const [open, setOpen] = useState(false)
  const { brainrotLevel, discoveries, achievements, soundEnabled, setSoundEnabled } = useWalimaStore()
  const unlocked = achievements.filter((item) => item.unlocked).length
  const rank = useMemo(() => {
    if (brainrotLevel >= 75) return 'OMEGA WALIMA LEGEND'
    if (brainrotLevel >= 40) return 'CERTIFIED HABIBI'
    if (brainrotLevel >= 15) return 'DAWAT OPERATIVE'
    return 'NEW ARRIVAL'
  }, [brainrotLevel])

  return (
    <>
      <header className="fixed left-1/2 top-3 z-[120] w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2">
        <div className="glass flex items-center justify-between rounded-2xl px-3 py-2">
          <a href="#home" className="rounded-xl px-3 py-2 font-black tracking-[.18em] text-[#ffd700]">D&amp;H</a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-xs font-bold text-white/70 transition hover:bg-[#00ff66]/10 hover:text-[#00ff66]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="hidden rounded-xl border border-white/10 px-3 py-2 text-[11px] text-white/65 sm:block">
              AUDIO {soundEnabled ? 'ON' : 'OFF'}
            </button>
            <button onClick={() => setOpen((value) => !value)} className="rounded-xl border border-[#00ff66]/40 px-3 py-2 text-xs font-black text-[#00ff66] md:hidden" aria-expanded={open} aria-label="Open navigation">
              MENU
            </button>
          </div>
        </div>
        {open && (
          <nav className="glass mt-2 grid grid-cols-2 gap-1 rounded-2xl p-2 md:hidden">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-xs font-bold text-white/75 hover:bg-[#00ff66]/10 hover:text-[#00ff66]">{label}</a>
            ))}
          </nav>
        )}
      </header>

      <div className="fixed bottom-12 left-3 z-[70] hidden w-56 rounded-2xl border border-white/10 bg-[#0f021e]/85 p-3 shadow-[0_0_24px_rgba(0,255,102,.12)] backdrop-blur-xl lg:block">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[.2em] text-white/50">
          <span>WALIMA STATUS</span>
          <span className="text-[#00ff66]">ONLINE</span>
        </div>
        <p className="mt-2 text-sm font-black text-[#ffd700]">{rank}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-[#00ff66] transition-all" style={{ width: `${Math.min(100, brainrotLevel)}%` }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-white/50">
          <span>XP {brainrotLevel}</span>
          <span>DISC {discoveries}</span>
          <span>🏆 {unlocked}</span>
        </div>
      </div>
    </>
  )
}
