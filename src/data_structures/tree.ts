class TreeNode<T> {
    readonly key: number;
    public value: T;
    public left: TreeNode<T> | null;
    public right: TreeNode<T> | null;

    constructor(key: number, value: T) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export default class Tree<T> {
    private root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    set(key: number, value: T) {
        console.log("setting value");

        if (this.root === null) {
            this.root = new TreeNode<T>(key, value);
            return;
        }

        let curr = this.root;
        while (curr !== null) {
            // Debug: print path
            console.log(curr);
            if (curr.key === key) {
                // Key exists
                curr.value = value;
                return;
            }
            if (curr.key > key) {
                if (curr.left === null) {
                    curr.left = new TreeNode<T>(key, value);
                    return;
                }
                curr = curr.left;
                continue;
            }
            if (curr.key < key) {
                if (curr.right === null) {
                    curr.right = new TreeNode<T>(key, value);
                    return;
                }
                curr = curr.right;
            }
        }
        throw new Error("Unknown error when setting value")
    }

    get(key: number) {
        console.log("getting value");
        let curr = this.root;
        while (curr !== null) {
            if (curr.key === key) {
                return curr.value;
            }
            if (curr.key > key) {
                curr = curr.left;
                continue;
            }
            if (curr.key < key) {
                curr = curr.right;
            }
        }
        return undefined;
    }
}
