import { Task } from './types';

class TaskEnqueuer {

  private currentTask: Task | null = null;
  private tasks: Task[] = [];
  private isTaskSheduled = false;
  private handledTask: IdleCallbackHandle | null = null;

  enqueueTask(task: Task): void {
    this.tasks.push(task);

    if (!this.handledTask) {
      this.handledTask = window.requestIdleCallback(this.runTaskQueue, { timeout: 1000 });
    }
  }

  runTaskQueue = (deadline: IdleDeadline): void => {

    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && this.tasks.length) {
      const nextTask = this.tasks.shift();

      if (nextTask) {
        this.currentTask = nextTask;
        this.sheduleTask();
      }
    }

    if (this.tasks.length) {
      this.handledTask = window.requestIdleCallback(this.runTaskQueue, { timeout: 1000 });
    } else {
      this.handledTask = null;
    }
  }

  sheduleTask(): void {
    if (!this.isTaskSheduled) {
      window.requestAnimationFrame(this.updateDisplay);
      this.isTaskSheduled = true;
    }
  }

  updateDisplay = (): void => {
    if (this.currentTask) {
      this.currentTask();
    }
    this.isTaskSheduled = false;
  }

}

export default TaskEnqueuer;
