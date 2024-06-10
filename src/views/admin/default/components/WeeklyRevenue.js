import React, {useState, useEffect} from "react";

import {Select } from "@chakra-ui/react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";

import { fetchWeeklyJobs } from "variables/api";



export default function WeeklyRevenue(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const[isLoading,setIsLoading] = useState(false);

  const[bar,setBar] = useState([]);
  const[barOption,setBarOption] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  
// const barChartDataConsumption = [
//   {
//     name: "HTML",
//     data: bar,
//   },
//   {
//     name: "CSS",
//     data: bar,
//   },
//   {
//     name: "JAVASCRIPT",
//     data: bar,
//   },
//   {
//     name: "MVC",
//     data: bar,
//   },
// ];

const barChartOptionsConsumption = {
  chart: {
    stacked: true,
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
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  },
  legend: {
    show: false,
  },
  colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(false);
  //       const data = await fetchWeeklyJobs(selectedPeriod);
  //       //const options = await fetchBarChartOptionsDailyTraffic();
  //      // console.log("opydfvdsfgd: ",options);
  //      // setBarChartDataDailyTraffic(data);
  //      //const dataArrays = data.map(item => item.data);
  //      setBar(data);

  //     //  const jobArrayOption = data.map(item=>item.language)
  //     //  setBarOption(jobArrayOption);
       
  //       setIsLoading(true);
  //      // setBarChartOptionsDailyTraffic(data);

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [selectedPeriod]);

  const fetchData = async (period) => {
    try {
      setIsLoading(false);
      const data = await fetchWeeklyJobs(period);
      // Check if data is an object with a key corresponding to the selected period
      if (data && data[selectedPeriod]) {
        const dataArray = data[selectedPeriod];
        setBar(dataArray);

        // Extract days from the first item in the data array since days are the same for all items
        const days = dataArray.length > 0 ? dataArray[0].days : [];
        setBarOption(days);

        setIsLoading(true);
      } else {
        console.error('Invalid data format:', data);
      }
      // const jobArrayOption = data.map(item => item.days);
      // setBarOption(jobArrayOption);
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

  const barChartDataConsumption = bar.map(item => ({
    name: item.name,
    data: item.data
  }));

  // const barChartDataConsumption = bar.map(item => ({
  //   name: item.name,
  //   data: item.data
  // }));

  console.log("Revenue job",barOption);

  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Weekly Jobs
        </Text>
        {/* <Button
          align='center'
          justifyContent='center'
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...rest}>
          <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
        </Button> */}

        <Select
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
        </Select>

      </Flex>

      <Box h='240px' mt='auto'>
       {isLoading && 
        <BarChart
          chartData={barChartDataConsumption}
          chartOptions={barChartOptionsConsumption}
        />
       }  

      </Box>
    </Card>
  );
}
