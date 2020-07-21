import {$} from '@core/dom';

export class Excel {
  // eslint-disable-next-line valid-jsdoc
  /**
   * selector this.el is just our container with div=app. $ is just node of DOM
   * options - array of classes
   */
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  // return root node for Excel
  getRoot() {
    // create tagName and append classList
    const $root = $.create('div', 'excel')
    // Component - get access to Class and create instance
    this.components.forEach(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $root.append($el)
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
