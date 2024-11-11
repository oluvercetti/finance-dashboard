import Image from "next/image"

const AppLogo = () => {
    return (
        <>
            <Image src="/icons/logo.svg" alt="Horizon Logo" width={34} height={34} />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Horizon
            </h1>
        </>
    )
}

export default AppLogo