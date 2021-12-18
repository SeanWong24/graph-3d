import { Component, Host, h, ComponentInterface, Prop, Element } from '@stencil/core';
import { Renderer, WebGLRenderer } from 'three';

@Component({
  tag: 'three-renderer',
  styleUrl: 'three-renderer.css',
  shadow: true,
})
export class ThreeRenderer implements ComponentInterface {
  
  private renderer: Renderer;
  
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

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
