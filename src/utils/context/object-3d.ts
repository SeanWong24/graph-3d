import { createContext } from "@lit/context";
import { Object3D } from "three";

export type Object3DContext = {
  object?: Object3D;
  addObject: (obj?: Object3D) => void;
  removeObject: (obj?: Object3D) => void;
};
export const OBJECT_3D_CONTEXT_SYMBOL = Symbol("object-3d-context");
export const object3DContext = createContext<Object3DContext>(
  OBJECT_3D_CONTEXT_SYMBOL
);
