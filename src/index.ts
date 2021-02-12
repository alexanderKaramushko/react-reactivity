const app = document.getElementById('custom-app');

class Counter {

  private reactiveCount = 1;
  private root: HTMLElement | null;

  constructor(root: HTMLElement | null) {
    this.root = root;
  }

  private set count(count: number) {
    this.reactiveCount = count;

    // Обновлять DOM при каждом обновлении свойства count
    this.render();
  }

  private get count(): number {
    return this.reactiveCount;
  }

  render(): void {
    if (!this.root) {
      throw new Error('No root node!');
    }

    // Обновляется весь DOM!
    this.root.innerHTML = '';

    this.root.appendChild(this.button());
    this.root.appendChild(this.content());
  }

  button = (): HTMLElement => {
    const button = document.createElement('button');

    button.addEventListener('click', () => {
      this.count += 1;
    });

    button.innerText = 'Update counter';

    return button;
  }

  content = (): HTMLElement => {
    const content = document.createElement('span');

    content.innerHTML = this.count.toString();

    return content;
  }

}

const counter = new Counter(app);

counter.render();
