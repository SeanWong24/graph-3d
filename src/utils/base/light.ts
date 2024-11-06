import { consume } from "@lit/context";
import { property } from "lit/decorators.js";
import { ColorRepresentation, Color, Light } from "three";
import { object3DContext, Object3DContext } from "../context/object-3d";
import { ThreeObject3DBase } from "./object-3d";
import { rendererContext, RendererContext } from "../context/renderer";
import { PropertyValues } from "lit";

export abstract class G3DLightBase<
  T extends Light
> extends ThreeObject3DBase<T> {
  #color?: ColorRepresentation;
  @property({ reflect: true })
  set color(value: ColorRepresentation) {
    this._object.color = new Color(value ?? "");
  }
  get color() {
    return this.#color ?? `#${this._object.color.getHexString()}`;
  }

  @property({ type: Number })
  set intensity(value: number) {
    this._object.intensity = value;
  }
  get intensity() {
    return this._object.intensity;
  }

  @consume({ context: rendererContext })
  protected _rendererContext?: RendererContext;

  @consume({ context: object3DContext })
  protected _sceneContext?: Object3DContext;

  connectedCallback() {
    super.connectedCallback();
    this._initializeLight();
    this._sceneContext?.addObject(this._object);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._sceneContext?.removeObject(this._object);
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    this._rendererContext?.rerender();
  }

  protected _initializeLight() {
    this._object.color = new Color(this.color);
    this._object.intensity = this.intensity;
  }

  render() {
    return null;
  }
}
