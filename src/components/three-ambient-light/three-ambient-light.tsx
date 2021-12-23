import { Component, Host, h, ComponentInterface, Element, Prop } from '@stencil/core';
import { AmbientLight, ColorRepresentation } from 'three';

@Component({
  tag: 'three-ambient-light',
  styleUrl: 'three-ambient-light.css',
  shadow: true,
})
export class ThreeAmbientLight implements ComponentInterface {
  
  private sceneElement: HTMLThreeSceneElement;
  private light: AmbientLight;

  @Element() hostElement: HTMLThreeAmbientLightElement;

  @Prop() color?: ColorRepresentation;
  @Prop() intensity?: number;
  
  connectedCallback() {
    this.light = new AmbientLight(this.color, this.intensity);
    this.addToScene();
  }

  disconnectedCallback() {
    this.removeFromScene();
  }

  componentShouldUpdate(newVal: any, _oldVal: any, propName: string) {
    if (this.light) {
      this.light[propName] = newVal;
    }
    return false;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private addToScene() {
    this.sceneElement = this.hostElement.parentElement as HTMLThreeSceneElement;
    this.sceneElement?.addObject(this.light);
  }

  private removeFromScene() {
    this.sceneElement?.removeObject(this.light);
  }
}
