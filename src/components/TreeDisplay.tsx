import React, { useRef } from "react";
import useMount from "../utils/useMount";

const TreeDisplay = (): JSX.Element => {
    // TODO Follow this tutorial https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useMount(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                context.fillStyle = "#000000";
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            }
        }
    });

    return <canvas ref={canvasRef}>This browser is not supported.</canvas>;
};

export default TreeDisplay;
