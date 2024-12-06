/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
// import styles from './ReportPage.module.scss';
import type { IReportPageProps } from './IReportPageProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { IReportPageStates } from "./IReportPageStates"
import "../../navbar/components/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web } from "@pnp/sp/presets/all";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { IStackProps, Stack } from '@fluentui/react/lib/Stack';
const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };

const tokens = {
  sectionStack: {
    childrenGap: 10,
  },
  spinnerStack: {
    childrenGap: 20,
  },
};

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx"
// excel headings
const Headings = [[
  "Id", "Title", "Status", "Start Date", "End Date", "Budget", "Expenses", "Team"
]]

// export to excel function
const saveExcel = (ListData: any) => {
  console.log("Saving Excel");
  if (ListData.length > 0) {
    const _ListData: any = []
    ListData.forEach((element: any) => {
      _ListData.push({
        Id: element.Id,
        Title: element.Title,
        status: element.status,
        StartDate: element.StartDate,
        EndDate: element.EndDate,
        Budget: element.Budget,
        Expenses: element.Expenses,
        Team: element.Team
      })
    })

    // create new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws : any = XLSX.utils.json_to_sheet([])

    XLSX.utils.sheet_add_aoa(ws, Headings, { origin: "A1" });
    XLSX.utils.sheet_add_json(ws, _ListData, {
      origin: "A2",
      skipHeader: true
    });

    const range = XLSX.utils.decode_range(ws['!ref']);
    range.e.r = Math.max(range.e.r, _ListData.length + 1);
    ws[`!ref`] = XLSX.utils.encode_range(range);
    XLSX.utils.book_append_sheet(wb, ws, "data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, "Report" + fileExtension);
  } else {
    alert("No Data to download.")
  }

}


export default class ReportPage extends React.Component<IReportPageProps, IReportPageStates> {
  constructor(props: IReportPageProps, states: IReportPageStates) {
    super(props);
    this.state = {
      allData: [],
      filteredData: [],
      teamFilterOptions: [],
      selectedTeam: "",
      selectedStatus: "",
      filterProjectOptions: [],
      filterBudget: [],
      filterExpenses: [],
      showLoader: true,
    }
  }

  async componentDidMount(): Promise<void> {
    await this.getData()
    await this.setState({
      filteredData: this.state.allData
    })
    this.generateChart()
  }
// funtion to filter data from allData
  public filterData = async () => {
    console.log("filetr start");

    let allData = this.state.allData
    if (allData.length > 0) {
      if (this.state.selectedTeam !== "") {
        allData = allData.filter(
          (e: any) => e.Team === this.state.selectedTeam
        );
      }
      if (this.state.selectedStatus !== "") {
        allData = allData.filter(
          (e: any) => e.status === this.state.selectedStatus
        )
      }
      this.setState({ filteredData: allData })
    } else {
      // this.setState({filteredData :allData})
    }
    await setTimeout(() => {
      this.setState({ filteredData: this.state.filteredData })
    }, 200);
    this.generateChart()
  }
// to render filter options
  private renderOptions = (OptionState: any) => {
    return OptionState.map((option: any) => (
      <option value={option.value} key={option.key}>{option.value}</option>
    ))
  }
// function to generate chart data
  private generateChart = () => {
    this.setState({ showLoader: true })
    let data = this.state.filteredData
    let projectNames: any = []
    for (let index = 0; index < data.length; index++) {
      projectNames.push(data[index].Title)
    }
    let budgetsData: any = []
    for (let index = 0; index < data.length; index++) {
      budgetsData.push(data[index].Budget)
    }
    let ExpensesData: any = []
    for (let index = 0; index < data.length; index++) {
      ExpensesData.push(data[index].Expenses)
    }
    this.setState({
      filterExpenses: ExpensesData,
      filterProjectOptions: projectNames,
      filterBudget: budgetsData
    })

    this.setState({ filterProjectOptions: this.state.filterProjectOptions })
    this.setState({ filterBudget: this.state.filterBudget })
    this.setState({ filterExpenses: this.state.filterExpenses })
    setTimeout(() => {
      this.setState({ showLoader: false })
    }, 2000);

  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // to get data from SP List
  private getData = async () => {
    const siteURL = this.props.siteUrl;
    const web = Web(siteURL);

    try {
      const allDataApi = await web.lists.getByTitle('reportData').items.getAll();
      console.log(allDataApi);
      this.setState({
        allData: allDataApi
      })

      let teamOptions = [];
      for (let index = 0; index < allDataApi.length; index++) {
        teamOptions.push({ value: allDataApi[index].Team, key: index });
      }

      // Provide an empty array as the initial value for reduce
      const UniqueTeamsOptions = teamOptions.reduce(
        (acc: any, obj: any) => {
          if (!acc.some((o: any) => o.value === obj.value)) {
            acc.push(obj);
          }
          return acc;
        },
        [] // Initial value for the accumulator
      );

      this.setState({
        teamFilterOptions: UniqueTeamsOptions,
      });


    } catch (error) {
      console.error('Error fetching news items:', error);
    }
  }
  public render(): React.ReactElement<IReportPageProps> {
    let tableData = this.state.filteredData

    // set the data
    const data = {
      labels: this.state.filterProjectOptions,

      datasets: [
        {
          label: 'My First Dataset',
          data: this.state.filterBudget

        }
      ]
    };

    // set the options
    const options = {
      legend: {
        display: true,
        position: "left"
      },
      title: {
        display: true,
        text: "Expenses as Teams"
      }
    };
//  data for line chart
    const dataLine = {
      labels: this.state.filterProjectOptions,
      datasets: [
        {
          label: "Expense",
          data: this.state.filterExpenses,
          borderColor: "#42A5F5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          fill: false
          
        },
        {
          label: "Budget",
          data: this.state.filterBudget,
          borderColor: "#66BB6A",
          backgroundColor: "rgba(102, 187, 106, 0.2)",
          fill: false
          
        }
      ]
    }
    // set the line chart options

    const optionsLine = {
      responsive : true,
      plugins:{
        legend:{
          position: "top" as "top",
        },
        title:{
          display : true,
          text :"Budget and Expenses as Projects"
        }
      }
    }

    return (
      <section>
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap" }} >
          <div >
            <select className='form-select m-2' style={{ width: "250px", fontSize: "14px" }} value={this.state.selectedTeam} onChange={(e: any) => { this.setState({ selectedTeam: e.target.value.toString() }) }}>
              <option selected disabled value=""> Select Team</option>
              {this.renderOptions(this.state.teamFilterOptions)}
            </select>
          </div>
          <div >
            <select className='form-select m-2' style={{ width: "250px", fontSize: "14px" }} value={this.state.selectedStatus} onChange={(e: any) => { this.setState({ selectedStatus: e.target.value.toString() }) }}>
              <option selected disabled value=""> Select Status</option>
              <option value="In Progress"> In Progress</option>
              <option value="On Hold"> On Hold</option>
              <option value="Completed"> Completed</option>
            </select>
          </div>
          <div>
            <button className='btn fw-normal text-white m-2' onClick={async () => { await this.filterData() }} style={{ color: "#F1F6FD", backgroundColor: "#0070AD", fontSize: "14px", fontWeight: "bold", borderRadius: "3px", marginLeft: "10px" }}>
              Apply Filters
            </button>
          </div>
          <div>
            <button className='btn fw-normal text-white m-2' onClick={async () => { await this.setState({ filteredData: this.state.allData, selectedStatus: "", selectedTeam: "" }); this.generateChart(); }} style={{ color: "#F1F6FD", backgroundColor: "#0070AD", fontSize: "14px", fontWeight: "bold", borderRadius: "3px", marginLeft: "10px" }}>
              Reset Filters
            </button>
          </div>
          <div>
            <button className='btn fw-normal text-white m-2' onClick={() => { saveExcel(this.state.filteredData) }} style={{ color: "#F1F6FD", backgroundColor: "#0070AD", fontSize: "14px", fontWeight: "bold", borderRadius: "3px", marginLeft: "10px" }}>
              Download Excel
            </button>
          </div>
        </div>
        {/* Datatable for showing data */}
        <div className='m-5'>
          <DataTable value={tableData} scrollable scrollHeight='400px' size='small' showGridlines tableStyle={{ minWidth: '50rem' }}>
            <Column style={{ minWidth: "100px", fontSize: "12px" }} sortable field="Id" header="Id" />
            <Column style={{ minWidth: "100px", fontSize: "12px" }} frozen sortable field="Title" header="Title" />
            <Column style={{ minWidth: "100px", fontSize: "12px" }} sortable field="status" header="Status" />
            <Column style={{ minWidth: "100px", fontSize: "12px" }} sortable field="StartDate" header="Start Date" />
            <Column style={{ minWidth: "100px", fontSize: "12px" }} sortable field='EndDate' header="End Date" />
            <Column style={{ minWidth: "100px", fontSize: "12px" }} sortable field='Budget' header="Budget" />
            <Column style={{ minWidth: "100px", fontSize: "12px" }} sortable field='Expenses' header="Expenses" />
            <Column style={{ minWidth: "100px", fontSize: "12px" }} sortable field='Team' header="Team" />
          </DataTable>

        </div>
        {/* Chart section */}
        {
          this.state.showLoader ? (
            <div style={{ display: "flex", justifyContent: "center", flexDirection:"row", flexWrap:"wrap" }}>
              <Stack {...rowProps} tokens={tokens.spinnerStack}>
                <Spinner size={SpinnerSize.large} />
              </Stack>
            </div>
          ) : (
            <div className='m-5' style={{ display: "flex", justifyContent: "center" }}>
              <div className='col-md-6' >
                <ChartControl
                  type={ChartType.Pie}
                  data={data}
                  options={options}
                />
              </div>
              <div className='col-md-6' >
                <ChartControl
                  type={ChartType.Line}
                  data={dataLine}
                  options={optionsLine}
                />
              </div>
            </div>
          )
        }
      </section>
    );
  }
}
