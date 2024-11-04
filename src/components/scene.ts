import { consume, provide } from "@lit/context";
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Scene, Object3D, Color } from "three";
import { rendererContext, RendererContext } from "../utils/context/renderer";
import { object3DContext, Object3DContext } from "../utils/context/object-3d";

@customElement("three-scene")
export class ThreeScene extends LitElement {
  #scene: Scene;

  #background?: string;
  @property({ reflect: true })
  set background(value: string | undefined) {
    this.#background = value;
    if (!this.#scene) {
      return;
    }
    this.#scene.background = (this.#obtainAsset(this.#background) ??
      new Color(this.#background) ??
      null) as any;
    this._rendererContext?.rerender();
  }
  get background() {
    return this.#background;
  }

  @consume({ context: rendererContext })
  _rendererContext?: RendererContext;

  @provide({ context: object3DContext })
  context: Object3DContext = {
    addObject: (obj) => this.#addObject(obj),
    removeObject: (obj) => this.#removeObject(obj),
  };

  constructor() {
    super();
    this.#scene = new Scene();
    this.context.object = this.#scene;
  }

  firstUpdated() {
    this._rendererContext?.updateScene(this.#scene);
    this._rendererContext?.watchAssetChange((id) =>
      this.#handleAssetsChange(id)
    );
  }

  render() {
    return null;
  }

  #obtainAsset(id: string = "") {
    return this._rendererContext?.getAsset(id) ?? null;
  }

  #addObject(object?: Object3D) {
    if (!object) {
      return;
    }
    this.#scene?.add(object);
    this._rendererContext?.rerender();
  }

  #removeObject(object?: Object3D) {
    if (!object) {
      return;
    }
    this.#scene?.remove(object);
    this._rendererContext?.rerender();
  }

  #handleAssetsChange(id: string) {
    if (!this.#scene) {
      return;
    }
    switch (id) {
      case this.background:
        this.#scene.background = (this.#obtainAsset(this.background) ??
          new Color(this.background) ??
          null) as any;
        this._rendererContext?.rerender();
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-scene": ThreeScene;
  }
}
