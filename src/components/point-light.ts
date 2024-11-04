import { customElement, property } from "lit/decorators.js";
import { PointLight } from "three";
import { ThreeLightBase } from "../utils/base/light";

@customElement("three-point-light")
export class ThreePointLight extends ThreeLightBase<PointLight> {
  protected override _object = new PointLight();

  #distance?: number;
  @property({ type: Number })
  set distance(value: number | undefined) {
    this.#distance = value;
    if (!this._object) {
      return;
    }
    this._object.distance = value ?? 0;
  }
  get distance() {
    return this.#distance;
  }

  #decay?: number;
  @property({ type: Number })
  set decay(value: number | undefined) {
    this.#decay = value;
    if (!this._object) {
      return;
    }
    this._object.decay = value ?? 2;
  }
  get decay() {
    return this.#decay;
  }

  protected override _initializeLight() {
    super._initializeLight();
    this._object = new PointLight(this.distance, this.decay);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-point-light": ThreePointLight;
  }
}
