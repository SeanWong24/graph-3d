import { customElement } from "lit/decorators.js";
import { G3DAssetBase } from "../utils/base/asset";

@customElement("g3d-script")
export class G3DScript extends G3DAssetBase<string> {
  #mutationObserver?: MutationObserver;

  protected get _asset() {
    return this.textContent ?? "";
  }

  override async connectedCallback() {
    super.connectedCallback();
    this.#mutationObserver = new MutationObserver((_) => {
      if (this.id) {
        this._rendererContext?.addAsset(this.id, this._asset);
      }
    });
    this.#mutationObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    this._rendererContext?.addAsset(this.id, this._asset);
  }

  override disconnectedCallback() {
    this._rendererContext?.removeAsset(this.id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-script": G3DScript;
  }
}
