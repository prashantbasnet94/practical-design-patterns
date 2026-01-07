import { IReportGenerator, ReportType } from '../interface/reportgenerator.interface';

export class PdfReportGenerator implements IReportGenerator {
    constructor() {

    }
    generateReport(data: any[]): string {
        console.log("generating pdf report")
        console.log('Generating PDF report...');
        // In a real app, this would use a PDF library
        let reportContent = `PDF Report:\n${JSON.stringify(data, null, 2)}`;
        console.log('PDF report generated.');
        return reportContent
    }

}