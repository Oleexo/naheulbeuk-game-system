class Logger {
  constructor(private readonly output: Console) {
    this.output = output;
  }

  public log(...args: any[]): void {
    this.output.log(this.getPrefix(), ...args);
  }

  public warn(...args: any[]): void {
    this.output.warn(this.getPrefix(), ...args);
  }

  public error(...args: any[]): void {
    this.output.error(this.getPrefix(), ...args);
  }

  public info(...args: any[]): void {
    this.output.info(this.getPrefix(), ...args);
  }

  public debug(...args: any[]): void {
    this.output.debug(this.getPrefix(), ...args);
  }

  private getPrefix(): string {
    return `[NBH-System] ${new Date().toLocaleTimeString()}:`;
  }
}

export default new Logger(console);
