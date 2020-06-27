import {DomListener} from './DomListener';

/**
 * Common template and logic for component
 *
 *
 * toHTML() abstract base method that define for every instance and return own row of template
 */

export class ExcelComponent extends DomListener {

  toHTML() {
    return ''
  }
}
