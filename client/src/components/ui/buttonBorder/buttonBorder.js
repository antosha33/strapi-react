function ButtonBorder({name, onPress}) {
    return (
        <span 
        onClick={onPress}
        className="block text-Regular(14_16) text-Content/Middle border border-t-0 border-l-0 border-r-0 border-dotted border-Content/Middle">{name}</span>
    );
}

export default ButtonBorder;