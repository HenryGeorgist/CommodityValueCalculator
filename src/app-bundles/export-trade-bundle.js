//https://api.census.gov/data/2018/intltrade/imp_exp/examples.html
//https://api.census.gov/data/2018/intltrade/imp_exp?get=EXPALL2018,COUNTRY&SCHEDULE=7940&key=a6db60fcc5d6bb18e9e3645ecfdd5dbee62a7c63
//https://api.census.gov/data/timeseries/intltrade/exports/naics/?get=CTY_NAME,ALL_VAL_MO&DISTRICT=27&time=2013-02&NAICS=111310&key=a6db60fcc5d6bb18e9e3645ecfdd5dbee62a7c63
//https://www.census.gov/foreign-trade/reference/guides/Guide%20to%20International%20Trade%20Datasets.pdf
//https://www.census.gov/foreign-trade/schedules/d/dist.txt
import census from 'citysdk';
export default{
    name: 'exportTrade',
    getReducer:() =>{
        const initialData = {
            shouldFetch: false,
            shouldUsePorts: false,
            portOrDistrict: "Select District",
            selectedPort: '27*',
            selectedDistrict: '27',
            selectedNaicsCode: '11*',
            selectedHsCode: '0*',
            selectedYearMonth: '2013-01',
            exportOutput: null
        }
        return (state = initialData, {type, payload}) =>{
            switch(type){
                case 'SET_EXPORT_FETCH_TRUE':
                case 'EXPORT_FETCH_STARTED':
                case 'EXPORT_FETCH_FINISHED':
                case 'SET_USE_PORT_CODE':
                case 'SET_PORT_CODE':
                case 'SET_DISTRICT_CODE':
                case 'SET_NAICS_CODE':
                case 'SET_HS_CODE':
                case 'SET_YEAR_MONTH':
                case 'SET_PORT_OR_DISTRICT':
                return Object.assign({}, state, payload)
                default:
                return state;
            }
        }
    },
    doSetFetchState: (toggle) =>({dispatch, store})=>{
        dispatch({type: 'SET_EXPORT_FETCH_TRUE', payload: { shouldFetch: toggle}})
    },
    doSetUsePortState: (toggle) =>({dispatch, store})=>{
        var message = "Select ";
        if(toggle){
            message += "Port";
        }else{
            message += "District";
        }
        dispatch({type: 'SET_USE_PORT_CODE', payload: { shouldUsePorts: toggle, portOrDistrict: message}})//consider setting shouldFetch = true to cause a reaction.
    },
    doSetYearMonth: (YearMonth) =>({dispatch, store})=>{
        dispatch({type: 'SET_YEAR_MONTH', payload: {
             shouldFetch: true,
             selectedYearMonth: YearMonth
            }})
    },
    doSetNaicsCode: (naics) =>({dispatch, store})=>{
        dispatch({type: 'SET_NAICS_CODE', payload: {
             shouldFetch: true,
             selectedNaicsCode: naics
            }})
    },
    doSetHsCode: (hs) =>({dispatch, store})=>{
        dispatch({type: 'SET_HS_CODE', payload: {
             shouldFetch: true,
             selectedHsCode: hs
            }})
    },
    doSetPortCode: (portCode) =>({dispatch, store})=>{
        console.log(portCode)
        dispatch({type: 'SET_PORT_CODE', payload: {
             selectedPort: portCode
            }})
    },
    doSetDistrictCode: (districtCode) =>({dispatch, store})=>{
        console.log(districtCode)
        dispatch({type: 'SET_DISTRICT_CODE', payload: {
             selectedDistrict: districtCode
            }})
    },
    doSetPortOrDistrictCode: (selection) =>({dispatch, store})=>{
        //check to see if the selection is a port or a district - it should be set based on the current port state (if coming from the UI)
        var vals = selection.split(": ")
        console.log(selection)
        if(store.selectShouldUsePorts()){
            // expected object is a port  "xxxx": "nnnnnnn"
            //var wild = vals[0].substring(0,2) + "*" //it seems the call needs to be made with the wild card, no exceptions.
            store.doSetPortCode(vals[0])
        }else{
            store.doSetDistrictCode(vals[0])
        }
        dispatch({type: 'SET_PORT_OR_DISTRICT', payload: {
             portOrDistrict: selection
            }})
    },
    doExportFetch: ()=>({ dispatch, store})=>{
        dispatch({type: 'EXPORT_FETCH_STARTED', payload: { shouldFetch: false}})
        var statsKeyStore = store.selectCitysdkStatsKey()
        if(store.selectShouldUsePorts()){
            census({
                "vintage" : "timeseries",// required
                "sourcePath" : ["intltrade", "exports","porths"],  // required 
                "values" : [
                      "ALL_VAL_MO",
                      "VES_VAL_MO",
                      "CNT_VAL_MO",
                      "AIR_VAL_MO",
                      "VES_WGT_MO",
                      "CNT_WGT_MO",
                      "AIR_WGT_MO",
                      "E_COMMODITY_SDESC",
                      "PORT_NAME"
                    ],
                  "predicates": {
                    "PORT": store.selectSelectedPort(),
                    "time": store.selectSelectedYearMonth(),
                    "E_COMMODITY": store.selectExportHsCode()
                  },
                  "statsKey": statsKeyStore
              }, 
              (err, response) => {
                  if(err){
                      console.error('ERROR', response)
                  }else{
                      //console.log(response)
                      dispatch({type: 'EXPORT_FETCH_FINISHED', payload: {
                            exportOutput: response
                        }})
                  }
              }
              )
        }else{
        census({
            "vintage" : "timeseries",// required
            "sourcePath" : ["intltrade", "exports","naics"],  // required 
            "values" : [
                  "ALL_VAL_MO",
                  "VES_VAL_MO",
                  "CNT_VAL_MO",
                  "AIR_VAL_MO",
                  "VES_WGT_MO",
                  "CNT_WGT_MO",
                  "AIR_WGT_MO",
                  "NAICS_SDESC",
                  "DIST_NAME"
                ],
              "predicates": {
                "DISTRICT": store.selectSelectedDistrict(),
                "time": store.selectSelectedYearMonth(),
                "NAICS": store.selectExportNaicsCode()
              },
              "statsKey": store.selectCitysdkStatsKey()
          }, 
          (err, response) => {
              if(err){
                  console.error('ERROR', response)
              }else{
                  //console.log(response)
                  dispatch({type: 'EXPORT_FETCH_FINISHED', payload: {
                        exportOutput: response
                    }})
              }
          }
          )
        }
    },
    selectShouldUsePorts: (state)=>{
        return state.exportTrade.shouldUsePorts;
    },
    selectPortOrDistrict: (state)=>{
        return state.exportTrade.portOrDistrict;
    },
    selectSelectedPort: (state) =>{
        return state.exportTrade.selectedPort;
    },  
    selectSelectedDistrict: (state) =>{
        return state.exportTrade.selectedDistrict;
    },
    selectExportNaicsCode: (state) =>{
        return state.exportTrade.selectedNaicsCode;
    },
    selectExportHsCode: (state) =>{
        return state.exportTrade.selectedHsCode;
    },
    selectSelectedYearMonth: (state) =>{
        return state.exportTrade.selectedYearMonth;
    },
    selectExportOutput: (state) =>{
        return state.exportTrade.exportOutput;
    },
    reactExportShouldFetch:(state) =>{
        if(state.exportTrade.shouldFetch) return {actionCreator: 'doExportFetch'}
    }
}