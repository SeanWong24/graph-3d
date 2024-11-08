import { customElement, property } from "lit/decorators.js";
import { ColorSpace, Texture, TextureLoader } from "three";
import { G3DAssetBase } from "../utils/base/asset";

@customElement("g3d-texture")
export class G3DTexture extends G3DAssetBase<Texture> {
  #texture?: Texture;

  protected override get _asset() {
    return this.#texture;
  }

  #src?: string;
  @property({ reflect: true })
  set src(value: string) {
    this.#src = value;
    this._initializeAsset().then(() => {
      if (this.id) {
        this._rendererContext?.addAsset(this.id, this._asset);
      }
    });
  }
  get src() {
    return this.#src ?? "";
  }

  @property({ reflect: true, attribute: "color-space" })
  colorSpace?: ColorSpace;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.id) {
      this._rendererContext?.removeAsset(this.id);
    }
  }

  protected override async _initializeAsset() {
    this.#texture = await new TextureLoader().loadAsync(this.src ?? "");
    this.#texture.colorSpace = this.colorSpace ?? "";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-texture": G3DTexture;
  }
}
