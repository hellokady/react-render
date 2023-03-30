import { useRef, useState, memo, useCallback, forwardRef, createRef } from 'react'
import type { FC, ChangeEvent, ForwardedRef } from 'react'
import './App.css'

interface InputProps {
  index: number;
  value: string;
  handleChange(index: number, newValue: string): void;
}

const defaultData = Array(10000).fill(null).map(() => ({
  value: '',
  ref: createRef<HTMLInputElement>()
}))

// 经常使用的默认写法
const MyInputWithDefault: FC<InputProps> = ({ index, value, handleChange }) => {
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(index, e.target.value);
  }

  return (
    <h5>
      <span>value:{value}</span>
      <input type="text" value={value} onChange={updateValue} />
    </h5>
  )
}

// 将props的值在自身state中维护，防抖触发父组件的change方法
const MyInputWithState: FC<InputProps> = (props) => {
  const { index, value: propsValue, handleChange } = props;
  const [value, setValue] = useState(propsValue);
  const timerRef = useRef<NodeJS.Timer>();

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current as NodeJS.Timer)
    setValue(e.target.value);
    timerRef.current = setTimeout(() => {
      handleChange(index, e.target.value);
    }, 700)
  }

  return (
    <h5>
      <span>value:{value}</span>
      <input type="text" value={value} onChange={updateValue} />
    </h5>
  )
}

// memo和useCallback结合使用缓存组件
const MyInputWithMemo = memo(MyInputWithDefault);

// 使用ref和forwardRef
const MyInputWithForward: FC<InputProps> = forwardRef((props, ref: ForwardedRef<HTMLInputElement>) => {
  const { value: propsValue } = props;
  const [value, setValue] = useState(propsValue);

  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <h5>
      <span>value:{value}</span>
      <input type="text" value={value} onChange={updateValue} ref={ref} />
    </h5>
  )
})

const Warp = () => {

  const [dataSource, setDataSource] = useState(defaultData);
  const handleChange = useCallback((index: number, newValue: string) => {
    setDataSource(data => {
      data[index].value = newValue;
      return [...data];
    })
  }, []);

  const getDataSource = () => {
    const list = dataSource.map(item => {
      return {
        ...item,
        resultValue: item.ref.current ? item.ref.current.value : item.value
      }
    })
    console.log(list);
  }

  return (
    <div>
      <h2>Warp</h2>
      <button onClick={getDataSource}>get dataSource</button>
      {
        dataSource.map((item, index) => (
          <MyInputWithState {...item} key={index} index={index} handleChange={handleChange} />
        ))
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Test Render</h1>
      <Warp />
    </div>
  )
}

export default App
