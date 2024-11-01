import { customElement, property } from "lit/decorators.js";
import { PointLight } from "three";
import { ThreeLightBase } from "../utils/base/light";

@customElement("three-point-light")
export class ThreePointLight extends ThreeLightBase<PointLight> {
  #distance?: number;
  @property({ type: Number })
  set distance(value: number | undefined) {
    this.#distance = value;
    if (!this._light) {
      return;
    }
    this._light.distance = value ?? 0;
  }
  get distance() {
    return this.#distance;
  }

  #decay?: number;
  @property({ type: Number })
  set decay(value: number | undefined) {
    this.#decay = value;
    if (!this._light) {
      return;
    }
    this._light.decay = value ?? 2;
  }
  get decay() {
    return this.#decay;
  }

  #x?: number;
  @property({ type: Number })
  set x(value: number) {
    this.#x = value;
    if (!this._light) {
      return;
    }
    this._light.position.x = value ?? 0;
  }
  get x() {
    return this.#x ?? 0;
  }

  #y?: number;
  @property({ type: Number })
  set y(value: number) {
    this.#y = value;
    if (!this._light) {
      return;
    }
    this._light.position.y = value ?? 0;
  }
  get y() {
    return this.#y ?? 0;
  }

  #z?: number;
  @property({ type: Number })
  set z(value: number) {
    this.#z = value;
    if (!this._light) {
      return;
    }
    this._light.position.z = value ?? 0;
  }
  get z() {
    return this.#z ?? 0;
  }

  protected override initializeLight() {
    this._light = new PointLight(
      this.color,
      this.intensity,
      this.distance,
      this.decay
    );
    // TODO make it parameter
    this._light.position.set(this.x, this.y, this.z);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-point-light": ThreePointLight;
  }
}
