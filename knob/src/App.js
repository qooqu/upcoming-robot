import React, { useState, useEffect } from "react";
import "./App.css";
import Knob from "./components/Knob";
import Slider from "./components/Slider";

function App() {
    const [knobVal, setKnobVal] = useState(5);

    const knobTurnDown = () => {
        setKnobVal(Math.max(0, knobVal - 1));
    };
    const knobTurnUp = () => {
        setKnobVal(Math.min(10, knobVal + 1));
    };

    let sliderVals = [
        100 - 10 * knobVal,
        10 * knobVal,
        Math.floor(Math.random() * 100),
    ];

    return (
        <div id="container">
            <Knob
                knobVal={knobVal}
                knobTurnDown={knobTurnDown}
                knobTurnUp={knobTurnUp}
            />
            <div id="sliderContainer">
                {sliderVals.map((val) => (
                    <Slider val={val} />
                ))}
            </div>
        </div>
    );
}

export default App;
