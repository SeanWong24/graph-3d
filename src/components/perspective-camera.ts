import { PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PerspectiveCamera } from "three";
import { ThreeObject3DBase } from "../utils/base/object-3d";

@customElement("g3d-perspective-camera")
export class G3DPerspectiveCamera extends ThreeObject3DBase<PerspectiveCamera> {
  protected override _object = new PerspectiveCamera();

  @property({ type: Number, reflect: true })
  set fov(value: number) {
    this.requestUpdate("fov", this._object.fov);
    this._object.fov = value;
  }
  get fov() {
    return this._object.fov;
  }

  @property({ type: Number, reflect: true })
  set aspect(value: number) {
    this.requestUpdate("aspect", this._object.aspect);
    this._object.aspect = value;
  }
  get aspect() {
    return this._object.aspect;
  }

  @property({ type: Number, reflect: true })
  set near(value: number) {
    this.requestUpdate("near", this._object.near);
    this._object.near = value ?? 0.1;
  }
  get near() {
    return this._object.near;
  }

  @property({ type: Number, reflect: true })
  set far(value: number) {
    this.requestUpdate("far", this._object.far);
    this._object.far = value;
  }
  get far() {
    return this._object.far;
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties);
    this._object.updateProjectionMatrix();
    this._rendererContext?.rerender();
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._object.updateProjectionMatrix();
    this._rendererContext?.updateCamera(this._object);
    this._rendererContext?.rerender();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-perspective-camera": G3DPerspectiveCamera;
  }
}
