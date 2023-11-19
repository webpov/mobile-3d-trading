"use client"
import Link from "next/link";
import { ReactNode, useState } from "react";
import TopRightMenu from "../overlay/TopRightMenu";

const defaultGameCats = [
    // "world",
    // "player",
    // "goal",
    "examples",
]
export type GameCat = {
    href:string
    name:string
    color:string
    desc?:string
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
    "examples": {
        href: "/x",
        name: "Game Examples",
        color:"#00ff00",
        emoji: "🔠",
        disabled: false,
        desc:"Game Types & Forms of Play by Data Muatability and Refresh Rate",
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
        <div className="tx-white flex-col gap-4 w-100 tx-altfont-1 gap-1 tx-lx py-8 ">
            {!!loadingCat && <>
                <div className="flex-col">
                    <div className="tx-lg opaci-50">Loading {loadingCat}...</div>
                    <div className="spin-5 tx-xxxl">|</div>
                </div>
            </>}
            {!loadingCat && gameCats.map((aGameCat:string, index: number) => {
                const lookupGameCat = defaultGameCatsLookup[aGameCat]
                return (<div key={index} className="w-50">
                    <div  
                        className={`h-250px pt-2 tx-white opaci-hov-75 bord-r-25  nodeco  flex-col flex-justify-start pos-rel ${!lookupGameCat.disabled ? "bg-w-20" : "bg-w-10"}`}
                    >
                        {!!lookupGameCat.name && <>
                          <div className="Q_xs_md tx-mdl pt-4 ">{lookupGameCat.name.toUpperCase()}</div>
                          <div className="Q_md_lg tx-xl">{lookupGameCat.name}</div>
                          <div className="Q_xl_x tx-xxxl">{lookupGameCat.name}</div>
                        </>}

                        {!!lookupGameCat.desc && <>
                          <div className=" tx-bold-8 opaci-50 tx-ls-2 tx-center pa-3">
                              <div className="Q_xs tx-xsm ">{lookupGameCat.desc}</div>
                              <div className="Q_sm_x tx-mdl">{lookupGameCat.desc.toUpperCase()}</div>
                          </div>
                        </>}
                        <Link href={lookupGameCat.disabled ? "/x" : lookupGameCat.href} 
                            onClick={()=>triggerTypeClick(aGameCat)}
                            className="bg-w-10 Q_xs_px-2  tx-white tx-altfont-4 tx-shadow-5 tx-bold-8 flex-center opaci-chov--50 box-shadow-5-b nodeco opaci-chov-50 bord-r-50 w-50 pa-5 py-2 pos-abs bottom-0 mb-6 " 
                            style={{
                                border:`1px solid ${lookupGameCat.color}`,
                                color:lookupGameCat.color,
                                opacity: lookupGameCat.disabled ? 0.1 : 1
                            }}
                        >
                            <div className="Q_xs_lg tx-lg">Enter</div>
                            <div className="Q_lg_x tx-lg">Enter</div>
                            {/* <div>{lookupGameCat.emoji}</div> */}
                        </Link>
                    </div>
                </div>)
            })}
            <hr className="w-50 opaci-10" />
            <div>WebPOV Apps</div>
            <TopRightMenu />
        </div>
    </>)
}