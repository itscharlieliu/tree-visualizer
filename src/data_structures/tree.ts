class TreeNode<T> {
    public value: T;
    public left: TreeNode<T> | null;
    public right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
