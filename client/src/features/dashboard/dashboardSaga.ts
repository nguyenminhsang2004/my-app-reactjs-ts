import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import dashboardApi from 'api/dashboardApi'
import { ListResponseStatistics } from 'models'
import { dashboardAction } from './dashboardSlice'

function* fetchStatistics(){

    const response: ListResponseStatistics = yield call(dashboardApi.getStatistics)

    if(response.success){
        const {postCount, likeCount, noteCount, other} = response.content.data

        yield put(dashboardAction.setStatistics({postCount,likeCount,noteCount,other}))
    }
}

function* fetchDataDashboard() {
    try {
        yield all([
            call(fetchStatistics),
        ])
        yield put(dashboardAction.fetchDataSuccess('Fetch data successfully'))
    } catch (error) {
        console.log(error)
        yield put(dashboardAction.fetchDataFailed('Failed to fetch data statistics'))
    }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.type, fetchDataDashboard)
}
