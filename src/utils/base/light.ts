import { consume } from "@lit/context";
import { property } from "lit/decorators.js";
import { ColorRepresentation, Color, Light } from "three";
import { object3DContext, Object3DContext } from "../context/object-3d";
import { ThreeObject3DBase } from "./object-3d";

export abstract class ThreeLightBase<
  T extends Light
> extends ThreeObject3DBase<T> {
  #color: ColorRepresentation = "";
  @property()
  set color(value: ColorRepresentation) {
    this.#color = value;
    this._object.color = new Color(value);
  }
  get color() {
    return this.#color;
  }

  #intensity: number = 1;
  @property({ type: Number })
  set intensity(value: number) {
    this.#intensity = value;
    if (!this._object) {
      return;
    }
    this._object.intensity = value;
  }
  get intensity() {
    return this.#intensity;
  }

  @consume({ context: object3DContext })
  protected _sceneContext?: Object3DContext;

  connectedCallback() {
    super.connectedCallback();
    this._object.color = new Color(this.color);
    this._object.intensity = this.intensity;
    this._initializeLight();
    this._sceneContext?.addObject(this._object);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._sceneContext?.removeObject(this._object);
  }

  protected _initializeLight() {}

  render() {
    return null;
  }
}
