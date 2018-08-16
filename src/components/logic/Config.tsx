
/**
 * Configuration class.
 *
 * Use this class when there is a need to pass multiple values to a component
 * and you want to avoid declaring too many attributes on the JSX tag.
 */
class Config {

  private props: string[];
  private values: any[];
  private strict: boolean;
  private editAllowed: boolean;

  public constructor() {
    this.props = [];
    this.values = [];
    this.strict = true;
    this.editAllowed = false;
  }

  public set(prop: string, value: any): void {
    if (prop.length > 0 && typeof value !== 'undefined') {
      const index: number = this.props.indexOf(prop);
      if (index < 0) {
        this.props.push(prop);
        this.values.push(value);
      } else if (this.editAllowed) {
        const propIndex: number = this.props.indexOf(prop);
        this.values[propIndex] = value;
      }
      return;
    }
    if (this.strict) {
      throw new Error("Bad value: " + value);
    }
  }

  public get(prop: string): any {
    const index: number = this.props.indexOf(prop);
    if (index >= 0) {
      return this.values[index];
    }

    if (this.strict) {
      throw new Error("Bad property: " + prop);
    }

    return null;
  }

  public rGet(prop: string):any {
    const tmp:boolean = this.strict;
    this.strict = false;
    const value:any = this.get(prop);
    this.strict = tmp;

    return value;
  }

  public remove(prop: string): void {
    const props: string[] = [];
    const values: any[] = [];
    for (let j = 0; j < this.props.length; j++) {
      const p: string = this.props[j];
      if (p !== prop) {
        props[j] = this.props[j];
        values[j] = this.values[j];
      }
    }
  }

  /**
   * Get values.
   *
   * @return {any[]}
   */
  public getVal(): any[] {
    return this.values;
  }

  public beStrict(): void {
    this.strict = true;
  }

  public relax(): void {
    this.strict = false;
  }

}

export default Config;