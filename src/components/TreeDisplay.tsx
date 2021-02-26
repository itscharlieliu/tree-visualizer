import React, { Ref, useRef, useState } from "react";
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
}

const TreeComponent = React.forwardRef ((props: TreeComponentProps, ref: Ref<HTMLDivElement>): JSX.Element | null => {
    const rootRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    if (!props.treeNode) {
        return null;
    }

    return (
            <div ref={rootRef} className={styles.tree__branch}>
                <span className={styles.tree__branchValue}>{props.treeNode.val}</span>
                <svg width="100" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>

                <TreeComponent ref={leftRef} treeNode={props.treeNode.left} />
                <TreeComponent ref={rightRef} treeNode={props.treeNode.right} />
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
