import { ReportGenerator } from './report-generator.answer';
import { sampleData } from './data';
import { CsvReportGenerator } from './modules/reportgenerator.csv';
import { JsonReportGenerator } from './modules/reportgenerator.json';
import { XmlReportGenerator } from './modules/reportgenerator.xml';

const reportGenerator = new ReportGenerator();

console.log('--- Generating PDF Report ---');
const pdfReport = reportGenerator.generateReport('PDF', sampleData);
console.log(pdfReport);

console.log('\n--- Generating CSV Report ---');
// reportGenerator.setGenerator(new CsvReportGenerator())
const csvReport = reportGenerator.generateReport('CSV', sampleData);
console.log(csvReport);



console.log('\n--- Generating JSON Report ---');
// reportGenerator.setGenerator(new JsonReportGenerator())
const json = reportGenerator.generateReport('JSON', sampleData);
console.log(json);

console.log('\n--- Generating xml Report ---');
// reportGenerator.setGenerator(new XmlReportGenerator())
const xml = reportGenerator.generateReport('XML', sampleData);
console.log(xml);
