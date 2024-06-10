import React, {useState, useEffect} from "react";

// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";

import { fetchBarChartDataDailyTraffic,fetchBarChartOptionsDailyTraffic } from "variables/api";

//import 'react-daterangepicker/daterangepicker.css';

import {  useRef } from 'react'
import { DateRangePicker } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const[isLoading,setIsLoading] = useState(false);

  const[bar,setBar] = useState([]);
  const[barOption,setBarOption] = useState([]);
  const[data,setData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');



  const pieChartOptions = {
    labels: barOption,
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };
  
  const pieChartData = bar;


  const fetchData = async (period) => {
    try {
      setIsLoading(false);
      const data = await fetchBarChartDataDailyTraffic(period);
      setData(data);
      const jobArray = data.map(item => item.jobs);
      setBar(jobArray);
      const jobArrayOption = data.map(item => item.language);
      setBarOption(jobArrayOption);
      setIsLoading(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log("Pie chart",pieChartData);
  console.log("pie chart s",pieChartOptions);

  useEffect(() => {
    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

    // date state
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

   <>

   {/* <link rel="stylesheet" type="text/css" 
   href="https://praraavantileathers.in/assets/AdminLTE-3.0.2/plugins/daterangepicker/daterangepicker.css"/> */}
    
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
        Industry Graphics
        </Text>
        {/* <input id="e1" name="e1"/> */}
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
            className="inputBox"
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

      </Flex>
      
      {isLoading && 
        <PieChart
        h='100%'
        w='100%'
        chartData={pieChartData}
        chartOptions={pieChartOptions}
        />
      }


    <Card
      bg={cardColor}
      flexDirection='row'
      boxShadow={cardShadow}
      w='100%'
      p='15px'
      px='20px'
      mt='15px'
      mx='auto'>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Flex direction='column' py='5px' me='10px'>
            <Flex align='center'>
              <Box
                h='8px'
                w='8px'
                bg={item.color || 'brand.500'} // Use item color if available, otherwise default
                borderRadius='50%'
                me='4px'
              />
              <Text
                fontSize='xs'
                color='secondaryGray.600'
                fontWeight='700'
                mb='5px'>
                {item.language}
              </Text>
            </Flex>
            <Text fontSize='lg' color={textColor} fontWeight='700'>
              {`${item.jobs}%`}
            </Text>
          </Flex>
          {index < data.length - 1 && (
            <VSeparator mx={{ base: "1px", xl: "1px", "1xl": "2px" }} />
          )}
        </React.Fragment>
      ))}
    </Card>

    </Card>  
   
   </> 

  );
}



