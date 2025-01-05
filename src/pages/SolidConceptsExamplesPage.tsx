import SimpleSignalsEaxmple from '@components/SimpleSignalsExample'
import EventHandlersExample from '@components/EventHandlersExample'
import BasicFormExample from '@components/BasicFormExample'
import DataFetchingExample from '@components/DataFetchingExample'

const SolidConceptsExamplesPage = () => {

  return ( 
    <>
      <div class="flex flex-col items-center space-y-4 mt-4">
        <SimpleSignalsEaxmple />
        <EventHandlersExample />
        <BasicFormExample />
      </div>
      <div class='mt-4'>
        <h1 class='text-center text-4xl mb-2 font-bold'>Data fetching posts from jsonPlaceholder.typicode.com </h1>
        <DataFetchingExample /> 
      </div>
    </>
  )
}

export default SolidConceptsExamplesPage