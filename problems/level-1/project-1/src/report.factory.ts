import { ReportType } from './interface/reportgenerator.interface'
import { CsvReportGenerator } from './modules/reportgenerator.csv'
import { JsonReportGenerator } from './modules/reportgenerator.json'
import { PdfReportGenerator } from './modules/reportgenerator.pdf'
import { XmlReportGenerator } from './modules/reportgenerator.xml'

export class ReportFactory{
    public static instance: ReportFactory
    private map = new Map()
    static getInstance(){
        if(!ReportFactory.instance){
            ReportFactory.instance = new ReportFactory()
        }
        return ReportFactory.instance
    }
    init(type: ReportType){
        switch(type){
            case 'CSV':
                this.map.set('CSV', new CsvReportGenerator())
                return this.map.get('CSV')
            case 'JSON':
                this.map.set('JSON', new JsonReportGenerator())
                return this.map.get('CSV')
            case 'PDF':
                this.map.set("PDF", new PdfReportGenerator())
                return this.map.get("PDF")
            case 'XML':
                this.map.set("XML", new XmlReportGenerator())
                return this.map.get("XML")
            default:
                return this.map.get("PDF")
        }
    }

}