function Button({ name, onPress }) {
    return (
        <div
            onClick={onPress}
            className="p-[1rem] rounded-[8px] bg-Accent/Yellow text-Content/Dark text-Regular(16_20)">
            <span>{name}</span>
        </div>
    );
}

export default Button;