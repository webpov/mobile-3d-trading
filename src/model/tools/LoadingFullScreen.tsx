import Link from "next/link";

export function LoadingFullScreen() {
    return (<>
        <div className="mainbackground h-100vh flex-center">
          <div className="flex-col">
            <div className="tx-white opacit-50 tx-xl tx-altfont-1 hover-3">Loading...</div>
            <Link href="/" className="z-600 nodeco bg-w-10 bord-r-50 mt-3 pl-8 Q_xs_pl-2  opaci-chov--50" >
              <div className="flex gap-1 pa-2 flex-justify-start" >
                <div className="tx-lgx" > 🎱 </div>
                <div className="tx-lgx tx-white tx-altfont-1 " > Go Home </div>
              </div>
            </Link>
          </div>
        </div>
    </>)
}