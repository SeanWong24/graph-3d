import { consume } from "@lit/context";
import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ColorRepresentation, Color, Light } from "three";
import { SceneContext, sceneContext } from "../context/scene";

export abstract class ThreeLightBase<T extends Light> extends LitElement {
  protected _light?: T;

  #color?: ColorRepresentation;
  @property()
  set color(value: ColorRepresentation | undefined) {
    this.#color = value;
    if (!this._light) {
      return;
    }
    this._light.color = new Color(value ?? "");
  }
  get color() {
    return this.#color;
  }

  #intensity?: number;
  @property({ type: Number })
  set intensity(value: number | undefined) {
    this.#intensity = value;
    if (!this._light) {
      return;
    }
    this._light.intensity = value ?? 1;
  }
  get intensity() {
    return this.#intensity;
  }

  @consume({ context: sceneContext })
  protected _sceneContext?: SceneContext;

  connectedCallback() {
    super.connectedCallback();
    this.initializeLight();
    this._sceneContext?.addObject(this._light);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._sceneContext?.removeObject(this._light);
  }

  protected abstract initializeLight(): void;

  render() {
    return null;
  }
}