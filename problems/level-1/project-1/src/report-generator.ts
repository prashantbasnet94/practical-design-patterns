import { ReportType } from './interface/reportgenerator.interface';

export class ReportGenerator {
    /**
     * Generates a report in the specified format.
     * 
     * SMELL: This method violates the Open/Closed Principle. Adding a new
     * report type (e.g., XML) requires modifying this class.
     */
    generateReport(type: ReportType, data: any[]): string {
        let reportContent = '';

        if (type === 'PDF') {
            console.log('Generating PDF report...');
            // In a real app, this would use a PDF library
            reportContent = `PDF Report:\n${JSON.stringify(data, null, 2)}`;
            console.log('PDF report generated.');

        } else if (type === 'CSV') {
            console.log('Generating CSV report...');
            // In a real app, this would use a CSV library
            const headers = Object.keys(data[0]).join(',');
            const rows = data.map(row => Object.values(row).join(','));
            reportContent = `${headers}\n${rows.join('\n')}`;
            console.log('CSV report generated.');
        }

        return reportContent;
    }
}
