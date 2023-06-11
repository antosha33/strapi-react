function Button({ name, onPress }) {
    return (
        <div
            onClick={onPress}
            className="py-[1.1rem] px-[1.8rem] rounded-[8px] bg-Accent/Yellow text-Content/Dark text-Regular(16_20)">
            <span>{name}</span>
        </div>
    );
}

export default Button;