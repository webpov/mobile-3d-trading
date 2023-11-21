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
    gameList?: any[]
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
        gameList: [
          {href:"/",name:"asd"},
          {href:"/",name:"fgh"},
          {href:"/",name:"sdf"},
          {href:"/",name:"qwe"},
        ],
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
        <div className="tx-white flex-wrap flex-align-stretch  tx-altfont-1 gap-1 tx-lx w-100">
            {!!loadingType && <>
                <div className="flex-col w-100">
                    <div className="tx-lg opaci-50">Loading {loadingType}...</div>
                    <div className="spin-5 tx-xxxl">|</div>
                </div>
            </>}
            {!loadingType && gameTypes.map((aGameType:string, index: number) => {
                const lookupGameType = defaultGameTypesLookup[aGameType]
                return (
                  <div key={index} className="w-30 opaci-hov-50   bord-r-25"
                     style={lookupGameType.disabled?undefined:{
                      padding: "2px",
                      background:`linear-gradient(45deg, ${lookupGameType.color}, ${lookupGameType.gradient})`
                    }}>
                    <div  
                        className={` tx-white  bord-r-25 h-100 nodeco  flex-col flex-justify-start pos-rel
                         ${!lookupGameType.disabled ? "bg-black" : "bg-w-10" }
                        `}
                    >
                        <div className="tx-center Q_xs_sm tx-md pt-4 ">{index}: {aGameType.toUpperCase()}</div>
                        <div className="tx-center Q_sm tx-lgx pt-4 ">{index}: {aGameType.toUpperCase()}</div>
                        <div className="tx-center Q_md_lg tx-xl">{index}: {aGameType}</div>
                        <div className="tx-center Q_xl_x tx-xxxl">{index}: {aGameType}</div>
                      
                        <div className=" tx-bold-8 opaci-50 tx-ls-2 tx-center pt-1">
                            <div className="Q_xs tx-xsm ">{lookupGameType.name}</div>
                            <div className="Q_sm tx-md ">{lookupGameType.name}</div>
                            <div className="Q_md_x tx-mdl">{lookupGameType.name.toUpperCase()}</div>
                        </div>
                        <Link href={`/x/${aGameType}/games`} className=" opaci-chov--50 nodeco mt-3 tx-bold-8 opaci-chov--25 opaci-75 tx-ls-2 tx-center pt-1 bg-w-10 tx-white bord-r-50 pa-1">
                            <div className="Q_xs tx-xsm ">More</div>
                            <div className="Q_sm tx-md ">More</div>
                            <div className="Q_md_x tx-mdl">More</div>
                        </Link>
                        {/* {!!lookupGameType.gameList && lookupGameType.gameList.length > 0 &&
                          <details className="w-100 pos-abs bottom-0 right-0  ">
                            <summary className="flex flex-justify-end my-2  opaci-chov-50 pos-abs right-0 bottom-0">
                              <button  className="noclick tx-bold-8 opaci-chov--25 opaci-75 tx-ls-2 tx-center pt-1 bg-w-10 tx-white bord-r-50 pa-1">
                                <div className="Q_xs tx-xsm ">More</div>
                                <div className="Q_sm tx-md ">More</div>
                                <div className="Q_md_x tx-mdl">More</div>
                              </button>
                            </summary>
                            <div className="w-100 flex-wrap gap-2 mb-8 py-5 z-990 _ddr pos-rel" >
                            {lookupGameType.gameList.map((aSubGame:any, index: number) => {
                              return (
                                <div key={index}
                                  className="w-30 flex-center z-1001  bg-black tx-white  pa-1 bord-r-25"
                                >
                                    <Link href={aSubGame.href} className="z-1001 tx-white nodeco">
                                      <div className="Q_xs_md tx-lg ">{aSubGame.name}</div>
                                      <div className="Q_md_lg tx-lgx ">{aSubGame.name}</div>
                                      <div className="Q_xl_x tx-xl ">{aSubGame.name}</div>
                                    </Link>
                                </div>
                              )
                              })}
                            </div>
                          </details>
                        } */}
                        <Link href={lookupGameType.disabled ? "/x" : lookupGameType.href} 
                            onClick={()=>triggerTypeClick(aGameType)}
                            className="bg-w-10 Q_xs_px-1 z-100 tx-white tx-altfont-4 tx-shadow-5 tx-bold-8 flex-center opaci-chov--50 box-shadow-5-b nodeco opaci-chov-50 bord-r-50 w-50 pa-3 pos-abs top-50p mb-4" 
                            style={{
                                border:`1px solid ${lookupGameType.color}`,
                                color:lookupGameType.color,
                                opacity: lookupGameType.disabled ? 0.1 : 1
                            }}
                        >
                            {lookupGameType.disabled && `❌`}
                            <div className="pos-rel Q_lg_x tx-lg">Start</div>
                            <div className="flex-col">
                              <div className="pos-rel Q_xs tx-xsm ">Start</div>
                              <div className="pos-rel z-100">{lookupGameType.emoji}</div>
                            </div>
                        </Link>

                        <div className="pos-abs bottom-0 right-0 pa-2 opaci-25 "
                          title={lookupGameType.disabled ? `Unavailable` : `Available`}
                        >
                          <div className="Q_xs_md tx-mdl ">{lookupGameType.disabled ? `` : `✅`}</div>
                          <div className="Q_md_x tx-lgx ">{lookupGameType.disabled ? `` : `✅`}</div>
                        </div>

                        <div className="Q_md_x h-100px"></div>
                        <div className=" h-150px"></div>
                    </div>
                </div>)
            })}
        </div>
        {!loadingType && children}
    </>)
}