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

export const createSetSpecial = (ctx: any) => (color: string): void => {
  ctx.special = color;
};

const specialColorMap = {
  7: "blue",
  8: "red"
};

export const setSpecialByGap = ({ gap, ctx }: any): void => {
  const setSpecial = createSetSpecial(ctx);
  setSpecial(specialColorMap[gap] || "none");
};

export const setPositive = (params: any): boolean => {
  if (positive(params.gap)) return;
  setSpecialByGap(params);
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
    return setDefault(this);
  }
}
