export declare class CalculadoraComponent {
    private response;
    private isResult;
    private operation;
    private firstUnits;
    private secondUnits;
    constructor();
    onKey(event: KeyboardEvent): void;
    insertNumber(value: number): void;
    insertUnit(unit: string): void;
    insertOperation(operation: string, keyBoard?: boolean): void;
    clear(): void;
    calculate(): void;
    private endsWithAny;
    private addunits;
    private buildoperands;
    private buldresponse;
    private timeZeroBuilder;
    private parseForSeconds;
    private parseForTime;
}
//# sourceMappingURL=time_calculator.d.ts.map