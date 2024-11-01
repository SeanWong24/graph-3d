import { createContext } from "@lit/context";
import { Scene, Object3D } from "three";

export type SceneContext = {
  scene?: Scene;
  addObject: (obj?: Object3D) => void;
  removeObject: (obj?: Object3D) => void;
};
export const SCENE_CONTEXT_SYMBOL = Symbol("scene-context");
export const sceneContext = createContext<SceneContext>(SCENE_CONTEXT_SYMBOL);
