import { ReportGenerator } from './report-generator';
import { sampleData } from './data';

const reportGenerator = new ReportGenerator();

console.log('--- Generating PDF Report ---');
const pdfReport = reportGenerator.generateReport('PDF', sampleData);
console.log(pdfReport);

console.log('\n--- Generating CSV Report ---');
const csvReport = reportGenerator.generateReport('CSV', sampleData);
console.log(csvReport);

