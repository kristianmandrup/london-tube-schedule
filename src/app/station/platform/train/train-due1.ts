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
    const { ctx, gap } = this;
    if (gap < 2) {
      ctx.due = "due";
      ctx.dueColors = "rgba(210, 250, 191)";
    } else {
      ctx.due = `${gap} mins`;
      ctx.dueColors = "rgb(250, 230, 216)";
    }
  }

  setNegative() {
    const { ctx } = this;
    ctx.due = `...`;
    ctx.dueColors = "rgb(250, 230, 216)";
  }
}
