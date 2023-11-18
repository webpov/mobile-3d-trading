"use client"
import Link from "next/link";
import { ReactNode, useState } from "react";

const defaultGameCats = [
    "world",
    "player",
    "goal",
    "all",
]
export type GameCat = {
    href:string
    name:string
    color:string
    emoji:string
    disabled:boolean
}

const defaultGameCatsLookup:Record<string, GameCat> = {
    "world": {
        href: "/x",
        name: "tangible",
        color:"#ffff33",
        emoji: "🌎",
        disabled: false,
    },
    "player": {
        href: "/x",
        name: "non-fungible",
        color:"#0099ff",
        emoji: "🧍",
        disabled: false,
    },
    "goal": {
        href: "/x",
        name: "stateful",
        color:"#ff3333",
        emoji: "⭐",
        disabled: false,
    },
    "all": {
        href: "/x",
        name: "All Categories",
        color:"#00ff00",
        emoji: "👁️",
        disabled: false,
    },
}










export default function HomeStage({children}:{children:ReactNode}) {
    const [gameCats, s__gameCats] = useState(defaultGameCats)
    const [loadingCat, s__loadingCat] = useState("")
    const triggerTypeClick = (categoryString:string) => {
        const lookupGameCat = defaultGameCatsLookup[categoryString]
        if (lookupGameCat.disabled) {
            return
        }
        s__loadingCat(categoryString)
    }
    return (<>
        <div className="tx-white flex-wrap w-100 tx-altfont-1 gap-1 tx-lx ">
            {!!loadingCat && <>
                <div className="flex-col">
                    <div className="tx-lg opaci-50">Loading {loadingCat}...</div>
                    <div className="spin-5 tx-xxxl">|</div>
                </div>
            </>}
            {!loadingCat && gameCats.map((aGameCat:string, index: number) => {
                const lookupGameCat = defaultGameCatsLookup[aGameCat]
                return (<div key={index} className="w-30">
                    <div  
                        className={`h-250px tx-white  nodeco  flex-col flex-justify-start pos-rel ${!lookupGameCat.disabled ? "bg-w-20" : "bg-w-10"}`}
                    >
                        <div className="Q_xs_md tx-mdl pt-4 ">{aGameCat.toUpperCase()}</div>
                        <div className="Q_md_lg tx-xl">{aGameCat}</div>
                        <div className="Q_xl_x tx-xxxl">{aGameCat}</div>

                        <div className=" tx-bold-8 opaci-50 tx-ls-2 tx-center pt-1">
                            <div className="Q_xs tx-xsm ">{lookupGameCat.name}</div>
                            <div className="Q_sm_x tx-mdl">{lookupGameCat.name.toUpperCase()}</div>
                        </div>
                        <Link href={lookupGameCat.disabled ? "/x" : lookupGameCat.href} 
                            onClick={()=>triggerTypeClick(aGameCat)}
                            className="bg-w-10 Q_xs_px-2  tx-white tx-altfont-4 tx-shadow-5 tx-bold-8 flex-center opaci-chov--50 box-shadow-5-b nodeco opaci-chov-50 bord-r-50 w-50 pa-5 pos-abs top-50p mb-4" 
                            style={{
                                border:`1px solid ${lookupGameCat.color}`,
                                color:lookupGameCat.color,
                                opacity: lookupGameCat.disabled ? 0.1 : 1
                            }}
                        >
                            <div className="Q_lg_x tx-lg">View</div>
                            <div>{lookupGameCat.emoji}</div>
                        </Link>
                    </div>
                </div>)
            })}
        </div>
    </>)
}