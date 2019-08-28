interface Due {
  due: string;
  dueColors: string;
}

export const setPositive = ({ ctx, gap }: any) => {
  if (gap < 2) {
    ctx.due = "due";
    ctx.dueColors = "rgba(210, 250, 191)";
  } else {
    ctx.due = `${gap} mins`;
    ctx.dueColors = "rgb(250, 230, 216)";
  }
};

export const setNegative = ({ ctx }: any) => {
  ctx.due = `...`;
  ctx.dueColors = "rgb(250, 230, 216)";
};

export class TrainDue {
  ctx: any;

  constructor(ctx: Due, private gap: number) {
    this.gap = gap;
    this.ctx = ctx;
  }

  // can also be externalised
  setByGap() {
    const { gap, setPositive, setNegative } = this;
    gap > 0 ? setPositive() : setNegative();
  }

  setPositive() {
    setPositive(this);
  }

  setNegative() {
    setNegative(this);
  }
}
