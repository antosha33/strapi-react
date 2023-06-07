function Container({children}) {
    return (
        <div className="max-w-[1680px] w-[100%] px-[20px] mx-auto">
            {children}
        </div>
    );
}

export default Container;