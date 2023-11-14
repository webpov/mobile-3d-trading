import Link from "next/link";
import Image from "next/image";


export default function TopRightMenu({...props}) {

    return <>
        <div className="flex-row gap-3 Q_xs_sm_flex-col">
            
            <Link href={"https://webpov.vercel.app/"} className=" opaci-chov--50 Q_xs">
              <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
              <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webpovlogo.jpg" width={64} height={64} />
              </div>
              </Link>
                <a href={"/"} className=" opaci-chov--50">
              <div className="tx-lx bg-w-10 border-white pa-1 pb-0 pt-2 bord-r-25" >
              <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/wequb.png" width={48} height={48} />
              </div>
              </a>
                <Link href={"https://webqub.vercel.app/"} className=" opaci-chov--50">
              <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
              <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webqublogo.jpg" width={48} height={48} />
              </div>
              </Link>
                <Link href={"https://wcity.vercel.app/"} className=" opaci-chov--50">
              <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
              <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webcitylogo.jpg" width={48} height={48} />
              </div>
              </Link>
                <Link href={"https://wcity.vercel.app/w"} className=" opaci-chov--50">
              <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
              <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webgamelogo.jpg" width={48} height={48} />
              </div>
              </Link>
              </div>
                <Link href={"https://webpov.vercel.app/"} className=" opaci-chov--50 Q_sm_x">
              <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
              <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webpovlogo.jpg" width={64} height={64} />
              </div>
              </Link>
    </>
}