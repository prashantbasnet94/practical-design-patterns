import { IReportGenerator, ReportType } from './interface/reportgenerator.interface';
import { CsvReportGenerator } from './modules/reportgenerator.csv';
import { JsonReportGenerator } from './modules/reportgenerator.json';
import { PdfReportGenerator } from './modules/reportgenerator.pdf';
import { XmlReportGenerator } from './modules/reportgenerator.xml';


export class ReportGenerator {
    /**
     * Generates a report in the specified format.
     * 
     * SMELL: This method violates the Open/Closed Principle. Adding a new
     * report type (e.g., XML) requires modifying this class.
     */

    private pdfGenerator: PdfReportGenerator
    private xmlGenerator: XmlReportGenerator
    private jsonGenerator: JsonReportGenerator
    private csvGenerator: CsvReportGenerator

    constructor(generator: IReportGenerator){
        this.pdfGenerator = new PdfReportGenerator()
        this.xmlGenerator = new XmlReportGenerator()
        this.jsonGenerator = new JsonReportGenerator()
        this.csvGenerator = new CsvReportGenerator()
    }

    generateReport(type: ReportType, data: any[]): string {
        let reportContent = '';

        switch(type){
            case 'CSV':
                return this.csvGenerator.generateReport(['data'])
            case 'PDF':
                return this.pdfGenerator.generateReport( ['data'])
            case 'XML':
                return this.xmlGenerator.generateReport(['data'])
            case 'JSON':
                return this.jsonGenerator.generateReport(['data'])
            default:
                throw new Error("Report type is needed")

        }
       
    }
}
