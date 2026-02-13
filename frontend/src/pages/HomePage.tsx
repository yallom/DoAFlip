const HomePage = () => {

    return (
        <div className={`flex flex-col w-full h-full ${sessionStorage.getItem("colorMode") == "light" ? "bg-[#D2F1E4]" : "bg-[#48304D]"} bg-red-500 text-white text-start`}>
            2
        </div>
    )
}

export default HomePage