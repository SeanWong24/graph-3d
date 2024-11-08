import { consume } from "@lit/context";
import { property } from "lit/decorators.js";
import { RendererContext, rendererContext } from "../context/renderer";
import { G3DBase } from "./base";

export abstract class G3DAssetBase<T> extends G3DBase {
  protected abstract get _asset(): T | undefined;

  #id?: string;
  @property({ reflect: true })
  set id(value: string) {
    this._rendererContext?.removeAsset(this.id);
    this.#id = value;
    this._rendererContext?.addAsset(this.id, this._asset);
  }
  get id() {
    return this.#id ?? "";
  }

  @consume({ context: rendererContext })
  _rendererContext?: RendererContext;

  async connectedCallback() {
    super.connectedCallback();
    await this._initializeAsset();
    if (this.id) {
      this._rendererContext?.addAsset(this.id, this._asset);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.id) {
      this._rendererContext?.removeAsset(this.id);
    }
  }

  protected async _initializeAsset() {}
}
