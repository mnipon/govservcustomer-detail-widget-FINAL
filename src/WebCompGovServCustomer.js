import React, { createElement } from "react";
import ReactDOM from "react-dom";
import ReactHTMLElement from "react-html-element";
import { render, unmountComponentAtNode } from "react-dom";
import Root from "./components/Root";

class WebCompGovServCustomer extends ReactHTMLElement {
  connectedCallback() {
    const interactionId = this.getAttribute("interactionid");
    this.api = window.WS?.widgetAPI(interactionId);

    ReactDOM.render(
      <Root api={this.api} interactionId={interactionId} />,
      this
    );
  }

  disconnectedCallback() {
    unmountComponentAtNode(Root);
  }
}

customElements.define("web-comp-govservcustomer", WebCompGovServCustomer);
