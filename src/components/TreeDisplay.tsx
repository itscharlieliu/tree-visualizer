import React, { useRef } from "react";
import useMount from "../utils/useMount";
import Tree from "../data_structures/tree";

interface TreeNode {
    val: number;
    left?: TreeNode;
    right?: TreeNode;
}

const addNode = (val: number, root?: TreeNode): TreeNode => {
    if (!root) {
        return { val };
    }

    if (val < root.val) {
        root.left = addNode(val, root.left);
    }
    if (val > root.val) {
        root.right = addNode(val, root.right);
    }
    // Otherwise, val already exists
    return root;
};

interface DisplayNode {
    parent: DisplayNode | null;
    value: number;
}

type DisplayRow = DisplayNode[];

const drawTree = (displayRows: DisplayRow[], currRow: number, root?: TreeNode): DisplayRow[] => {
    if (root) {

        displayRows[currRow].push({parent: })

        drawTree(context, root.left, x - 50, y + 100);
        drawTree(context, root.right, x + 50, y + 100);
    }
    return displayRows;
};

const TreeDisplay = (): JSX.Element => {
    const rootRef = useRef<TreeNode | undefined>(undefined);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const renderCanvas = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.height = 500;
            canvas.width = 1000;
            const context = canvas.getContext("2d");

            if (context) {
                // Init frame
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.fillStyle = "#000000";

                const rows: DisplayRow[] = [];

                drawTree(context, rootRef.current, 400);
            }
        }
    };

    useMount(() => {
        renderCanvas();
    });

    const handleAddNumber = () => {
        // temp random number
        const num = Math.floor(Math.random() * 100);
        rootRef.current = addNode(num, rootRef.current);
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
