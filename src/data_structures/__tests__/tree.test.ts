import Tree from "../tree";

describe("tree data structure", () => {
    it("allows setting a value", () => {
        const tree = new Tree<string>();

        tree.set(10, "hello");

        expect(tree.get(10)).toBe("hello");
    });
    it("allows setting multiple values", () => {
        const tree = new Tree<string>();
        tree.set(10, "hello");
        tree.set(15, "world");
        tree.set(5, "foo");

        // Structure should look like this:
        //          +-----------+
        //          |10, "hello"|
        //          +--+----+---+
        //             |    |
        //       v-----+    +-------v
        // +--------+           +-----------+
        // |5, "foo"|           |15, "world"|
        // +--------+           +-----------+

        expect(tree.get(10)).toBe("hello");
        expect(tree.get(15)).toBe("world");
        expect(tree.get(5)).toBe("foo");
    });
    it("allows deleting values", () => {
        const tree = new Tree<string>();
        tree.set(5, "foo");
        tree.set(0, "bar");
        tree.set(10, "hello");
        tree.set(15, "world");

        // Structure should look like this:
        //          +--------+
        //          |5, "foo"|
        //          +-+----+-+
        //            |    |
        //      v-----+    +-----v
        // +--------+       +-----------+
        // |0, "bar"|       |10, "hello"|
        // +--------+       +------+----+
        //                         |
        //                         +---------v
        //                              +-----------+
        //                              |15, "world"|
        //                              +-----------+

        tree.delete(0);
        expect(tree.get(0)).toBe(undefined);

        tree.delete(10);
        expect(10).toBe(undefined);
        expect(15).toBe("world");
    });
});
