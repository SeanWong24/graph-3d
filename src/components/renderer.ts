import { provide } from "@lit/context";
import { css, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Renderer, WebGLRenderer, Camera, Scene } from "three";
import { RendererContext, rendererContext } from "../utils/context/renderer";
import { G3DBase } from "../utils/base/base";

@customElement("g3d-renderer")
export class G3DRenderer extends G3DBase {
  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `;

  #renderer: Renderer;
  #camera?: Camera;
  #scene?: Scene;
  #assetMap: Map<string, unknown> = new Map();
  #assetChangeWatchers: Set<(id: string) => void> = new Set();
  #resizeObserver?: ResizeObserver;
  #shouldRerender = false;

  isReady = false;

  @provide({ context: rendererContext })
  context: RendererContext = {
    updateCamera: (camera) => {
      this.#camera = camera;
      this.#renderScene();
    },
    updateScene: (scene) => {
      this.#scene = scene;
      this.#renderScene();
    },
    rerender: () => {
      if (this.#shouldRerender) {
        return;
      }
      this.#shouldRerender = true;
      requestAnimationFrame(() => {
        this.#shouldRerender = false;
        this.#renderScene();
      });
    },
    addAsset: (id, asset) => {
      if (!id) {
        return;
      }
      this.#assetMap.set(id, asset);
      this.#notifyAssetChange(id);
    },
    removeAsset: (id) => {
      if (!id) {
        return;
      }
      this.#assetMap.delete(id);
      this.#notifyAssetChange(id);
    },
    getAsset: (id) => this.#assetMap.get(id),
    watchAssetChange: (handler) => this.#assetChangeWatchers.add(handler),
    unwatchAssetChange: (handler) => this.#assetChangeWatchers.delete(handler),
  };

  //#region properties

  @property({ type: Boolean, reflect: true, attribute: "update-style" })
  accessor updateStyle = false;

  //#endregion

  constructor() {
    super();
    this.#renderer = new WebGLRenderer();
    this.context.renderer = this.#renderer;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#renderScene();
    this.#resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target !== this) {
          continue;
        }
        this.dispatchEvent(new Event("resize"));
        this.#updateSize();
      }
    });
    this.#resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver?.disconnect();
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.isReady = true;
  }

  protected willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);
    if (
      changedProperties.has("width") ||
      changedProperties.has("height") ||
      changedProperties.has("updateStyle")
    ) {
      this.#updateSize();
    }
  }

  render() {
    return this.#renderer?.domElement;
  }

  #updateSize() {
    this.#renderer?.setSize(
      this.clientWidth,
      this.clientHeight,
      this.updateStyle
    );
  }

  #renderScene() {
    if (!this.#renderer || !this.#camera || !this.#scene) {
      return;
    }
    this.#renderer.render(this.#scene, this.#camera);
  }

  #notifyAssetChange(id: string) {
    for (const handler of this.#assetChangeWatchers) {
      handler(id);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "g3d-renderer": G3DRenderer;
  }
}
