import { consume } from "@lit/context";
import { css, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { Material } from "three";
import { rendererContext, RendererContext } from "../context/renderer";

export abstract class ThreeMaterialBase<T extends Material> extends LitElement {
  static styles = css``;

  protected _material?: T;

  #opacity?: number;
  @property({ type: Number, reflect: true })
  set opacity(value: number | undefined) {
    this.#opacity = value ?? 1;
    if (!this._material) {
      return;
    }
    this._material.opacity = this.#opacity;
  }
  get opacity() {
    return this.#opacity ?? 1;
  }

  #transparent?: boolean;
  @property({ type: Boolean, reflect: true })
  set transparent(value: boolean | undefined) {
    this.#transparent = value ?? false;
    if (!this._material) {
      return;
    }
    this._material.transparent = this.#transparent;
  }
  get transparent() {
    return this.#transparent ?? false;
  }

  @consume({ context: rendererContext })
  protected _rendererContext?: RendererContext;

  protected abstract initializeMaterial(): void;

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.initializeMaterial();
  }

  render() {
    return null;
  }

  protected _obtainAsset(id: string = "") {
    return this._rendererContext?.getAsset(id) ?? null;
  }
}
