// @flow

import * as React from 'react'
// $FlowFixMe
import {Iterable} from 'immutable'

const KEY = 0
const VALUE = 1

export function toJS(WrappedComponent: React.ComponentType<Object>) {
  return (wrappedComponentProps: Object) => {
    const propsJS = Object
      .entries(wrappedComponentProps)
      .reduce((newProps: Object, wrappedComponentProp: [string, mixed]): Object => {
        newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(wrappedComponentProp[VALUE])
          // $FlowFixMe
          ? wrappedComponentProp[VALUE].toJS()
          : wrappedComponentProp[VALUE]
        return newProps
      }, {})

    return <WrappedComponent {...propsJS} />
  }
}
