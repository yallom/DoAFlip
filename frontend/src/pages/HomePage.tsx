const HomePage = () => {

    return (
        <div className={`flex flex-col w-full h-full ${sessionStorage.getItem("colorMode") == "light" ? "bg-[#D2F1E4]" : "bg-[#251927]"} text-white text-start`}>
            2
        </div>
    )
}

export default HomePage