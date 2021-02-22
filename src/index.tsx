import TaskEnqueuer from './TaskEnqueuer/TaskEnqueuer';

const search = document.querySelector('.search');
// const taskEnqueuer = new TaskEnqueuer();

search?.addEventListener('input', () => {
  // taskEnqueuer.enqueueTask(() => {
  for (let i = 0; i < 10000; i += 1) {
    // eslint-disable-next-line no-console
    console.log(true);
  }
  // });
});
