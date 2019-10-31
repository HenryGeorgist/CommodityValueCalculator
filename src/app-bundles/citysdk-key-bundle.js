export default (key) => {
    return{
        name: "citysdkKey",
        getReducer:() =>{
            const initialData = {
                citysdkStatsKey: key,
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
        selectCitysdkStatsKey: (state) =>{
            return state.citysdkKey.citysdkStatsKey;
        }
    }  
}