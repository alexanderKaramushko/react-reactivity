function walkAndUpdate(DOMElement: Element | null): void {
  if (!DOMElement) {
    return;
  }

  const { children = [] } = DOMElement;

  DOMElement.insertAdjacentHTML('beforebegin', '<span>Updating...</span>');

  Array.from(children).forEach(walkAndUpdate);
}

const trigger: HTMLInputElement | null = document.querySelector('.trigger');

trigger?.addEventListener('input', () => {
  walkAndUpdate(document.querySelector('.list'));
});
