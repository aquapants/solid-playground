import { createSignal } from 'solid-js'

import Button from '@components/ui/Button';

const Counter = () => {
  const [count, setCount] = createSignal(0)

  return (
    <div>
      <h1 class='text-center text-xl'>
        count is {count()}
      </h1>
      <div class='grid grid-cols-4 gap-2'>
        <Button onClick={()=> setCount((count) => count + 1)}>
          add 1
        </Button>
        <Button onClick={()=> setCount((count) => count * 5)}>
          times 5
        </Button>
        <Button onClick={()=> setCount((count) => count / 2)}>
          divide 2
        </Button>
        <Button onClick={() => setCount(0)}>
          reset
        </Button>
      </div>
    </div>
  )
};

export default Counter