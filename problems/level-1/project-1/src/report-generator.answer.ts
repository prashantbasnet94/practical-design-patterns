import { IReportGenerator, ReportType } from './interface/reportgenerator.interface';
import { CsvReportGenerator } from './modules/reportgenerator.csv';
import { JsonReportGenerator } from './modules/reportgenerator.json';
import { PdfReportGenerator } from './modules/reportgenerator.pdf';
import { XmlReportGenerator } from './modules/reportgenerator.xml';
import { ReportFactory } from './report.factory';


export class ReportGenerator {
    /**
     * Generates a report in the specified format.
     * 
     * SMELL: This method violates the Open/Closed Principle. Adding a new
     * report type (e.g., XML) requires modifying this class.
     */

    private generator: IReportGenerator
    constructor(){
        this.generator = new PdfReportGenerator()
    }

    generateReport(type: ReportType, data: any[]): string {
        return ReportFactory.getInstance().init(type).generateReport(data)
    }
    setGenerator(strategy: IReportGenerator){
        this.generator = strategy
    }
}
