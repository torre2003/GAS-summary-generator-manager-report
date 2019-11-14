function test() {

    manager_summary = new SummaryReportManger()
    manager_summary.initialize()
    Logger.log(manager_summary.listFiles())
    Logger.log(manager_summary.getValuesFromFiles())
}