import { ListResponseStatistics } from 'models';
import axiosClient from './axiosClient';

const dashboardApi = {
  getStatistics(): Promise<ListResponseStatistics> {
    const url = '/api/dashboard/statistics'
    return axiosClient.get(url)
  }
}

export default dashboardApi