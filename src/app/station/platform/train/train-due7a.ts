import { CdkTextColumn } from "@angular/cdk/table";

interface Due {
  due: string;
  dueColors: string;
}

const soon = gap => gap < 2;

export const setSoon = ({ gap, ctx }: any) => {
  if (soon(gap)) return;
  ctx.due = "due";
  ctx.dueColors = "rgba(210, 250, 191)";
  return true;
};

export const setMins = ({ gap, ctx }: any) => {
  if (!soon(gap)) return;
  ctx.due = `${gap} mins`;

  return true;
};

const positive = gap => gap <= 0;

export const setSpecial = ({ gap, ctx }: any): void => {
  if (gap === 7) {
    ctx.special = "blue";
  } else if (gap === 8) {
    ctx.special = "red";
  } else {
    ctx.special = "none";
  }
};

export const setPositive = (params: any): boolean => {
  if (positive(params.gap)) return;
  setSpecial(params);
  return setSoon(params) || setMins(params);
};

export const setNegative = ({ gap, ctx }: any): boolean => {
  if (!positive(gap)) return;
  ctx.due = `...`;
  return true;
};

export const setDefault = ({ ctx }: any) =>
  (ctx.dueColors = "rgb(250, 230, 216)");

export class TrainDue {
  ctx: any;

  constructor(ctx: Due, private gap: number) {
    this.gap = gap;
    this.ctx = ctx;
  }

  // can also be externalised
  setByGap() {
    const { setPositive, setNegative, setDefault } = this;
    return (setPositive() || setNegative()) && setDefault();

    // alternative pattern:
    // setDefault();
    // return setPositive() || setNegative() || handleInvalid();
  }

  setPositive() {
    return setPositive(this);
  }

  setNegative() {
    return setNegative(this);
  }

  setDefault() {
    return this.execute("setDefault", () => setDefault(this));
  }

  execute(fnName: string, fn: () => any) {
    this.log(`start: ${fnName}`);
    fn();
    this.log(`end: ${fnName}`);
  }

  log(msg: string) {
    console.log(msg);
  }
}
