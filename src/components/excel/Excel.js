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
    const $root = document.createElement('div');
    // Component - get access to Class and create instance
    this.components.forEach(Component => {
      const component = new Component();
      $root.insertAdjacentHTML('beforeend', component.toHTML());
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
