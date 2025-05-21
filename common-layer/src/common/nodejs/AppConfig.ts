import AppEnvironment from './AppEnvironment';
import AWSConfig, { AWSConfigLoader } from './AWSConfig';

export type SlackOptions = {
  webhookUrl: string;
  channel: string;
};
type TopicsAvailable = {
  invoiceStatusCheck: string;
  invoiceSendEventRequests: string;
};
type QueuesAvailable = {
  registrationRequestsQueue: string;
};
type AppConfig = Readonly<{
  isOffline: boolean;
  awsConfig: AWSConfig;
  appName: string;
  env: AppEnvironment;
  veriFactuUrl: string;
  veriFactuClientTimeout: number;
  slack?: SlackOptions;
  topics?: TopicsAvailable;
  queues?: QueuesAvailable;
}>;
export const UNIT_TESTING_ENV: string = 'unit-testing';
class AppConfigLoader {
  private static TestMode(): AppConfig {
    return {
      isOffline: true,
      veriFactuUrl: '',
      awsConfig: {
        region: 'localhost',
        credentials: {
          accessKeyId: 'testAccessKeyId',
          secretAccessKey: 'testSecretAccessKey',
        },
        dynamoDbLocalEndpoint: 'http://localhost:8000',
        s3LocalEndpoint: 'http://localhost:4569',
        snsLocalEndpoint: 'http://localhost:7002',
      },
      appName: 'unit-testing',
      env: AppEnvironment.UnitTesting,
      veriFactuClientTimeout: 10000,
    };
  }
  private static AppMode(): AppConfig {
    const isOffline = process.env.IS_OFFLINE === 'true';
    const {
      APP_NAME,
      ENV,
      VERIFACTU_URL,
      SLACK_WEBHOOK_URL,
      SLACK_CHANNEL,
      VERIFACTU_CLIENT_TIMEOUT,
      INVOICE_STATUS_CHECK_TOPIC_ARN,
      INVOICE_SEND_EVENT_REQUESTS_TOPIC_ARN,
      REGISTRATION_REQUESTS_QUEUE_URL,
    } = process.env;
    return {
      appName: APP_NAME!,
      env: ENV as AppEnvironment,
      isOffline,
      awsConfig: AWSConfigLoader.load(isOffline),
      veriFactuUrl: VERIFACTU_URL!,
      veriFactuClientTimeout: parseInt(VERIFACTU_CLIENT_TIMEOUT!),
      slack:
        SLACK_WEBHOOK_URL && SLACK_CHANNEL
          ? {
              webhookUrl: SLACK_WEBHOOK_URL,
              channel: SLACK_CHANNEL,
            }
          : undefined,
      topics:
        INVOICE_STATUS_CHECK_TOPIC_ARN && INVOICE_SEND_EVENT_REQUESTS_TOPIC_ARN
          ? {
              invoiceStatusCheck: INVOICE_STATUS_CHECK_TOPIC_ARN,
              invoiceSendEventRequests: INVOICE_SEND_EVENT_REQUESTS_TOPIC_ARN,
            }
          : undefined,
      queues: REGISTRATION_REQUESTS_QUEUE_URL
        ? {
            registrationRequestsQueue: REGISTRATION_REQUESTS_QUEUE_URL,
          }
        : undefined,
    };
  }
  public static load(): AppConfig {
    const isTestMode = process.env.JEST_WORKER_ID !== undefined;
    if (isTestMode) return AppConfigLoader.TestMode();
    return AppConfigLoader.AppMode();
  }
}

const APP_CONFIG = AppConfigLoader.load();
export default APP_CONFIG;
