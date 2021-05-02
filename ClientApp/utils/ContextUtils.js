import React from 'react';
import {IsEmptyObject, DeepClone} from './CommonUtils';
import {GetStepIndexByName} from 'Root/StepConfig';

export const StateContext = React.createContext('steps');

export const SetLocalState = (state) => {
    if (sessionStorage !== undefined) {
        sessionStorage.setItem('state', JSON.stringify(state));
    }
}

export const GetCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if(match && match.length > 0) {
        return match[2];
    }else{
        return "";
    }
}
export const GetLocalState = () => {
    if (!IsEmptyObject(sessionStorage)) {
        return JSON.parse(sessionStorage.getItem('state'));
    }else{
        return null;
    }
}

export const ClearLocalState = () => {
    if (sessionStorage !== undefined) {
        sessionStorage.removeItem('state');
    }
}

export const GetStepByName = (context, stepName) => {
    const steps = context.state.stepState.steps;
    const selectedIndex = GetStepIndexByName(stepName);
    if(IsEmptyObject(steps)){
        return null;
    }else{
        return steps.find(step => step.index === selectedIndex);
    }
}

export const GetServerData = () => {
    if(!CLIENT) {
        return null;
    }
    //If user refresh on any page without passing networkId as a param, the app still works.
    if(IsEmptyObject(window.serverData.vehicleDetails) || IsEmptyObject(window.serverData.sourceSystem)){
        const SD = DeepClone(GetLocalState());
        if(SD)
            return SD.state.serverData;
        else
            return window.serverData;
    }else{
        return window.serverData;
    }
}


 