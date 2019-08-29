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
    const { execute } = this;
    return (execute("Positive") || execute("Negative")) && execute("Default");

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
    return setDefault(this);
  }

  execute(name: string) {
    this.log(`start: ${name}`);
    const funName = `set${name}`;
    const fn = this[funName];
    const result = fn();
    this.log(`end: ${name}`);
    return result;
  }

  log(msg: string) {
    console.log(msg);
  }
}
