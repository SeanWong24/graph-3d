import { Component, Host, h, ComponentInterface, Element } from '@stencil/core';
import { Scene, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

@Component({
  tag: 'three-scene',
  styleUrl: 'three-scene.css',
  shadow: true,
})
export class ThreeScene implements ComponentInterface {

  @Element() hostElement: HTMLThreeSceneElement;

  private scene: Scene;

  componentDidLoad() {
    this.scene = new Scene();
    this.addACube();
    const rendererElement = this.hostElement.parentElement as HTMLThreeRendererElement;
    rendererElement?.updateScene(this.scene);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  // TODO remove it later
  private addACube() {
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    this.scene.add(cube);
  }

}
