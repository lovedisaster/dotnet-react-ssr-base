export const StepNames = {
  Home: 'Home'
};

export const InitSteps = [
  { index: 1, name: StepNames.Home, path: '/ssrBase', data: null }
];

export const GetStepByIndex = (index, steps) => {
  const step = steps.find((s) => s.index === index);
  return step ? step : null;
};
