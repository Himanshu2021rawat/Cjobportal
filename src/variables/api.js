import axios from 'axios';

// Function to fetch bar chart data for daily traffic
export const fetchBarChartDataDailyTraffic = async (period) => {
  try {
    const response = await axios.get('data.json');
    return response.data[period];
  } catch (error) {
    console.error('Error fetching bar chart data for daily traffic:', error);
    throw error;
  }
};

// Function to fetch bar chart options for daily traffic
// export const fetchBarChartOptionsDailyTraffic = async () => {
//   try {
//     const response = await axios.get('data.json');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching bar chart options for daily traffic:', error);
//     throw error;
//   }
// };



export const fetchWeeklyJobs = async (period) => {
  try {
    const response = await axios.get('Weekly.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching bar chart data for daily traffic:', error);
    throw error;
  }
};