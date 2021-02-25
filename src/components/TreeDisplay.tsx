import React, { useState } from "react";
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

const TreeComponent = (props: TreeComponentProps): JSX.Element | null => {
    if (!props.treeNode) {
        return null;
    }

    return (
        <div className={styles.tree__branch}>
            <span className={styles.tree__branchValue}>{props.treeNode.val}</span>
            <TreeComponent treeNode={props.treeNode.left} />
            <TreeComponent treeNode={props.treeNode.right} />
        </div>
    );
};

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
