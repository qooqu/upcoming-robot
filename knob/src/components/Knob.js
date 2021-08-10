const Knob = (props) => {
    const knobVal = props.knobVal;
    const knobTurnDown = props.knobTurnDown;
    const knobTurnUp = props.knobTurnUp;

    return (
        <div id="knob">
            <div>
                <button onClick={knobTurnDown}> - </button>
            </div>
            <div id="knobVal">{knobVal}</div>
            <div>
                <button onClick={knobTurnUp}> + </button>
            </div>
        </div>
    );
};

export default Knob;
