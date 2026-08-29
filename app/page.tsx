import { WalimaApp } from '@/components/WalimaShell'
import { HostileForcesAlert, NewsTicker, ParticleCanvas, VHSOverlay } from '@/components/WalimaFX'

export default function Page(){
  return <main><ParticleCanvas/><VHSOverlay/><HostileForcesAlert/><WalimaApp/><NewsTicker/></main>
}
