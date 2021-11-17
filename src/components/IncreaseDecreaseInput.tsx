import { Button, InputNumber } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";

export default function IncreaseDecreaseInput({ value, increaseValue, decreaseValue, loadingIncrease, loadingDecrease, onBlur }) {
    const [inputValue, setInputValue] = useState(0);

    function onChange(e) {
        let value = e.target.value
        setInputValue(prevState => isNaN(value) ? prevState : e.target.value)
    }

    function formatInput(e) {
        // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
        let checkIfNum;
        if (e.key !== undefined) {
            // Check if it's a "e", ".", "+" or "-"
            checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
        }
        else if (e.keyCode !== undefined) {
            // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
            checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
        }
        return checkIfNum && e.preventDefault();
    }

    useEffect(() => {
        setInputValue(value)
    }, [value])

    return (
        <div className="input-number-container">
            <Button
                loading={loadingDecrease}
                disabled={loadingIncrease}
                className="value-button"
                id="decrease"
                onClick={() => decreaseValue()}
                icon={<Text>-</Text>} />
            <input
                type="number"
                id="number"
                min="1"
                value={inputValue}
                onChange={(e) => onChange(e)}
                onBlur={(e) => onBlur(e)}
                onKeyDown={(e) => formatInput(e)} />
            <Button
                loading={loadingIncrease}
                disabled={loadingDecrease}
                className="value-button"
                id="increase"
                onClick={() => increaseValue()}
                icon={<Text>+</Text>} />
        </div>
    )
}