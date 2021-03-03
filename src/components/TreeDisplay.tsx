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

const renderTree = (canvasRef: RefObject<HTMLCanvasElement>) => {
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

interface displayNode {
    parentIdx?: number;
    val: number;
}

type TreeRow = displayNode[];

type TreeRows = TreeRow[];

const populateRows = (root?: TreeNode, treeRows: TreeRows = [], depth: number = 0, parentIdx?: number): void => {
    if (!root) {
        return;
    }

    if (!treeRows[depth]) {
        treeRows[depth] = [];
    }

    const currIdx = treeRows[depth].length;

    treeRows[depth].push({ parentIdx, val: root.val });

    populateRows(root.left, treeRows, depth + 1, currIdx);
    populateRows(root.right, treeRows, depth + 1, currIdx);
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

        const treeRows: TreeRows = [];

        populateRows(root.current, treeRows);

        console.log(treeRows);
        renderTree(canvasRef);
    };

    return (
        <div>
            <button onClick={handleAddNumber}>add random number</button>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default TreeDisplay;
