const Knob = (props) => {
    const knobVal = props.knobVal;
    const knobTurnDown = props.knobTurnDown;
    const knobTurnUp = props.knobTurnUp;

    return (
        <div>
            <span>
                <button onClick={knobTurnDown}> - </button>
                {knobVal}
                <button onClick={knobTurnUp}> + </button>
            </span>
        </div>
    );
};

export default Knob;
