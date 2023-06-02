function Input({ label, placeholder, icon, onInput }) {
    return (
        <div className="flex flex-col items-start mb-[2.6rem] last:mb-0">
            <span className="text-Content/Middle text-Regular(14_16) mb-[0.6rem]">{label}</span>
            <input
                onChange={onInput}
                placeholder={placeholder}
                className="
                    px-[1.2rem]
                    py-[1.7rem]
                    block
                    w-[100%]
                    bg-Dominant/Main
                    text-Regular(16_18)
                    text-Content/Dark
                    placeholder:text-Regular(16_18)
                    placeholder:text-Content/Middle
                    border
                    border-transparent
                    focus:border-Accent/Blue
                    focus:outline-0
                "
            ></input>
        </div>
    );
}

export default Input;