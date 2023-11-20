import Link from "next/link";


import LinkGridStage from "@/dom/organ/stage/LinkGridStage";


export default function Home() {
  

  return (
    <main className="mainbackground h-min-100vh flex-col flex-align-start py-100">
     <Link href="/" className="z-600 nodeco pl-8 Q_xs_pl-2 pos-abs top-0 mb-8 left-0 opaci-chov--50" >
        <div className="flex gap-1 pa-2 flex-justify-start" >
          <div className="tx-lx" > 🎱 </div>
          <div className="tx-lx tx-white tx-altfont-1 " > Home </div>
        </div>
      </Link>
      <LinkGridStage>
      </LinkGridStage>
      
      <div className="w-100 flex flex-justify-end">
        <Link href="/" className="z-600 nodeco pl-8 Q_xs_pl-2 pt-8  opaci-chov--50" >
            <div className="flex gap-1 pa-2 flex-justify-start" >
              <div className="tx-lx tx-white tx-altfont-1 px-8" > ← Go Back </div>
            </div>
        </Link>
      </div>
    </main>
  )
}
