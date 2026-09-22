
interface Time {
  h: number ;
  m: number ;
  s: number ;
}


export class TimeCalculator {
  private response = ''
  private isResult = false
  private operation: string | undefined
  private firstUnits: string[] = []
  private secondUnits: string[] = []

  constructor() {}


  onKey(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter': {
        this.calculate();
        break;
      }
      case 'Backspace': {
        this.clear();
        break;
      }
      case '+': case '-': case '/': case '*': {
        this.insertOperation(event.key, true);
        break;
      }
      case 'h': case 'm': case 's': {
        this.insertUnit(event.key);
        break;
      }
      default: {
        const keyPressed = Number(event.key);
        if (keyPressed.toString() !== 'NaN') {

          this.insertNumber(keyPressed);
        }
        break;
      }
    }
  }

  insertNumber(value: number): void {
    if (this.isResult) {
      this.clear();
      this.isResult = false;
    }
    this.response += String(value);
  }

  insertUnit(unit: string): void {
    if (this.response !== ''
      && !this.endsWithAny(this.response, '+', '-', '*', '/', 'h', 'm', 's')
      && this.operation !== '*'
      && this.operation !== '/'){
      this.addunits(unit, !this.operation ? this.firstUnits
                                                          : this.secondUnits);

    }
  }

  insertOperation(operation: string, keyBoard: boolean = false): void {
    if (this.endsWithAny(this.response, 'h', 'm', 's')) {

      if (this.isResult) { this.isResult = false; }
      if (this.operation) { this.calculate(); }
      if (this.response !== '') { this.operation = operation; }
      this.response += operation;
    }
  }

  clear(): void {
    this.operation = undefined;
    this.response = '';
    this.firstUnits = [];
    this.secondUnits = [];
  }

  calculate(): void {

    let offset = 0;
    const sinal: boolean = (this.response[0] === '-') ;
    const operands: string[] = this.response.split(/[-+/*]/);
    const timeCalc: Time[] = [];
    let timeResponse = this.timeZeroBuilder();

    if (sinal) {
      offset++;
    }

    for (let i = 0; i <= 1; i++){
      const numeros: number[] = operands[i + offset]!.split(/[hms]/).map(Number);

      timeCalc.push(this.buildoperands(i === 0 ? this.firstUnits
                                                             : this.secondUnits, numeros));

		}


			switch (this.operation) {
				case '+': {
					const secondsA = this.parseForSeconds(timeCalc[0]!);
					const secondsB = this.parseForSeconds(timeCalc[1]!);
					timeResponse = this.parseForTime(secondsA + secondsB);
					this.operation = undefined;
					break;
				}
				case '-': {
					const secondsA = this.parseForSeconds(timeCalc[0]!);
					const secondsB = this.parseForSeconds(timeCalc[1]!);
					timeResponse = this.parseForTime(secondsA - secondsB);
					this.operation = undefined;
					break;
				} case '*': {
					const x = Number(operands[offset + 1]);

					let seconds = this.parseForSeconds(timeCalc[0]!);
					seconds *= x;

					timeResponse = this.parseForTime(seconds);

					this.operation = undefined;
					break;
				} case '/': {
					const x = Number(operands[offset + 1]);

					let seconds = this.parseForSeconds(timeCalc[0]!);
					seconds /= x;

					timeResponse = this.parseForTime(seconds);
					this.operation = undefined;
					break;
				}

			}


		this.isResult = true;
    this.response = this.buldresponse(timeResponse); 
    this.firstUnits = ['h','m','s'];
    this.secondUnits = [];
  }

  private endsWithAny(str: string, ...operationes: string[]): boolean {
     return operationes.some(op => str.endsWith(op));
  }

  private addunits(unit: string, listaunits: string[] ): void {

    if (unit === 'h' && listaunits.length === 0) {
      listaunits.push(unit);
      this.response += unit;
    } else if (unit === 'm' && !listaunits.includes('s') && !listaunits.includes('m')){
      listaunits.push(unit);
      this.response += unit;
    } else if (unit === 's' && !listaunits.includes('s')) {
      listaunits.push(unit);
      this.response += unit;
    }
  }

  private buildoperands(units: string[], numeros: number[]): Time{
    const time: Time = this.timeZeroBuilder();

    if (units.length === 3) {
      time.h = numeros[0]!;
      time.m = numeros[1]!;
      time.s = numeros[2]!;
    } else {
      if (units.includes('h')) {
        time.h = numeros[units.indexOf('h')]!;
      }
      if (units.includes('s')) {
        time.s = numeros[units.indexOf('s')]!;
      }
      if (units.includes('m')) {
        time.m = numeros[units.indexOf('m')]!;
      }
    }
    return time;
  }

  private buldresponse(timeresponse: Time): string {
    return `${timeresponse.h}h${timeresponse.m}m${timeresponse.s}s`;
  }

  private timeZeroBuilder(): Time{
    return {h: 0, m: 0, s: 0};
  }

  private parseForSeconds(t: Time ): number {
    let seconds = t.s;
    seconds += t.m * 60;
    seconds += t.h * 3600;

    return seconds;
  }

  private parseForTime(n: number): Time {
    const h = Math.floor(n / 3600);
    n %= 3600;
    const m = Math.floor(n / 60);
    const s = n % 60;

    return {h, m, s};
  }
}
