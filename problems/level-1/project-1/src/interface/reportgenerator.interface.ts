export type ReportType = 'PDF' | 'CSV' | 'XML'  | 'JSON'

export interface IReportGenerator{
    generateReport(data: any[]): string 
}

