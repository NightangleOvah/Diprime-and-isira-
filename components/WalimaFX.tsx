'use client'

import { useEffect, useRef, useState } from 'react'
import { useWalimaStore } from '@/src/store/useWalimaStore'

export function VHSOverlay(){ return <div className="pointer-events-none fixed inset-0 z-[80] crt"><div className="scan fixed left-0 top-0 h-24 w-full bg-gradient-to-b from-transparent via-[#ffd700]/15 to-transparent"/></div> }

export function ParticleCanvas(){
  const ref=useRef<HTMLCanvasElement>(null)
  useEffect(()=>{ const c=ref.current; if(!c)return; const x=c.getContext('2d'); if(!x)return; let raf=0; const items=Array.from({length:55},()=>({x:Math.random(),y:Math.random(),s:12+Math.random()*24,v:.001+Math.random()*.003,r:Math.random()*6.28,vr:(Math.random()-.5)*.03,t:['🌯','🦆','💮','💪','✦'][Math.floor(Math.random()*5)]})); const resize=()=>{c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}; const draw=()=>{x.clearRect(0,0,innerWidth,innerHeight);items.forEach(p=>{p.y+=p.v;p.r+=p.vr;if(p.y>1.08){p.y=-.05;p.x=Math.random()}x.save();x.translate(p.x*innerWidth,p.y*innerHeight);x.rotate(p.r);x.font=`${p.s}px serif`;x.shadowColor='#00ff66';x.shadowBlur=12;x.fillText(p.t,0,0);x.restore()});raf=requestAnimationFrame(draw)};resize();addEventListener('resize',resize);draw();return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize)}},[])
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 h-full w-full" aria-hidden="true"/>
}

export function NewsTicker(){ return <div className="fixed bottom-0 left-0 z-50 w-full overflow-hidden border-t-2 border-[#00ff66] bg-[#ffd700] py-2 text-sm font-bold text-black shadow-[0_0_24px_#ffd700]"><div className="marquee whitespace-nowrap">🚨 WALIMA ALERT: Elevator offline. Tactical stairs deployed. Abu Famous reportedly located the premium shawarma supply. Yallah, keep climbing. • MASHALLAH NETWORK STATUS: CHAOTIC BUT OPERATIONAL •</div></div> }

export function HostileForcesAlert(){
 const [show,setShow]=useState(false); const {incrementBrainrot}=useWalimaStore();
 useEffect(()=>{let timer:ReturnType<typeof setTimeout>; const go=()=>{setShow(true);incrementBrainrot(2);setTimeout(()=>setShow(false),2800);timer=setTimeout(go,12000+Math.random()*13000)};timer=setTimeout(go,9000);return()=>clearTimeout(timer)},[incrementBrainrot]);
 if(!show)return null; return <div className="fixed inset-0 z-[100] grid place-items-center bg-red-950/70 p-5 backdrop-blur-md"><div className="max-w-2xl rotate-1 border-4 border-red-500 bg-black p-8 text-center shadow-[0_0_80px_red]"><div className="mb-4 text-4xl font-black text-red-500">⚠ SYSTEM HIJACK ⚠</div><div className="text-xl font-bold leading-relaxed">WE ARE THE HOSTILE FORCES.<br/>WE TOOK DOWN UR ELEVATOR.</div><div className="mt-5 text-red-300">Astaghfirullah. Mafi Mushkil — tactical stairs are active.</div></div></div>
}
