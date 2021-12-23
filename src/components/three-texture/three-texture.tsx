import { Component, Host, h, Element, Prop, ComponentInterface } from '@stencil/core';
import { Texture, TextureLoader } from 'three';

export type MaterialElement = HTMLThreeMeshStandardMaterialElement;

@Component({
  tag: 'three-texture',
  styleUrl: 'three-texture.css',
  shadow: true,
})
export class ThreeTexture implements ComponentInterface {

  private material: MaterialElement;
  private texture: Texture;

  @Prop({ reflect: true }) src: string;
  @Prop({ reflect: true }) map = '';

  @Element() hostElement: HTMLThreeTextureElement;

  async connectedCallback() {
    this.texture = await new TextureLoader().loadAsync(this.src);
    this.addToMaterial();
  }

  disconnectedCallback() {
    this.removeFromMaterial();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private addToMaterial() {
    this.material = this.hostElement.parentElement as HTMLThreeMeshStandardMaterialElement;
    this.material?.updateMap(this.texture, this.map);
  }

  private removeFromMaterial() {
    this.material?.updateMap(undefined, this.map);
  }
}
