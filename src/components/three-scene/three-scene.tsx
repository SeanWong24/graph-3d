import { Component, Host, h, ComponentInterface, Element, Method } from '@stencil/core';
import { Scene, Object3D } from 'three';

@Component({
  tag: 'three-scene',
  styleUrl: 'three-scene.css',
  shadow: true,
})
export class ThreeScene implements ComponentInterface {

  @Element() hostElement: HTMLThreeSceneElement;

  private scene: Scene;

  connectedCallback() {
    this.scene = new Scene();
    this.notifyChangeToRederer();
  }

  /**
   * Add an object into the scene.
   * @param object the object to be added
   * 
   * @internal
   */
  @Method()
  async addObject(object: Object3D) {
    this.scene?.add(object);
  }

  /**
   * Remove an object from the scene.
   * @param object the object to be removed
   * 
   * @internal
   */
  @Method()
  async removeObject(object: Object3D) {
    this.scene?.remove(object);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private notifyChangeToRederer() {
    const rendererElement = this.hostElement.parentElement as HTMLThreeRendererElement;
    rendererElement?.updateScene(this.scene);
  }

}
