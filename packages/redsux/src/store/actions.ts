import { action } from "../lib/action";

export const add = action(`add`)<{ id: number; amount: number }>();
export const sub = action(`sub`)<{ id: number; amount: number }>();
export const newCounter = action(`newcounter`)<{ name: string; id: number }>();
