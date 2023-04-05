import { FC, CSSProperties } from 'react';
import { Component } from 'react';
import { withStyle, withTemplate } from './Hoc';

type ExampleProps = {
  style?: CSSProperties;
}

class ExampleWithClass extends Component<ExampleProps> {
  render() {
    const { style } = this.props;

    return (
      <div style={style}>
        class 123
      </div>
    )
  }
}

const Example: FC<ExampleProps> = ({ style }) => {
  return (
    <div style={style}>
      123
    </div>
  )
}

const ExampleWithStyle = withStyle(ExampleWithClass);
const ExampleWithTemplate = withTemplate(Example);
const ExampleWithTemplateStyle = withStyle(withTemplate(Example));

export default () => {
  return (
    <>
      <Example />
      <ExampleWithStyle />
      <ExampleWithTemplate />
      <ExampleWithTemplateStyle />
    </>
  )
}