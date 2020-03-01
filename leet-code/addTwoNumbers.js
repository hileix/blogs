
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let qL1 = l1, qL2 = l2;
  const resultListNode = new ListNode();

  let carry = 0;
  // 遍历两个链表
  while (qL1.next || qL2.next) {
    const val = (qL1.val + qL2.val) % 10 + carry;
    carry = Math.floor((qL1.val + qL2.val) / 10);
    resultListNode.next = val;
    resultListNode.next = null;

    qL1 = qL1.next;
    qL2 = qL2.next;
  }
  return resultListNode;

};

const l1 = new 

addTwoNumbers();