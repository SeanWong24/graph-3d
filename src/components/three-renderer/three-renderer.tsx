import { Component, Host, h, ComponentInterface, Prop, Element, Method } from '@stencil/core';
import { Renderer, WebGLRenderer, Camera } from 'three';

@Component({
  tag: 'three-renderer',
  styleUrl: 'three-renderer.css',
  shadow: true,
})
export class ThreeRenderer implements ComponentInterface {

  private renderer: Renderer;
  private camera: Camera;

  @Element() hostElmenet: HTMLThreeRendererElement;

  @Prop() width: number;
  @Prop() height: number;
  @Prop() updateStyle: boolean;

  componentDidLoad() {
    this.hostElmenet.shadowRoot.innerHTML = '';
    this.renderer = new WebGLRenderer();
    this.hostElmenet.shadowRoot.appendChild(this.renderer.domElement);
  }

  componentWillRender() {
    this.renderer?.setSize(this.width, this.height, this.updateStyle);
  }

  /**
   * Update the camera object for the rederer.
   * @param camera the camera object
   * 
   * @internal
   */
  @Method()
  async updateCamera(camera: Camera) {
    this.camera = camera;
    this.tryAnimate();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  private tryAnimate() {
    if(this.renderer && this.camera) {
      this.animate();
    }
  }

  private animate() {
    this.renderer?.render(null, this.camera);
  }

}
