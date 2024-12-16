import Node from './Node.mjs';

class Tree {
  constructor(array = null) {
    this.root = null;
    if (array && array.length > 0) {
      array = [...new Set(array)];
      array.sort((a, b) => a - b);
      this.root = this.buildTree(array, 0, array.length - 1);
    }
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (node.data > value) {
      node.left = this.insert(value, node.left);
    } else if (node.data < value) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  successor(node) {
    node = node.right;

    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  deleteNode(value, node) {
    if (node === null) {
      return null;
    }

    if (node.data > value) {
      node.left = this.deleteNode(value, node.left);
    } else if (node.data < value) {
      node.right = this.deleteNode(value, node.right);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const successorNode = this.successor(node);
        node.data = successorNode.data;
        node.right = this.deleteNode(successorNode.data, node.right);
      }
    }

    return node;
  }

  deleteItem(value) {
    this.root = this.deleteNode(value, this.root);
  }

  find(value) {
    let node = this.root;

    while (node !== null) {
      if (node.data === value) {
        break;
      } else if (node.data > value) {
        node = node.left;
      } else if (node.data < value) {
        node = node.right;
      }
    }

    return node;
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required!');
    }

    if (this.root === null) {
      return;
    }

    const queue = [];
    let node;
    queue.push(this.root);

    while (queue.length > 0) {
      node = queue.shift();
      callback(node.data);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required!');
    }

    if (node === null) {
      return;
    }

    this.inOrder(callback, node.left);
    callback(node.data);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required!');
    }

    if (node === null) {
      return;
    }

    callback(node.data);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required!');
    }

    if (node === null) {
      return;
    }

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node.data);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node) {
    if (node === null) {
      return -1;
    }

    let currentNode = this.root;
    let count = 0;

    while (currentNode !== null) {
      if (currentNode.data === node.data) {
        return count;
      } else if (currentNode.data > node.data) {
        currentNode = currentNode.left;
      } else if (currentNode.data < node.data) {
        currentNode = currentNode.right;
      }

      count++;
    }

    return -1;
  }

  isBalanced(node = this.root) {
    if (this.root === null) {
      return false;
    }

    if (node === null) {
      return;
    }

    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    }

    this.isBalanced(node.left);
    this.isBalanced(node.right);

    return true;
  }

  rebalance() {
    const array = [];
    this.inOrder((data) => array.push(data));
    if (array.length > 0) {
      this.root = this.buildTree(array, 0, array.length - 1);
    }
  }
}

export default Tree;
