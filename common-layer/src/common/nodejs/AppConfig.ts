import AppEnvironment from './AppEnvironment';
import AWSConfig, { AWSConfigLoader } from './AWSConfig';

export type SlackOptions = {
  webhookUrl: string;
  channel: string;
};
type AppConfig = Readonly<{
  isOffline: boolean;
  awsConfig: AWSConfig;
  appName: string;
  env: AppEnvironment;
}>;
export const UNIT_TESTING_ENV: string = 'unit-testing';
class AppConfigLoader {
  private static TestMode(): AppConfig {
    return {
      isOffline: true,
      awsConfig: {
        region: 'localhost',
        credentials: {
          accessKeyId: 'testAccessKeyId',
          secretAccessKey: 'testSecretAccessKey',
        },
        dynamoDbLocalEndpoint: 'http://localhost:8000',
      },
      appName: 'unit-testing',
      env: AppEnvironment.UnitTesting,
    };
  }
  private static AppMode(): AppConfig {
    const isOffline = process.env.IS_OFFLINE === 'true';
    const { APP_NAME, ENV } = process.env;
    return {
      appName: APP_NAME!,
      env: ENV as AppEnvironment,
      isOffline,
      awsConfig: AWSConfigLoader.load(isOffline),
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
