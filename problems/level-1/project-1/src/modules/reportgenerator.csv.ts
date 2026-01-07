import { IReportGenerator, ReportType } from '../interface/reportgenerator.interface';

export class CsvReportGenerator implements IReportGenerator {
    constructor() {

    }
    generateReport( data: any[]): string {
        console.log("generating CSV report")
        console.log('Generating CSV report...');
        // In a real app, this would use a CSV library
        let reportContent = `CSV Report:\n${JSON.stringify(data, null, 2)}`;
        console.log('CSV report generated.');
        return reportContent
    }

}