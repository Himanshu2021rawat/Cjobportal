import React, {useState, useEffect} from "react";

// Chakra imports
import { Box, Flex, Icon, Text,Select, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from "variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";

import { fetchBarChartDataDailyTraffic,fetchBarChartOptionsDailyTraffic } from "variables/api";

import {  useRef } from 'react'
import { DateRangePicker } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
export default function DailyTraffic(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

   // const [barChartDataDailyTraffic, setBarChartDataDailyTraffic] = useState([]);
   //const [barChartOptionsDailyTraffic, setBarChartOptionsDailyTraffic] = useState({});
   const[isLoading,setIsLoading] = useState(false);

   const[bar,setBar] = useState([]);
   const[barOption,setBarOption] = useState([]);
   const [selectedPeriod, setSelectedPeriod] = useState('monthly');

   const barChartDataDailyTraffic = [
    {
      name: "Daily Traffic",
      data: bar,
    },
  ];

  const barChartOptionsDailyTraffic = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: barOption,
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  };

    const fetchData = async (period) => {
      try {
        setIsLoading(false);
        const data = await fetchBarChartDataDailyTraffic(period);
        //const options = await fetchBarChartOptionsDailyTraffic();
       // console.log("opydfvdsfgd: ",options);
       // setBarChartDataDailyTraffic(data);
       const jobArray = data.map(item=>item.jobs)
       setBar(jobArray);

       const jobArrayOption = data.map(item=>item.language)
       setBarOption(jobArrayOption);
       
        setIsLoading(true);
       // setBarChartOptionsDailyTraffic(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData(selectedPeriod);
    }, [selectedPeriod]);
  
    const handlePeriodChange = (event) => {
      setSelectedPeriod(event.target.value);
    };



  // console.log("data:",barChartDataDailyTraffic);
  // console.log("edfdsfdf :",barChartOptionsDailyTraffic);
  // console.log("sdcfds",bar);
  console.log("bar option: ",barOption);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Company Register
            </Text>
          </Flex>
          <Flex align='end'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              279
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Register
            </Text>
          </Flex>
        </Flex>
        <Flex align='center'>

        {/* <Select
          fontSize='sm'
          variant='subtle'
          value={selectedPeriod}
          onChange={handlePeriodChange}
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </Select> */}


        <div className="calendarWrap">

      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox1"
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open && 
          <DateRangePicker
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="vertical"
            className="calendarElement"
          />
        }
      </div>

        </div>

          {/* <Icon as={RiArrowUpSFill} color='green.500' /> */}
          {/* <Text color='green.500' fontSize='sm' fontWeight='700'>
            +2.45%
          </Text> */}
        </Flex>
      </Flex>
      <Box h='240px' mt='auto'>
       {isLoading && 

        <BarChart
        //chartData={barChartDataDailyTraffic}
        chartData = {barChartDataDailyTraffic}
        chartOptions={barChartOptionsDailyTraffic}
        />
       
       } 

      </Box>
    </Card>
  );
}

// import { Bar } from "react-chartjs-2";
// import Card from "components/card/Card.js";

// function App() {
// 	return (
//     <Card align='center' direction='column' w='100%' {...rest}> 
//       <div className="App">
//         <h1>GEEKSFORGEEKS BAR CHART REACTJS</h1>
//         <div style={{ maxWidth: "650px" }}>
//           <Bar
//             data={{
//               // Name of the variables on x-axies for each bar
//               labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
//               datasets: [
//                 {
//                   // Label for bars
//                   label: "total count/value",
//                   // Data or value of your each variable
//                   data: [1552, 1319, 613, 1400],
//                   // Color of each bar
//                   backgroundColor: 
//                     ["aqua", "green", "red", "yellow"],
//                   // Border color of each bar
//                   borderColor: ["aqua", "green", "red", "yellow"],
//                   borderWidth: 0.5,
//                 },
//               ],
//             }}
//             // Height of graph
//             height={400}
//             options={{
//               maintainAspectRatio: false,
//               scales: {
//                 yAxes: [
//                   {
//                     ticks: {
//                   // The y-axis value will start from zero
//                       beginAtZero: true,
//                     },
//                   },
//                 ],
//               },
//               legend: {
//                 labels: {
//                   fontSize: 15,
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </Card>  
// 	);
// }

// export default App;

