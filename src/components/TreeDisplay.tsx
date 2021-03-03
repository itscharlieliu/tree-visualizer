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

interface DisplayNode {
    parentIdx?: number;
    val: number;
    xPos: number;
}

type TreeRow = DisplayNode[];

type TreeRows = TreeRow[];

const HORIZONTAL_GAP = 25;
const VERTICAL_GAP = 25;

// Returns x pos of added node
const populateRows = (
    root?: TreeNode,
    treeRows: TreeRows = [],
    depth: number = 0,
    parentIdx?: number,
    parentXPos?: number,
): number => {
    if (!root) {
        return -1;
    }

    if (!treeRows[depth]) {
        treeRows[depth] = [];
    }

    const currIdx = treeRows[depth].length;

    const displayNode: DisplayNode = { parentIdx, val: root.val, xPos: parentXPos ? parentXPos : 0 };

    const leftPos = populateRows(root.left, treeRows, depth + 1, currIdx);

    if (leftPos !== -1) {
        displayNode.xPos = leftPos + HORIZONTAL_GAP;
    }

    populateRows(root.right, treeRows, depth + 1, currIdx);

    treeRows[depth].push(displayNode);
    return displayNode.xPos;
};

const renderTree = (canvasRef: RefObject<HTMLCanvasElement>, treeRows: TreeRows) => {
    if (!canvasRef.current) {
        return;
    }

    const context = canvasRef.current.getContext("2d");

    if (!context) {
        console.warn("Unable to get context");
        return;
    }

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (const treeRowIdx in treeRows) {
        const treeRow = treeRows[treeRowIdx];
        for (const displayNodeIdx in treeRow) {
            const displayNode = treeRow[displayNodeIdx];

            context.beginPath();
            // @ts-ignore
            context.arc(displayNode.xPos, treeRowIdx * VERTICAL_GAP, 5, 0, 260);
            context.closePath();
        }
    }

    context.stroke();
};

const TreeDisplay = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const root = useRef<TreeNode | undefined>(undefined);

    const handleAddNumber = () => {
        // temp random number
        const num = Math.floor(Math.random() * 100);
        root.current = addNode(num, root.current);

        const treeRows: TreeRows = [];

        populateRows(root.current, treeRows);

        console.log(treeRows);
        renderTree(canvasRef, treeRows);
    };

    return (
        <div>
            <button onClick={handleAddNumber}>add random number</button>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default TreeDisplay;
