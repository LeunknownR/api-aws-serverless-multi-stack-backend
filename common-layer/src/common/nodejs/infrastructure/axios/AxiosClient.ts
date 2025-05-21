import axios, { AxiosInstance } from 'axios';

export default class AxiosClient {
  private constructor(readonly instance: AxiosInstance) {}
  static Create(): AxiosClient {
    return new AxiosClient(axios.create());
  }
}
