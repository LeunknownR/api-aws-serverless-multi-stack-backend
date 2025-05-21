type AWSConfig = {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  };
  region: string;
  dynamoDbLocalEndpoint?: string;
  s3LocalEndpoint?: string;
  snsLocalEndpoint?: string;
};
export class AWSConfigLoader {
  private static Offline(): AWSConfig {
    const { AWS_S3_LOCAL_PORT, AWS_SNS_LOCAL_PORT } = process.env;
    return {
      region: 'localhost',
      credentials: {
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
      },
      dynamoDbLocalEndpoint: 'http://localhost:8000',
      s3LocalEndpoint: `http://localhost:${AWS_S3_LOCAL_PORT}`,
      snsLocalEndpoint: `http://localhost:${AWS_SNS_LOCAL_PORT}`,
    };
  }
  private static Online(): AWSConfig {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN } = process.env;
    return {
      region: AWS_REGION!,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!,
        sessionToken: AWS_SESSION_TOKEN,
      },
    };
  }
  static load(isOffline: boolean): AWSConfig {
    return isOffline ? AWSConfigLoader.Offline() : AWSConfigLoader.Online();
  }
}

export default AWSConfig;
