import { consume } from "@lit/context";
import { PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { Material } from "three";
import { rendererContext, RendererContext } from "../context/renderer";
import { G3DBase } from "./base";

export abstract class G3DMaterialBase<T extends Material> extends G3DBase {
  protected abstract get _material(): T;

  override get isReady() {
    return !!this._material;
  }

  @property({ type: Number, reflect: true })
  set opacity(value: number) {
    this.requestUpdate("opacity", this._material.opacity);
    this._material.opacity = value;
  }
  get opacity() {
    return this._material.opacity;
  }

  @property({ type: Boolean, reflect: true })
  set transparent(value: boolean) {
    this.requestUpdate("transparent", this._material.transparent);
    this._material.transparent = value;
  }
  get transparent() {
    return this._material.transparent ?? false;
  }

  @consume({ context: rendererContext })
  protected _rendererContext?: RendererContext;

  protected initializeMaterial() {
    this._material.opacity = this.opacity;
    this._material.transparent = this.transparent;
  }

  protected override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.initializeMaterial();
  }

  protected override willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    this._material.needsUpdate = true;
    this._rendererContext?.rerender();
  }

  protected _obtainAsset(id: string = "") {
    return this._rendererContext?.getAsset(id) ?? null;
  }
}
