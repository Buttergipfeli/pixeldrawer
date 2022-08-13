import { ChangeEvent, MutableRefObject } from "react";

export const colorPickerService = {
    colorHandler
}

function colorHandler(event: ChangeEvent<HTMLInputElement> | string,
    colorPickerInput: MutableRefObject<(HTMLInputElement | null)[]>) {
    if (typeof event === 'string') {
        if (colorPickerInput.current[0] !== null && colorPickerInput.current[1] !== null) {
            colorPickerInput.current[0].value = '#FFFFFF';
            colorPickerInput.current[1].value = '#FFFFFF';
        }
        return;
    }
    let { value } = event.target;
    value = value.toUpperCase();
    if (colorPickerInput.current[0] !== null && colorPickerInput.current[1] !== null) {
        colorPickerInput.current[0].value = value;
        colorPickerInput.current[1].value = value;
    }
}