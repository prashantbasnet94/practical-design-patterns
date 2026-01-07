# Level 1, Project 1: The Report Generator

## The Scenario

You are working on a data processing application. There's a `ReportGenerator` class in `src/report-generator.ts` that takes some data and generates a report. The application is run from `src/main.ts`.

The business now wants to add the ability to generate reports in XML and JSON format.

## The Problem

Take a look at the `ReportGenerator` class in `src/report-generator.ts`. The `generateReport` method has a conditional block to handle the different report types. If we want to add XML and JSON, we'd have to add more `if/else` conditions, which makes the class harder to maintain. This is a violation of the Open/Closed Principle.

## Your Goal

Your task is to refactor the `ReportGenerator` class. You should apply a suitable design pattern to make it easy to add new report formats in the future without modifying the `ReportGenerator` class itself.

**Key Requirements:**
1.  Remove the conditional logic from the `ReportGenerator`.
2.  Your solution should be easily extensible for new report formats (like XML, JSON, etc.).
3.  The way the application is run in `src/main.ts` should ideally not change, or change minimally.

Good luck!
