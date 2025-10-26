import { createStore } from "@/lib/createStore";


type State = {
    selectedServingUnitId : number | null,
    ServingUnitDialogOpen: boolean
}

type Actions = {
    updateServingUnitId : (id:State["selectedServingUnitId"])=> void;
    updateDialogOpen: (is: State["ServingUnitDialogOpen"])=>void
}

type Store = State & Actions;

const useServingUnitStore = createStore<Store>(
    (set)=>({
        selectedServingUnitId : null,
        ServingUnitDialogOpen : false,
        updateServingUnitId: (id)=>set((state)=>{
            state.selectedServingUnitId = id;
        }),
        updateDialogOpen: (is)=>set((state)=>{
            state.ServingUnitDialogOpen = is;
        })
    }),
    {
        name : "serving-unit-store"
    }
)

export {useServingUnitStore}