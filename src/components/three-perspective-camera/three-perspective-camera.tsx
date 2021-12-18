import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';
import { PerspectiveCamera } from 'three';

@Component({
  tag: 'three-perspective-camera',
  styleUrl: 'three-perspective-camera.css',
  shadow: true,
})
export class ThreePerspectiveCamera implements ComponentInterface {

  private camera: PerspectiveCamera;

  @Element() hostElement: HTMLThreePerspectiveCameraElement;

  @Prop() fov?: number;
  @Prop() aspect?: number;
  @Prop() near?: number;
  @Prop() far?: number;

  componentDidLoad() {
    this.camera = new PerspectiveCamera();
    const rendererElement = this.hostElement.parentElement as HTMLThreeRendererElement;
    rendererElement?.updateCamera(this.camera);
  }

  componentWillRender() {
    this.camera.fov = this.fov;
    this.camera.aspect = this.aspect;
    this.camera.near = this.near;
    this.camera.far = this.far;
    this.camera.updateProjectionMatrix();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
