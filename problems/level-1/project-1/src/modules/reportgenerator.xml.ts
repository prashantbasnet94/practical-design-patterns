import { IReportGenerator, ReportType } from '../interface/reportgenerator.interface';

export class XmlReportGenerator implements IReportGenerator{
    constructor(){

    }
    generateReport(data: any[]): string {
       console.log("generating xml report")
       return "Report.xml"
    }
    
}