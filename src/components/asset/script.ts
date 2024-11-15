import { customElement } from "lit/decorators.js";
import { G3DAssetBase } from "../../utils/base/asset";

@customElement("g3d-script")
export class G3DScript extends G3DAssetBase<string> {
  #mutationObserver?: MutationObserver;

  isReady = false;

  protected get _asset() {
    return this.textContent ?? "";
  }

  protected async _initializeAsset() {
    super._initializeAsset();
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
    this.isReady = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-script": G3DScript;
  }
}
