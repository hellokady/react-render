import { isValidElementType } from 'react-is';
import type { ComponentType, ComponentProps } from "react"

function withStyle<T extends ComponentType<any>>(Component: T) {

  if (!isValidElementType(Component)) {
    throw new TypeError('Component must be a valid React element or a function component');
  }

  const HocWithStyle = (props: ComponentProps<T>) => {

    return (
      <Component {...props} style={{ color: 'red' }} />
    );
  }

  return HocWithStyle;
}


function withTemplate<T extends ComponentType<any>>(Component: T) {

  if (!isValidElementType(Component)) {
    throw new TypeError('Component must be is ReactElement');
  }

  const HocWithTemplate = (props: ComponentProps<T>) => {

    return (
      <h1>
        <Component {...props} templateId={Date.now().toString()} />
      </h1>
    );
  }

  return HocWithTemplate;
}

export {
  withStyle,
  withTemplate
}