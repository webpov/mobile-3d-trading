import HomeStage from "@/dom/organ/stage/HomeStage";
import Link from "next/link";


export default function Home() {
  

  return (
    <main className="mainbackground h-100vh w-100vw flex-center">
      <Link href="/" className="z-600 nodeco pl-8 Q_xs_pl-2 pos-abs top-0 mb-8 left-0 opaci-chov--50" >
          <div className="flex gap-1 pa-2 flex-justify-start" >
            <div className="tx-lx" > 🎱 </div>
            <div className="tx-lx tx-white tx-altfont-1 " > Game Types </div>
          </div>
      </Link>
      <HomeStage>
      </HomeStage>
    </main>
  )
}
