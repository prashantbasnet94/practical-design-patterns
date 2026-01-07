import { IReportGenerator, ReportType } from '../interface/reportgenerator.interface';

export class JsonReportGenerator implements IReportGenerator{
    constructor(){

    }
    generateReport( data: any[]): string {
       console.log("generating json report")
       return "Report.Json"
    }
    
}