import React, { Context, useRef } from "react";
import useMount from "../utils/useMount";

const drawTree = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(50, 100, 20, 0, 2 * Math.PI);
    // context.fill();
    context.stroke();
};

const TreeDisplay = (): JSX.Element => {
    // TODO Follow this tutorial https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useMount(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                drawTree(context);
            }
        }
    });

    return <canvas ref={canvasRef}>This browser is not supported.</canvas>;
};

export default TreeDisplay;
