
import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAsFinishedAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}



export const CyclesContext = createContext({} as CyclesContextType);
interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider ({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer,
        {
            cycles: [],
            activeCycleId: null,
        },
    );
    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished () {
        dispatch(markCurrentCycleAsFinishedAction());

    }

    function setSecondsPassed (seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function createNewCycle (data: CreateCycleData) {
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            stratDate: new Date()
        }
        dispatch(addNewCycleAction(newCycle));
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle () {

        dispatch(interruptCurrentCycleAsFinishedAction());
    }


    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
        }}>
            {children}
        </CyclesContext.Provider>
    )
}