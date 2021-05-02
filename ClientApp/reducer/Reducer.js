import ActionTypes from "../actions/ActionTypes";
import { DeepClone } from "Utils/CommonUtils";
import { GetStepByIndex } from "../StepConfig";

const Reducer = (state, action) => {
  let newState = DeepClone(state);

  switch (action.type) {
    case ActionTypes.PAGE_LOADED:
      newState.loading = false;
      return newState;

    case ActionTypes.GO_TO_STEP:
      newState.currentStep = action.payload;
      cs = GetStepByIndex(action.payload, newState.stepState);
      newState.currentPath = cs.path;
      return newState;

    case ActionTypes.PAGE_LOADED:
      newState.loading = false;
      return newState;

    case ActionTypes.PAGE_LOADING:
      newState.loading = true;
      return newState;

    default:
      return state;
  }
};

export default Reducer;
