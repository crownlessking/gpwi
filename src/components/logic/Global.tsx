import * as React from 'react';
import Config from 'src/components/logic/Config';

/**
 * This interface will make a method from a component available to all other
 * components.
 * 
 * To create a global method, insert its prototype in this interface and add a
 * default value to the instance
 * Import the instance in your component and reassign the property there.
 */
interface IApp {

  addClass : (classes:string, className:string) => string;
  removeClass : (classes:string, classNames:string[]) => string;
  hasClass : (classes:string, className:string) => boolean;
  iconRender : (icon:string) => any;

  /* TABs ------------------------------------------------------------------ */
  newTab : (config:Config) => any;
  newNav : (config:any[]) => any;
  /* ----------------------------------------------------------------------- */

  // TODO Insert the signature of the method you wish to be global here.
  //      then add it to "app", an instance of this interface.
}

const app :IApp = {

  // TODO Don't forget to insert a default value for your method here.
  //      The property cannot be optional.

  /**
   * Appends a class name to a space-separated list of classes.
   *
   * @param {string} classes   space-separated list of classes
   * @param {string} className class name to be removed
   *
   * @return {string}
   */
  addClass : (classes:string, className:string):string => {
    if (classes.indexOf(className) >= 0) {
        return classes;
    }
    if (classes.endsWith(' ')) {
        return classes + className;
    }
    return classes + ' ' + className;
  },

  /**
   * Test if class name present in space-separated list of classes.
   *
   * @param {string} classes   space-separated list of classes
   * @param {string} className class name to search for.
   *
   * @return {boolean}
   */
  hasClass : (classes:string, className:string) => {
    if (classes.indexOf(className) >= 0) {
      return true;
    }
    return false;
  },

  /**
   * Get JSX.Element of an icon.
   *
   * @param {string} icon classes of icon tag, regardless of the tag.
   *
   * @return {any}
   */
  iconRender: (icon: string): any => {
    if (icon.startsWith('glyphicon glyphicon-')) {
      return <span className={icon} />;
    } else if (icon.startsWith('fa')) {
      return <i className={icon} />;
    }

    // throw new Error('Icon class not recognized: ' + icon);
    return '';
  },

  newNav : () => {return},
  newTab : () => {return},

  /**
   * If given a list of space-seperated class names as a string, this method
   * will remove a class name from the list.
   *
   * @param {string} classes   space-separated list of classes
   * @param {Array<string>} classNames class name to be removed
   *
   * @return {string}
   */
  removeClass: (classes: string, classNames: string[]): string => {
    let result: string = classes;
    for (const className of result) {
      const regex: RegExp = new RegExp(className);
      result = result.replace(regex, '');
    }
    return result;
  }

};

export default app;