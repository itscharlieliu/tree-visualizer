import React, { Ref, useEffect, useRef, useState } from "react";
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

interface TreeComponentProps {
    treeNode?: TreeNode;
    parentRef?: Ref<HTMLDivElement>;
}

const TreeComponent = React.forwardRef((props: TreeComponentProps, ref: Ref<HTMLDivElement>): JSX.Element | null => {
    let width = 0;
    let height = 0;

    if (!props.treeNode) {
        return null;
    }

    const setRef = (ref: HTMLDivElement): void => {
        width = ref ? ref.clientWidth : 0;
        height = ref ? ref.clientHeight : 0;
    };

    return (
        <div ref={setRef} className={styles.tree__branch}>
            <span className={styles.tree__branchValue}>{props.treeNode.val}</span>

            <TreeComponent treeNode={props.treeNode.left} />
            <TreeComponent treeNode={props.treeNode.right} />

            {console.log(width)}

            <svg className={styles.tree__connector} width={width} height={height}>
                <line x1={width / 2} y1={height} x2="0" y2={height / 2} stroke="black" />
            </svg>
            <svg className={styles.tree__connector} width={width} height={height}>
                <line x1={width / 2} y1={height} x2={width} y2={height / 2} stroke="black" />
            </svg>
        </div>
    );
});

const TreeDisplay = (): JSX.Element => {
    const [root, setRoot] = useState<TreeNode | undefined>(undefined);

    const handleAddNumber = () => {
        // temp random number
        const num = Math.floor(Math.random() * 100);
        setRoot(addNode(num, root));
        // renderCanvas();
    };

    return (
        <div>
            <button onClick={handleAddNumber}>add random number</button>
            <TreeComponent treeNode={root} />
        </div>
    );
};

export default TreeDisplay;
