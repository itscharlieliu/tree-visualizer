import React, { useRef } from "react";
import useMount from "../utils/useMount";
import Tree from "../data_structures/tree";

interface TreeNode {
    val: number;
    left?: TreeNode;
    right?: TreeNode;
}

const drawTree = (context: CanvasRenderingContext2D, root?: TreeNode, x?: number, y?: number) => {
    if (!x) {
        x = 0;
    }
    if (!y) {
        y = 0;
    }

    if (root) {
        context.beginPath();
        context.arc(x, y, 20, 0, 2 * Math.PI);
        // context.fill();
        context.stroke();

        drawTree(context, root.left, x - 20, y + 20);
        drawTree(context, root.right, x + 20, y + 20);
    }
};

const TreeDisplay = (): JSX.Element => {
    const rootRef = useRef<TreeNode | undefined>(undefined);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const renderCanvas = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                // Init frame
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.fillStyle = "#000000";

                drawTree(context, rootRef.current);
            }
        }
    };

    useMount(() => {
        renderCanvas();
    });

    const handleAddNumber = () => {
        // temp random number
        const num = Math.floor(Math.random() * 10);
        if (!rootRef.current) {
            rootRef.current = { val: num };
        } else {
            rootRef.current.right = { val: num };
        }
        renderCanvas();
    };

    return (
        <div>
            <button onClick={handleAddNumber}>add random number</button>
            <canvas ref={canvasRef}>This browser is not supported.</canvas>
        </div>
    );
};

export default TreeDisplay;
