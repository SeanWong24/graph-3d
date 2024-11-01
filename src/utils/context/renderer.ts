import { createContext } from "@lit/context";
import { Renderer, Camera, Scene } from "three";

export type RendererContext = {
  renderer?: Renderer;
  updateCamera: (camera: Camera) => void;
  updateScene: (scene: Scene) => void;
  rerender: () => void;
  addAsset: (id: string, asset: unknown) => void;
  removeAsset: (id: string) => void;
  getAsset: (id: string) => unknown | undefined;
  watchAssetChange: (handler: (id: string) => void) => void;
  unwatchAssetChange: (handler: (id: string) => void) => void;
};
export const RENDERER_CONTEXT_SYMBOL = Symbol("renderer-context");
export const rendererContext = createContext<RendererContext>(
  RENDERER_CONTEXT_SYMBOL
);
