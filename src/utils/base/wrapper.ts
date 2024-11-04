import { LitElement } from "lit";

export abstract class ThreeWrapperBase extends LitElement {
  abstract get isReady(): boolean;
}
