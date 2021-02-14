import React, { useRef } from "react";
import useMount from "../utils/useMount";
import Tree from "../data_structures/tree";

interface TreeNode {
    val: number;
    left?: TreeNode;
    right?: TreeNode;
}

const drawTree = (tree: Tree<number>, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(50, 100, 20, 0, 2 * Math.PI);
    // context.fill();
    context.stroke();
};

const TreeDisplay = (): JSX.Element => {
    const treeRef = useRef<Tree<number>>(new Tree<number>());

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const renderCanvas = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                drawTree(treeRef.current, context);
            }
        }
    };

    useMount(() => {
        renderCanvas();
    });

    const handleAddNumber = () => {
        // temp random number
        const num = Math.floor(Math.random() * 10);

        treeRef.current.set(num, num);
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
