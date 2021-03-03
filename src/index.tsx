/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */

class Walker {

  private root: Element | null = null;
  private node: Element | null = null;
  private walkBy = 0;

  constructor(root: Element | null) {
    this.root = root;
  }

  walkByAndDoWork(walkBy: number): void {
    if (!this.root) {
      return;
    }

    this.walkBy = 0;

    if (!this.node) {
      this.node = this.root.firstElementChild;
    }

    while (true) {
      if (this.walkBy === walkBy) {
        return;
      }

      this.walkBy += 1;
      this.node?.insertAdjacentHTML('beforebegin', '<span>Updating...</span>');

      if (this.node?.children.length) {
        this.node = this.node.firstElementChild;
        continue;
      }
      if (this.node === this.root) {
        return;
      }
      while (!this.node?.nextElementSibling) {
        if (!this.node?.parentElement || this.node.parentElement === this.root) {
          return;
        }
        this.node = this.node?.parentElement;
      }
      this.node = this.node?.nextElementSibling;
    }
  }

}

const walker = new Walker(document.querySelector('.list'));

walker.walkByAndDoWork(2);
walker.walkByAndDoWork(2);
