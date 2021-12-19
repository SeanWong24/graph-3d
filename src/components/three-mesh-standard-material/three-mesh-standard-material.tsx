import { Component, Host, h, ComponentInterface, Element, Prop } from '@stencil/core';
import { ColorRepresentation, MeshStandardMaterial, MeshStandardMaterialParameters, Texture } from 'three';

@Component({
  tag: 'three-mesh-standard-material',
  styleUrl: 'three-mesh-standard-material.css',
  shadow: true,
})
export class ThreeMeshStandardMaterial implements ComponentInterface, MeshStandardMaterialParameters{

  private meshElement: HTMLThreeMeshElement;
  private material: MeshStandardMaterial;

  map?: Texture;
  
  @Element() hostElement: HTMLThreeMeshStandardMaterialElement;
  
  @Prop() color?: ColorRepresentation;

  connectedCallback() {
    this.material = new MeshStandardMaterial({
      color: this.color
    });

    this.addToMesh();
  }

  disconnectedCallback() {
    this.removeFromMesh();
  }

  componentShouldUpdate(newVal: any, _oldVal: any, propName: string) {
    if (this.material) {
      this.material[propName] = newVal;
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

  private addToMesh() {
    this.meshElement = this.hostElement.parentElement as HTMLThreeMeshElement;
    this.meshElement?.updateMaterial(this.material);
  }

  private removeFromMesh() {
    this.meshElement?.updateMaterial(undefined);
  }

}
