import { LitElement } from "lit";

export abstract class G3DBase extends LitElement {
  abstract get isReady(): boolean;

  protected render(): unknown {
    return null;
  }
}
