// import {
//   Flex,
//   Table,
//   Checkbox,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import React, { useMemo } from "react";
// import {
//   useGlobalFilter,
//   usePagination,
//   useSortBy,
//   useTable,
// } from "react-table";

// // Custom components
// import Card from "components/card/Card";
// import Menu from "components/menu/MainMenu";
// export default function CheckTable(props) {
//   const { columnsData, tableData } = props;

//   const columns = useMemo(() => columnsData, [columnsData]);
//   const data = useMemo(() => tableData, [tableData]);

//   const tableInstance = useTable(
//     {
//       columns,
//       data,
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     initialState,
//   } = tableInstance;
//   initialState.pageSize = 11;

//   const textColor = useColorModeValue("secondaryGray.900", "white");
//   const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
//   return (
//     <Card
//       direction='column'
//       w='100%'
//       px='0px'
//       overflowX={{ sm: "scroll", lg: "hidden" }}>
//       <Flex px='25px' justify='space-between' align='center'>
//         <Text
//           color={textColor}
//           fontSize='22px'
//           fontWeight='700'
//           lineHeight='100%'>
//           Category Job
//         </Text>
//         <Menu />
//       </Flex>
//       <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
//         <Thead>
//           {headerGroups.map((headerGroup, index) => (
//             <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, index) => (
//                 <Th
//                   {...column.getHeaderProps(column.getSortByToggleProps())}
//                   pe='10px'
//                   key={index}
//                   borderColor={borderColor}>
//                   <Flex
//                     justify='space-between'
//                     align='center'
//                     fontSize={{ sm: "10px", lg: "12px" }}
//                     color='gray.400'>
//                     {column.render("Header")}
//                   </Flex>
//                 </Th>
//               ))}
//             </Tr>
//           ))}
//         </Thead>
//         <Tbody {...getTableBodyProps()}>
//           {page.map((row, index) => {
//             prepareRow(row);
//             return (
//               <Tr {...row.getRowProps()} key={index}>
//                 {row.cells.map((cell, index) => {
//                   let data = "";
//                   if (cell.column.Header === "Job") {
//                     data = (
//                       <Flex align='center'>
//                         <Checkbox
//                           defaultChecked={cell.value[1]}
//                           colorScheme='brandScheme'
//                           me='10px'
//                         />
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value[0]}
//                         </Text>
//                       </Flex>
//                     );
//                   } else if (cell.column.Header === "Number Of Jobs") {
//                     data = (
//                       <Flex align='center'>
//                         <Text
//                           me='10px'
//                           color={textColor}
//                           fontSize='sm'
//                           fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       </Flex>
//                     );
//                   } else if (cell.column.Header === "Applied") {
//                     data = (
//                       <Text color={textColor} fontSize='sm' fontWeight='700'>
//                         {cell.value}
//                       </Text>
//                     );
//                   } else if (cell.column.Header === "Viewed") {
//                     data = (
//                       <Text color={textColor} fontSize='sm' fontWeight='700'>
//                         {cell.value}
//                       </Text>
//                     );
//                   }
//                   return (
//                     <Td
//                       {...cell.getCellProps()}
//                       key={index}
//                       fontSize={{ sm: "14px" }}
//                       minW={{ sm: "150px", md: "200px", lg: "auto" }}
//                       borderColor='transparent'>
//                       {data}
//                     </Td>
//                   );
//                 })}
//               </Tr>
//             );
//           })}
//         </Tbody>
//       </Table>
//     </Card>
//   );
// }



import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

export default function CheckTable() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  // Define columns data
  const columnsData = useMemo(
    () => [
      {
        Header: "Job",
        accessor: "category",
      },
      {
        Header: "Number Of Jobs",
        accessor: "counts",
      },
    ],
    []
  );

  // Fetch data from the API
   // Fetch data from the API with POST request
   useEffect(() => {
    const postData = async () => {
      const data = {
        Name: "c2VsZWN0IGNvdW50KCopIENvdW50cyxtai5OYW1lIENhdGVnb3J5IGZyb20gRW1wbG95ZXJKT0JQb3N0IGVqCmxlZnQgb3V0ZXIgam9pbiBNYXN0ZXJKb2JDYXRlZ29yeSBtaiBvbiBtai5JZD1lai5Kb2JDYXRlZ29yeQpncm91cCBieSBtai5OYW1l"
      };

      try {
        const response = await axios.post('https://jobpartal-backend.onrender.com/api/Category/Job', data);
        
        const responseData = response.data.Response.map(item => ({
          category: item.Category,
          counts: item.Counts,
        }));
        setTableData(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, []);

  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns: columnsData,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // const handleRowClick = (category) => {
  //   navigate(`/admin/Jobs/${category}`);
  // };
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Category Job
        </Text>
        {/* <Menu /> */}
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index} 
                 //onClick={() => handleRowClick(row.values.category)} 
                // cursor="pointer"
                 >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Job") {
                    data = (
                      <Flex align='center'>
                        {/* <Checkbox
                          defaultChecked={false}
                          colorScheme='brandScheme'
                          me='10px'
                        /> */}
                        <Link to={`/admin/Jobs?category=${encodeURIComponent(row.values.category)}`}>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                        </Link>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Number Of Jobs") {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
