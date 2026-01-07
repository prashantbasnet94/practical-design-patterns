import { ReportGenerator } from './report-generator.answer';
import { sampleData } from './data';

const reportGenerator = new ReportGenerator();

console.log('--- Generating PDF Report ---');
const pdfReport = reportGenerator.generateReport('PDF', sampleData);
console.log(pdfReport);

console.log('\n--- Generating CSV Report ---');
const csvReport = reportGenerator.generateReport('CSV', sampleData);
console.log(csvReport);



console.log('\n--- Generating JSON Report ---');
const json = reportGenerator.generateReport('JSON', sampleData);
console.log(json);

console.log('\n--- Generating xml Report ---');
const xml = reportGenerator.generateReport('XML', sampleData);
console.log(xml);
