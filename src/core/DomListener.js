// Abstract layer to Support event listener for dynamic behaviour
export class DomListener {
  // Object to hang the listener on
  constructor($root) {
    if (!$root) {
      throw new Error(`No root provided for DomListener`)
    }
    this.$root=$root
  }
}
