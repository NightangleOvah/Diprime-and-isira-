'use client'

import { useEffect, useState } from 'react'
import { useWalimaStore } from '@/src/store/useWalimaStore'

const boot=[
 'BIOS DATE 08/29/26 11:44:27 VER 12.0',
 'CPU: Peak Gainz Processor — Speed: Infinite Sabr',
 'MEMORY TEST: 9999999K OK',
 '> Loading Halal_Drivers.sys... [MASHALLAH]',
 '> Allocating Barakah across DOM nodes... [ALHAMDULILLAH]',
 '> Elevator Status: OFFLINE [HOSTILE FORCES DETECTED]',
 '> Mounting Taqiyah renderer... [YALLAH]',
 '> Walima protocol integrity... [SHUKRAN, OK]',
 'SYSTEM READY. INITIALIZING THE INFINITE WALIMA...'
]

export function BootSequence(){
 const {bootComplete,setBootComplete}=useWalimaStore(); const [lines,setLines]=useState<string[]>([])
 useEffect(()=>{if(bootComplete)return;let i=0;const id=setInterval(()=>{if(i<boot.length){setLines(v=>[...v,boot[i++]])}else{clearInterval(id);setTimeout(()=>setBootComplete(true),900)}},260);return()=>clearInterval(id)},[bootComplete,setBootComplete])
 if(bootComplete)return null
 return <div className="fixed inset-0 z-[200] flex items-center bg-black p-6 font-mono text-[#00ff66]"><div className="mx-auto w-full max-w-4xl"><h1 className="mb-8 text-3xl font-bold text-[#ffd700]">*** WALIMA OS v12.0 ***</h1>{lines.map((l,i)=><p key={i} className="mb-2">{l}</p>)}<span className="mt-4 inline-block h-5 w-3 animate-pulse bg-[#00ff66]"/></div></div>
}

export function Hero(){return <section id="home" className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-24 text-center"><div className="mx-auto max-w-5xl"><p className="mb-5 font-mono text-sm tracking-[.35em] text-[#00ff66]">THE INFINITE WALIMA // OMEGA-TIER ARCHIVE</p><h1 className="font-display text-6xl font-bold leading-[.85] text-[#ffd700] drop-shadow-[0_0_22px_rgba(255,215,0,.55)] md:text-9xl">MASHALLAH<br/><span className="text-[#00ff66]">HABIBI</span></h1><p className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-7 text-lg leading-8 backdrop-blur-xl md:text-2xl"><span className="text-[#00ff66]">Bismillah Ar-Rahman Ar-Rahim!</span> Welcome to the most <span className="text-[#ffd700]">Halal, unhinged Walima</span> of the millennium. Yallah, it is officially time! Akhi and Habibi are locking in eternal brotherhood. <span className="text-[#ffd700]">Alhamdulillah</span> for pure gainz and infinite Barakah.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><a href="#dawat" className="rounded-full border-2 border-[#00ff66] px-7 py-3 font-bold text-[#00ff66] shadow-[0_0_25px_rgba(0,255,102,.3)] transition hover:scale-105">ENTER THE DAWAT →</a><button className="rounded-full border-2 border-[#ffd700] px-7 py-3 font-bold text-[#ffd700] transition hover:scale-105" onClick={()=>document.dispatchEvent(new CustomEvent('zaffe'))}>YALLAH, ZAFFE</button></div></div><div className="pointer-events-none mt-20 font-mono text-xs tracking-widest text-white/40">SCROLL ↓ • SABR LOADING • BARAKAH ONLINE</div></section>}

export function WalimaApp(){return <div className="walima-grid min-h-screen overflow-x-hidden bg-[#0f021e]"><BootSequence/><VHSOverlayLocal/><ParticlePlaceholder/><Hero/><section id="dawat" className="relative z-10 mx-auto max-w-6xl px-5 pb-32"><div className="glass rounded-3xl p-8 md:p-14"><p className="text-sm tracking-[.3em] text-[#00ff66]">OUR DAWAT</p><h2 className="mt-3 font-display text-5xl text-[#ffd700] md:text-7xl">The Brotherhood Archive</h2><p className="mt-7 max-w-4xl text-lg leading-8 text-white/80">Wallah, nobody predicted this level of brotherhood. Two legends standing side-by-side in pure Sabr, lifting heavy iron, sipping cold water, and seeking Barakah. Mafi Mushkil — zero drama, maximum loyalty, Alhamdulillah for the ultimate gym-bro synergy.</p></div></section></div>}

function VHSOverlayLocal(){return <div className="pointer-events-none fixed inset-0 z-[80] crt"/>}
function ParticlePlaceholder(){return <div className="pointer-events-none fixed inset-0 z-0 opacity-80"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,255,102,.12),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,215,0,.08),transparent_30%)]"/></div>}
