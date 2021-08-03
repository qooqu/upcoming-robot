const Slider = (props) => {
    const val = props.val;
    let str;
    if (val < 30) {
        str = "bad";
    } else if (val < 70) {
        str = "meh";
    } else str = "good";

    return (
        <div>
            <input type="range" value={val}></input> {val} {str}
        </div>
    );
};

export default Slider;
