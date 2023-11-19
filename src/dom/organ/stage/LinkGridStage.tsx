"use client"
import Link from "next/link";
import { ReactNode, useState } from "react";

const defaultGameTypes = [
    "code",
    "model",
    "fidget",
    "creation",
    "minigame",
    "sandbox",
    "engine",
    "story",
    "generative",
]
export type GameType = {
    href:string
    name:string
    color:string
    gradient:string
    emoji:string
    disabled: boolean
}

const defaultGameTypesLookup:Record<string, GameType> = {
    "code": {
        href: "/x/code",
        name: "relativity equation",
        color:"#0099ff",
        gradient:"#ff99ff",
        emoji: "💻",
        disabled: true, //true
    },
    "model": {
        href: "/x/model",
        name: "wormhole",
        color:"#ff99ff",
        gradient:"#ff00ff",
        emoji: "🌀",
        disabled: false,
    },
    "fidget": {
        href: "/x/fidget",
        name: "solar system",
        color:"#ff00ff",
        gradient:"#00ff99",
        emoji: "🌸",
        disabled: false,
    },
    "creation": {
        href: "/x/creation",
        name: "3d charting",
        color:"#00ff99",
        gradient:"#9999ff",
        emoji: "📊",
        disabled: false,
    },
    "minigame": {
        href: "/x/minigame",
        name: "pong",
        color:"#9999ff",
        gradient:"#ff9900",
        emoji: "🎮",
        disabled: false,
    },
    "sandbox": {
        href: "https://webqub.vercel.app",
        name: "web qub",
        color:"#ff9900",
        gradient:"#009900",
        emoji: "✴️",
        disabled: false, 
    },
    "engine": {
        href: "https://webpov.vercel.app",
        name: "web pov",
        color:"#009900",
        gradient:"#ffdd00",
        emoji: "🔧",
        disabled: false, 
    },
    "story": {
        href: "https://wcity.vercel.app",
        name: "byte city",
        color:"#ffdd00",
        gradient:"#996633",
        emoji: "📒",
        disabled: false, 
    },
    "generative": {
        href: "/x/generative",
        name: "open pet world",
        color:"#996633",
        gradient:"#336699",
        emoji: "🔥",
        disabled: true, //true
    },
}










export default function LinkGridStage({children}:{children:ReactNode}) {
    const [gameTypes, s__gameTypes] = useState(defaultGameTypes)
    const [loadingType, s__loadingType] = useState("")
    const triggerTypeClick = (typeString:string) => {
        const lookupGameType = defaultGameTypesLookup[typeString]
        if (lookupGameType.disabled) {
            return
        }
        s__loadingType(typeString)
    }
    return (<>
        <div className="tx-white flex-wrap flex-align-center tx-altfont-1 gap-1 tx-lx ">
            {!!loadingType && <>
                <div className="flex-col">
                    <div className="tx-lg opaci-50">Loading {loadingType}...</div>
                    <div className="spin-5 tx-xxxl">|</div>
                </div>
            </>}
            {!loadingType && gameTypes.map((aGameType:string, index: number) => {
                const lookupGameType = defaultGameTypesLookup[aGameType]
                return (
                  <div key={index} className="w-30 opaci-hov-50  bord-r-25"
                     style={lookupGameType.disabled?undefined:{
                      padding: "2px",
                      background:`linear-gradient(45deg, ${lookupGameType.color}, ${lookupGameType.gradient})`
                    }}>
                    <div  
                        className={` tx-white  bord-r-25  nodeco  flex-col flex-justify-start pos-rel
                         ${!lookupGameType.disabled ? "bg-black" : "bg-w-10" }
                        `}
                    >
                        <div className="Q_xs_sm tx-md pt-4 ">{aGameType.toUpperCase()}</div>
                        <div className="Q_sm tx-lgx pt-4 ">{aGameType.toUpperCase()}</div>
                        <div className="Q_md_lg tx-xl">{aGameType}</div>
                        <div className="Q_xl_x tx-xxxl">{aGameType}</div>

                        <div className=" tx-bold-8 opaci-50 tx-ls-2 tx-center pt-1">
                            <div className="Q_xs tx-xsm ">{lookupGameType.name}</div>
                            <div className="Q_sm tx-md ">{lookupGameType.name}</div>
                            <div className="Q_sm_x tx-mdl">{lookupGameType.name.toUpperCase()}</div>
                        </div>
                        <Link href={lookupGameType.disabled ? "/x" : lookupGameType.href} 
                            onClick={()=>triggerTypeClick(aGameType)}
                            className="bg-w-10 Q_xs_px-1 tx-white tx-altfont-4 tx-shadow-5 tx-bold-8 flex-center opaci-chov--50 box-shadow-5-b nodeco opaci-chov-50 bord-r-50 w-50 pa-3 pos-abs top-50p mb-4" 
                            style={{
                                border:`1px solid ${lookupGameType.color}`,
                                color:lookupGameType.color,
                                opacity: lookupGameType.disabled ? 0.1 : 1
                            }}
                        >
                            {lookupGameType.disabled && `❌`}
                            <div className="Q_lg_x tx-lg">Start</div>
                            <div>{lookupGameType.emoji}</div>
                        </Link>

                        <div className="pos-abs top-0 right-0 pa-2 opaci-25 "
                          title={lookupGameType.disabled ? `Unavailable` : `Available`}
                        >
                          <div className="Q_xs_sm tx-mdl ">{lookupGameType.disabled ? `` : `✅`}</div>
                          <div className="Q_md_x tx-lgx ">{lookupGameType.disabled ? `` : `✅`}</div>
                        </div>

                        <div className="Q_md_x h-100px"></div>
                        <div className=" h-150px"></div>
                    </div>
                </div>)
            })}
        </div>
    </>)
}