export default {
    name: "citysdkKey",
    getReducer:() =>{
        const initialData = {
            citysdkStatsKey: null,
        }
        return (state = initialData, {type, payload}) =>{
            switch(type){
                case 'SET_CITYSDK_STATS_KEY':
                return Object.assign({}, state, payload)
                default:
                return state;
            }
        }
    },
    doSetCitysdkStatsKey: (key) =>({dispatch})=>{
        dispatch({type: 'SET_CITYSDK_STATS_KEY', payload: { citysdkStatsKey: key}})
    },
    selectCitysdkStatsKey: (state) =>{
        return state.citysdkKey.citysdkStatsKey;
    }  
}