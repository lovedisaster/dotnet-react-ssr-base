import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Reducer from './reducer/Reducer';
import { InitSteps, GetStepByIndex } from './StepConfig';
import { history } from './ClientRoutes';

export const StateContext = React.createContext('globalContext');

const StateProvider = (props) => {
  const currentStep = GetStepByIndex(1, InitSteps);
  let h = history;

  const [globalState, dispatch] = useReducer(Reducer, {
    initState: null,
    loading: true,
    currentStep: 1,
    currentPath: currentStep ? currentStep.path : '/ssrBase',
    stepState: InitSteps
  });

  useEffect(() => {
    CLIENT && h && h.replace(globalState.currentPath);
  }, [globalState.currentStep]);

  return (
    <StateContext.Provider value={{ globalState, dispatch }}>
      {/* <Loading loading={globalState.loading} /> */}
      {props.children}
    </StateContext.Provider>
  );
};

StateProvider.propTypes = {
  initState: PropTypes.object
};

export default StateProvider;
