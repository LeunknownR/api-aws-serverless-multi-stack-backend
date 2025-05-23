type AWSConfig = {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  };
  region: string;
  dynamoDbLocalEndpoint?: string;
};
export class AWSConfigLoader {
  private static Offline(): AWSConfig {
    return {
      region: 'localhost',
      credentials: {
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
      },
      dynamoDbLocalEndpoint: 'http://localhost:8000',
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
