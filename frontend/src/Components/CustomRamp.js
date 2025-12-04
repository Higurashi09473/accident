import { ColorRamp } from "@maptiler/sdk";


const CustomRamp = new ColorRamp({
    stops: [
        { value: 1, color: [139, 0, 0] },
        { value: 2, color: [255, 165, 0] },
        { value: 3, color: [189, 224, 64] },
    ]
});

export default CustomRamp