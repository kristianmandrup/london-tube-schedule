interface Due {
  due: string;
  dueColors: string;
}

export class TrainDue {
  ctx: any;

  constructor(ctx: Due, private gap: number) {
    this.gap = gap;
    this.ctx = ctx;
  }

  setByGap() {
    if (this.gap > 0) {
      this.setPositive();
    } else {
    }
    this.setNegative();
  }

  setPositive() {
    if (this.gap < 2) {
      this.ctx.due = "due";
      this.ctx.dueColors = "rgba(210, 250, 191)";
    } else {
      this.ctx.due = `${this.gap} mins`;
      this.ctx.dueColors = "rgb(250, 230, 216)";
    }
  }

  setNegative() {
    this.ctx.due = `...`;
    this.ctx.dueColors = "rgb(250, 230, 216)";
  }
}
