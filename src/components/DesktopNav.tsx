import Link from "next/link";
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon } from "lucide-react";

export default function DesktopNav (){
    return(
        <div className="hidden lg:block p-4 w-48 shadow-md shadow-gray-400">
              <div className="top-0 sticky">
                <div>
                  <img className=""
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
                    alt="" />
                  <div className="inline-flex ml-1 flex-col gap-4 mt-4 *:flex *:items-center *:gap-2">
                    <Link href={'/'}>
                      <HomeIcon />
                      Home
                    </Link>

                    <Link href={'/search'}>
                      <SearchIcon />
                      Search
                    </Link>

                    <Link href={'/browser'}>
                      <LayoutGridIcon />
                      Browser
                    </Link>

                    <Link href={'/profile'}>
                      <UserIcon />
                      Profile
                    </Link>

                    <Link href={'/create'}>
                      <CameraIcon />
                      Create
                    </Link>
                  </div>
                </div>
              </div>
            </div>
    );
}