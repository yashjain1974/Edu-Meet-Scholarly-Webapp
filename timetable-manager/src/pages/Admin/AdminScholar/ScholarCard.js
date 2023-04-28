import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Tabs,TabList,Tab,TabPanels,TabPanel,Card,Image,Stack,CardBody,Heading,Text,CardFooter,Button } from '@chakra-ui/react'
// import BasicUsage from './Card.js'
import BarChart from '../../Staff/Scholarly/Charts/BarChart'
import { CloseButton } from '@chakra-ui/react'
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function ScholarCard(props) {
  console.log(props.author["cites_per_year"])
  let arr=props.author["cites_per_year"]
  return (
    <ChakraProvider theme={theme}>
      <div>
      <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    // objectFit='cover'
    borderRadius='full'
    boxSize='150px'
    maxW={{ base: '100%', sm: '250px' }}
    src={props.author["url_picture"]}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{props.author["name"]}</Heading>
      <CloseButton onClick={props.onClose} size='lg' align='right'/>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <div></div>
  <TabList>
    <Tab>About</Tab>
    <Tab>Publications</Tab>
    <Tab>Citations</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Text color='blue.600' fontSize='xl' py='2'>
        Name: {props.author["name"]}<br></br>
        Total Publications: {props.author["total_pub"]}<br></br>
        Total Citations : {props.author["citation"]}
        
        
       
      </Text>

      <Text color='blue.600' fontSize='xl' py='2'>Publication Per year</Text>
     <BarChart bardata={props.author["counts"]} title="Counts" label="month" color="brown"></BarChart>
    </TabPanel>
    <TabPanel>
      <Text color='brown.600' fontSize='2xl' py='2'>Publications Per year</Text>
    <ul>
    {Object.entries(arr).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}

      </ul>
      
    </TabPanel>
    <TabPanel>
    <Text color='blue.600' fontSize='2xl' py='2'>Institute Rank According to citations: {props.rank}</Text>
    <Text color='blue.600' fontSize='xl' py='2'>Citations Per year</Text>
    <BarChart bardata={props.author["cites_per_year"]} title="citations" label="year" color="blue"></BarChart>
    </TabPanel>
  </TabPanels>
</Tabs>
      
    </CardBody>

    <CardFooter>
        <button onClick={props.onClose}>Close</button>
   
    {/* <BasicUsage/> */}
    </CardFooter>
  </Stack>
</Card>
      </div>
    </ChakraProvider>
  );
}

export default ScholarCard;
