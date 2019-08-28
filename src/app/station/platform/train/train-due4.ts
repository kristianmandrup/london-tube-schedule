interface Due {
  due: string;
  dueColors: string;
}

export const setPositive = ({ ctx, gap }: any): boolean => {
  if (gap <= 0) return;
  if (gap < 2) {
    ctx.due = "due";
    ctx.dueColors = "rgba(210, 250, 191)";
  } else {
    ctx.due = `${gap} mins`;
    ctx.dueColors = "rgb(250, 230, 216)";
  }
  return true;
};

export const setNegative = ({ gap, ctx }: any): boolean => {
  if (gap > 0) return;
  ctx.due = `...`;
  ctx.dueColors = "rgb(250, 230, 216)";
  return true;
};

export class TrainDue {
  ctx: any;

  constructor(ctx: Due, private gap: number) {
    this.gap = gap;
    this.ctx = ctx;
  }

  // can also be externalised
  setByGap() {
    const { setPositive, setNegative } = this;
    return setPositive() || setNegative();
  }

  setPositive() {
    return setPositive(this);
  }

  setNegative() {
    return setNegative(this);
  }
}
