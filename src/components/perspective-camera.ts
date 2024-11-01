import { consume } from "@lit/context";
import { LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PerspectiveCamera } from "three";
import { rendererContext, RendererContext } from "../utils/context/renderer";

@customElement("three-perspective-camera")
export class ThreePerspectiveCamera extends LitElement {
  #camera?: PerspectiveCamera;

  #fov?: number;
  @property({ type: Number, reflect: true })
  set fov(value: number | undefined) {
    this.#fov = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.fov = value ?? 50;
    this.#camera.updateProjectionMatrix();
  }
  get fov() {
    return this.#fov;
  }

  #aspect?: number;
  @property({ type: Number, reflect: true })
  set aspect(value: number | undefined) {
    this.#aspect = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.aspect = value ?? 1;
    this.#camera.updateProjectionMatrix();
  }
  get aspect() {
    return this.#aspect;
  }

  #near?: number;
  @property({ type: Number, reflect: true })
  set near(value: number | undefined) {
    this.#near = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.near = value ?? 0.1;
    this.#camera.updateProjectionMatrix();
  }
  get near() {
    return this.#near;
  }

  #far?: number;
  @property({ type: Number, reflect: true })
  set far(value: number | undefined) {
    this.#far = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.far = value ?? 2000;
    this.#camera.updateProjectionMatrix();
  }
  get far() {
    return this.#far;
  }

  #x?: number;
  @property({ type: Number, reflect: true })
  set x(value: number | undefined) {
    this.#x = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.position.x = value ?? 0;
  }
  get x() {
    return this.#x ?? 0;
  }

  #y?: number;
  @property({ type: Number, reflect: true })
  set y(value: number | undefined) {
    this.#y = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.position.y = value ?? 0;
  }
  get y() {
    return this.#y ?? 0;
  }

  #z?: number;
  @property({ type: Number, reflect: true })
  set z(value: number | undefined) {
    this.#z = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.position.z = value ?? 0;
  }
  get z() {
    return this.#z ?? 0;
  }

  #rotationX?: number;
  @property({ type: Number, reflect: true, attribute: "rotation-x" })
  set rotationX(value: number | undefined) {
    this.#rotationX = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.rotation.x = value ?? 0;
  }
  get rotationX() {
    return this.#rotationX ?? 0;
  }

  #rotationY?: number;
  @property({ type: Number, reflect: true, attribute: "rotation-y" })
  set rotationY(value: number | undefined) {
    this.#rotationY = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.rotation.y = value ?? 0;
  }
  get rotationY() {
    return this.#rotationY ?? 0;
  }

  #rotationZ?: number;
  @property({ type: Number, reflect: true, attribute: "rotation-z" })
  set rotationZ(value: number | undefined) {
    this.#rotationZ = value;
    if (!this.#camera) {
      return;
    }
    this.#camera.rotation.z = value ?? 0;
  }
  get rotationZ() {
    return this.#rotationZ ?? 0;
  }

  @consume({ context: rendererContext })
  _rendererContext?: RendererContext;

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (!this.#camera) {
      this.#camera = new PerspectiveCamera(
        this.fov,
        this.aspect,
        this.near,
        this.far
      );
      this.#camera.position.x = this.x || 0;
      this.#camera.position.y = this.y || 0;
      this.#camera.position.z = this.z || 0;
      this.#camera.rotation.x = this.rotationX || 0;
      this.#camera.rotation.y = this.rotationY || 0;
      this.#camera.rotation.z = this.rotationZ || 0;
    }
    this._rendererContext?.updateCamera(this.#camera);
    this._rendererContext?.rerender();
  }

  render() {
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "three-perspective-camera": ThreePerspectiveCamera;
  }
}
