import React, { MutableRefObject, Ref, RefObject, useEffect, useRef, useState } from "react";
import styles from "./styles/TreeDisplay.module.css";

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
    return { ...root };
};

const renderCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
    if (!canvasRef.current) {
        return;
    }

    const context = canvasRef.current.getContext("2d");

    if (!context) {
        console.warn("Unable to get context");
        return;
    }

    context.moveTo(0, 0);
    context.lineTo(200, 100);
    context.stroke();
};

interface TreeComponentProps {
    treeNode?: TreeNode;
    parentRef?: Ref<HTMLDivElement>;
}

const TreeDisplay = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const root = useRef<TreeNode | undefined>(undefined);

    const handleAddNumber = () => {
        // temp random number
        const num = Math.floor(Math.random() * 100);
        root.current = addNode(num, root.current);

        renderCanvas(canvasRef);
    };

    return (
        <div>
            <button onClick={handleAddNumber}>add random number</button>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default TreeDisplay;
