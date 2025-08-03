import 'package:flutter/material.dart';
import '../utils/testing_plan.dart';

class TestResultsManager {
  // Singleton pattern
  static final TestResultsManager _instance = TestResultsManager._internal();
  factory TestResultsManager() => _instance;
  TestResultsManager._internal();
  
  // Test results
  final List<TestResult> _results = [];
  
  // Add test result
  void addTestResult(TestCase testCase, bool isPassed, String? notes) {
    _results.add(
      TestResult(
        testCase: testCase,
        isPassed: isPassed,
        notes: notes,
        timestamp: DateTime.now(),
      ),
    );
  }
  
  // Get all test results
  List<TestResult> getAllResults() {
    return _results;
  }
  
  // Get passed tests
  List<TestResult> getPassedTests() {
    return _results.where((result) => result.isPassed).toList();
  }
  
  // Get failed tests
  List<TestResult> getFailedTests() {
    return _results.where((result) => !result.isPassed).toList();
  }
  
  // Get test summary
  TestSummary getTestSummary() {
    final total = _results.length;
    final passed = getPassedTests().length;
    final failed = getFailedTests().length;
    
    return TestSummary(
      totalTests: total,
      passedTests: passed,
      failedTests: failed,
      passRate: total > 0 ? (passed / total) * 100 : 0,
    );
  }
  
  // Generate test report
  String generateTestReport() {
    final summary = getTestSummary();
    final failedTests = getFailedTests();
    
    String report = "# Logis MVP Test Report\n\n";
    
    // Summary
    report += "## Test Summary\n\n";
    report += "- Total Tests: ${summary.totalTests}\n";
    report += "- Passed Tests: ${summary.passedTests}\n";
    report += "- Failed Tests: ${summary.failedTests}\n";
    report += "- Pass Rate: ${summary.passRate.toStringAsFixed(2)}%\n\n";
    
    // Failed tests
    if (failedTests.isNotEmpty) {
      report += "## Failed Tests\n\n";
      
      for (var result in failedTests) {
        report += "### ${result.testCase.name}\n\n";
        report += "**Description:** ${result.testCase.description}\n\n";
        report += "**Steps:**\n";
        
        for (var step in result.testCase.steps) {
          report += "- $step\n";
        }
        
        report += "\n**Expected Result:** ${result.testCase.expectedResult}\n\n";
        report += "**Notes:** ${result.notes ?? 'No notes provided'}\n\n";
      }
    }
    
    // Test categories
    report += "## Test Categories\n\n";
    
    report += "### Authentication Tests\n\n";
    _addCategoryResults(report, TestingPlan.authenticationTests);
    
    report += "### Provider Listing Tests\n\n";
    _addCategoryResults(report, TestingPlan.providerListingTests);
    
    report += "### Booking System Tests\n\n";
    _addCategoryResults(report, TestingPlan.bookingSystemTests);
    
    report += "### Profile and Settings Tests\n\n";
    _addCategoryResults(report, TestingPlan.profileSettingsTests);
    
    report += "### Error Handling Tests\n\n";
    _addCategoryResults(report, TestingPlan.errorHandlingTests);
    
    return report;
  }
  
  // Helper method to add category results to report
  String _addCategoryResults(String report, List<TestCase> categoryTests) {
    for (var testCase in categoryTests) {
      final result = _results.firstWhere(
        (r) => r.testCase.name == testCase.name,
        orElse: () => TestResult(
          testCase: testCase,
          isPassed: false,
          notes: 'Test not executed',
          timestamp: DateTime.now(),
        ),
      );
      
      final status = result.isPassed ? '✅ PASS' : '❌ FAIL';
      report += "- $status: ${testCase.name}\n";
    }
    
    report += "\n";
    return report;
  }
}

// Test result model
class TestResult {
  final TestCase testCase;
  final bool isPassed;
  final String? notes;
  final DateTime timestamp;
  
  TestResult({
    required this.testCase,
    required this.isPassed,
    this.notes,
    required this.timestamp,
  });
}

// Test summary model
class TestSummary {
  final int totalTests;
  final int passedTests;
  final int failedTests;
  final double passRate;
  
  TestSummary({
    required this.totalTests,
    required this.passedTests,
    required this.failedTests,
    required this.passRate,
  });
}
