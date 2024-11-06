import { consume } from "@lit/context";
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ColorSpace, Texture, TextureLoader } from "three";
import { RendererContext, rendererContext } from "../utils/context/renderer";

@customElement("g3d-texture")
export class G3DTexture extends LitElement {
  #texture?: Texture;

  @property({ reflect: true })
  src?: string;

  @property({ reflect: true, attribute: "color-space" })
  colorSpace?: ColorSpace;

  @consume({ context: rendererContext })
  _rendererContext?: RendererContext;

  async connectedCallback() {
    super.connectedCallback();
    this.#texture = await new TextureLoader().loadAsync(this.src ?? "");
    this.#texture.colorSpace = this.colorSpace ?? "";
    if (this.id) {
      this._rendererContext?.addAsset(this.id, this.#texture);
    }
  }

  // TODO handle id change

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.id) {
      this._rendererContext?.removeAsset(this.id);
    }
  }

  render() {
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-texture": G3DTexture;
  }
}
