import React, { RefObject, useRef, useState } from "react";
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

const HORIZONTAL_GAP = 50;
const VERTICAL_GAP = 50;
const RADIUS = 20;
const PADDING_VERTICAL = 25;
const PADDING_HORIZONTAL = 25;

// Returns x pos of added node
const populateRows = (
    root?: TreeNode,
    treeRows: TreeRows = [],
    depth: number = 0,
    parentIdx?: number,
    parentXPos?: number,
    isRight?: boolean,
): number => {
    if (!root) {
        return -1;
    }

    if (!treeRows[depth]) {
        treeRows[depth] = [];
    }

    const currIdx = treeRows[depth].length;

    const displayNode: DisplayNode = { parentIdx, val: root.val, xPos: parentXPos ? parentXPos : 0 };

    const treeRow = treeRows[depth];

    if (treeRow.length > 0 && treeRow[treeRow.length - 1].xPos + HORIZONTAL_GAP > displayNode.xPos) {
        displayNode.xPos = treeRow[treeRow.length - 1].xPos + HORIZONTAL_GAP;
    }

    if (isRight) {
        displayNode.xPos = displayNode.xPos + HORIZONTAL_GAP;
    }

    const leftPos = populateRows(root.left, treeRows, depth + 1, currIdx, displayNode.xPos);

    if (leftPos !== -1) {
        displayNode.xPos = leftPos + HORIZONTAL_GAP;
    }

    const rightPos = populateRows(root.right, treeRows, depth + 1, currIdx, displayNode.xPos, true);

    if (rightPos !== -1) {
        displayNode.xPos = rightPos - HORIZONTAL_GAP;
    }
    if (leftPos !== -1 && rightPos !== -1) {
        displayNode.xPos = (leftPos + rightPos) / 2;
    }

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

    let width = context.canvas.width;
    let height = context.canvas.height;

    for (let treeRowIdx = 0; treeRowIdx < treeRows.length; ++treeRowIdx) {
        for (const treeNode of treeRows[treeRowIdx]) {
            if (treeNode.xPos + PADDING_HORIZONTAL * 3 > width) {
                width = treeNode.xPos + PADDING_HORIZONTAL * 3;
            }
        }
        if (treeRowIdx * VERTICAL_GAP + PADDING_VERTICAL > height - PADDING_VERTICAL) {
            height = treeRowIdx * VERTICAL_GAP + PADDING_VERTICAL * 3;
        }
    }

    console.log(width, height);

    context.canvas.width = width;
    context.canvas.height = height;

    for (let treeRowIdx = 0; treeRowIdx < treeRows.length; treeRowIdx++) {
        const treeRow = treeRows[treeRowIdx];
        for (const displayNodeIdx in treeRow) {
            const displayNode = treeRow[displayNodeIdx];

            const x = PADDING_HORIZONTAL + displayNode.xPos;
            const y = PADDING_VERTICAL + treeRowIdx * VERTICAL_GAP;

            // Draw circle
            context.beginPath();
            context.arc(x, y, RADIUS, 0, 260);
            context.closePath();
            context.stroke();

            context.fillText(displayNode.val.toString(), x, y);

            // Draw Line to parent
            const parentRow = treeRows[treeRowIdx - 1];

            if (parentRow === undefined || displayNode.parentIdx === undefined) {
                continue;
            }
            const parent = treeRows[treeRowIdx - 1][displayNode.parentIdx];
            const parentX = PADDING_HORIZONTAL + parent.xPos;
            const parentY = y - VERTICAL_GAP;
            context.beginPath();
            const pointOnCircle = RADIUS * (Math.sqrt(2) / 2);
            if (parentX < x) {
                // Will look like \
                context.moveTo(x - pointOnCircle, y - pointOnCircle);
                context.lineTo(parentX + pointOnCircle, parentY + pointOnCircle);
            } else if (parentX > x) {
                // Will look like /
                context.moveTo(x + pointOnCircle, y - pointOnCircle);
                context.lineTo(parentX - pointOnCircle, parentY + pointOnCircle);
            } else {
                // vertical line
                context.moveTo(x, y - RADIUS);
                context.lineTo(parentX, parentY + RADIUS);
            }

            context.stroke();
            context.closePath();
        }
    }
};

const TreeDisplay = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const root = useRef<TreeNode | undefined>(undefined);

    const handleAddNumber = () => {
        // temp random number
        const num = parseInt(inputValue);

        if (isNaN(num)) {
            return;
        }

        root.current = addNode(num, root.current);

        const treeRows: TreeRows = [];

        populateRows(root.current, treeRows);

        renderTree(canvasRef, treeRows);
    };

    return (
        <div className={styles.treeDisplay__container}>
            <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
            <button onClick={handleAddNumber}>add random number</button>
            <canvas ref={canvasRef} width={200} height={200} />
        </div>
    );
};

export default TreeDisplay;
