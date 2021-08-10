const Slider = (props) => {
    const val = props.val;
    let str;
    if (val < 30) {
        str = "bad";
    } else if (val < 70) {
        str = "meh";
    } else str = "good";

    return (
        <div className="sliderDiv">
            {/* <input type="range" value={val} orient="vertical"></input> */}
            <input className="slider" type="range" value={val} />
            <div>{val}</div>
            <div>{str}</div>
        </div>
    );
};

export default Slider;
